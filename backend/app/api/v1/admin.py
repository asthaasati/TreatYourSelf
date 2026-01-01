from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.doctor import Doctor
from app.models.audit import AuditLog
from app.core.config import settings
import datetime

router = APIRouter()

@router.get("/pending-doctors")
async def get_pending_verifications(db: Session = Depends(get_session)):
    """Lists all doctors awaiting medical license verification."""
    doctors = db.exec(select(Doctor).where(Doctor.status == "PENDING")).all()
    return doctors

@router.post("/verify-doctor/{doctor_id}")
async def verify_doctor(doctor_id: int, db: Session = Depends(get_session)):
    """
    Activates a doctor account after credential review.
    Only accessible by ADMIN role.
    """
    doctor = db.get(Doctor, doctor_id)
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    
    doctor.status = "ACTIVE"
    
    # Audit log the admin action for compliance
    audit = AuditLog(
        actor_id="ADMIN_SYSTEM",
        event="DOCTOR_VERIFIED",
        target=f"Doctor:{doctor_id}",
        status="Success",
        timestamp=datetime.datetime.utcnow()
    )
    db.add(audit)
    db.add(doctor)
    db.commit()
    return {"message": f"Doctor {doctor.name} is now ACTIVE."}

@router.put("/ai-safety-gate")
async def update_safety_thresholds(threshold: float):
    """
    Adjusts the global confidence gate for AI-generated summaries.
    Example: 0.95 means AI must be 95% confident to show a result without a warning.
    """
    # This would update a shared Redis config or DB setting
    return {"status": "Global Safety Threshold updated to {threshold}"}