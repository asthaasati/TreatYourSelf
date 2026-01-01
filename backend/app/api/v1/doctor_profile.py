from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.db.session import get_session
from app.api.deps import get_current_doctor
from app.models.doctor import Doctor, Slot
from app.schemas.doctor import ProfileUpdate, AvailabilityUpdate

router = APIRouter()

@router.put("/availability")
async def update_availability(
    data: AvailabilityUpdate, 
    doctor=Depends(get_current_doctor),
    db: Session = Depends(get_session)
):
    """Updates doctor slots for the discovery engine."""
    # 1. Clear existing unbooked slots to avoid duplicates
    # 2. Batch insert new slots
    for time_slot in data.slots:
        new_slot = Slot(
            doctor_id=doctor.id,
            start_time=time_slot,
            is_booked=False
        )
        db.add(new_slot)
    
    db.commit()
    return {"status": "Availability Updated"}

@router.put("/ai-preferences")
async def update_ai_prefs(
    prefs: dict, 
    doctor=Depends(get_current_doctor),
    db: Session = Depends(get_session)
):
    """Configures AI feature toggles like Neural Sidebar or Auto-Drafting."""
    doctor.ai_preferences = prefs
    db.add(doctor)
    db.commit()
    return {"status": "AI Preferences Saved"}