from fastapi import APIRouter, Depends
from app.api.deps import get_current_doctor
from app.services.pdf_service import PDFSignerService
from app.models.clinical import AISummary

router = APIRouter()
pdf_service = PDFSignerService()

@router.post("/issue/{appointment_id}")
async def issue_rx(appointment_id: int, doctor=Depends(get_current_doctor)):
    """Issues a legally binding digital prescription."""
    # Logic to fetch approved AISummary and sign
    return {"message": "Prescription generated and signed"}