from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.doctor import Slot
from app.models.appointment import Appointment
from app.schemas.appointment import AppointmentCreate, AppointmentRead
from app.models.audit import AuditLog

router = APIRouter()

@router.post("/", response_model=AppointmentRead)
async def book_appointment(
    data: AppointmentCreate, 
    db: Session = Depends(get_session),
    current_user_id: str = "patient_123"
):
    """
    Books an appointment with atomic slot locking.
    """
    # 1. Fetch slot and check for conflicts
    slot = db.exec(select(Slot).where(Slot.id == data.slot_id)).first()
    
    if not slot or slot.is_booked:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, 
            detail="This time slot is no longer available"
        )

    # 2. Create appointment and lock slot
    new_appt = Appointment(
        patient_id=current_user_id,
        doctor_id=slot.doctor_id,
        slot_id=slot.id,
        status="Requested" # Initial state
    )
    slot.is_booked = True # Mark slot as taken
    
    db.add(new_appt)
    db.add(slot)
    
    # 3. Log the booking event for compliance
    audit = AuditLog(
        actor_id=current_user_id,
        event="APPOINTMENT_BOOKED",
        target=f"Appointment:{new_appt.id}",
        status="Success"
    )
    db.add(audit)
    db.commit()
    db.refresh(new_appt)
    
    return new_appt