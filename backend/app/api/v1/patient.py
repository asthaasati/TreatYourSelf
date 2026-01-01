from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.clinical import VitalLog

router = APIRouter()

@router.get("/vitals/{patient_id}")
async def get_patient_trajectory(patient_id: int, db: Session = Depends(get_session)):
    """Retrieves patient health metrics for dashboard visualization."""
    vitals = db.exec(select(VitalLog).where(VitalLog.patient_id == patient_id)).all()
    return vitals