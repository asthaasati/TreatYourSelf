from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.user import Doctor
from app.models.audit import SecureAuditLog

router = APIRouter()

@router.post("/verify-doctor/{doctor_id}")
async def verify_doctor(doctor_id: int, db: Session = Depends(get_session)):
    """Governance action to activate a medical professional."""
    doctor = db.get(Doctor, doctor_id)
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor record missing")
    
    doctor.status = "ACTIVE"
    db.add(doctor)
    
    # Immutable audit log for regulatory compliance
    log = SecureAuditLog(actor_id="SYSTEM_ADMIN", action="VERIFY_DOCTOR", resource_id=str(doctor_id))
    db.add(log)
    db.commit()
    return {"status": "Doctor verified successfully"}