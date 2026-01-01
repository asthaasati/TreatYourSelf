from fastapi import APIRouter, Depends, HTTPException
from app.api.deps import get_current_active_doctor # Custom dependency
from app.db.session import Session, select
from app.models.patient import Patient, VitalLog

router = APIRouter()

@router.get("/patient/{patient_id}/vitals")
async def get_patient_vitals_for_doctor(
    patient_id: str, 
    doctor = Depends(get_current_active_doctor),
    db: Session = Depends(get_session)
):
    """
    Returns read-only vitals if a valid appointment exists.
    """
    # Verify doctor-patient relationship in DB
    relationship = db.exec(
        select(Appointment).where(
            Appointment.doctor_id == doctor.id, 
            Appointment.patient_id == patient_id
        )
    ).first()
    
    if not relationship:
        raise HTTPException(status_code=403, detail="Unauthorized access to patient data")
    
    vitals = db.exec(select(VitalLog).where(VitalLog.patient_id == patient_id)).all()
    return vitals