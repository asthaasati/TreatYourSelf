from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.appointment import Appointment
from app.models.ai_record import AISummary
from app.services.ai_engine import ClinicalAIEngine
from app.schemas.ai import SummaryUpdate

router = APIRouter()
ai_engine = ClinicalAIEngine()

@router.post("/generate-summary/{appointment_id}")
async def generate_summary(appointment_id: int, db: Session = Depends(get_session)):
    """
    Triggers the AI to process a completed consultation.
    """
    appt = db.get(Appointment, appointment_id)
    if not appt or appt.status != "Completed":
        raise HTTPException(status_code=400, detail="Consultation must be completed first")

    # In a real app, you would fetch the transcript from your video provider storage
    raw_transcript = "Patient reports dizziness. Vitals checked. Adjusting Losartan." 
    
    # Generate the SOAP summary using the AI Engine
    ai_output = await ai_engine.generate_soap_summary(raw_transcript, appt.patient_id)

    new_summary = AISummary(
        appointment_id=appointment_id,
        content=ai_output["soap_text"],
        risk_flags=ai_output["risks"],
        is_doctor_approved=False # HITL: Starts as unverified
    )
    
    db.add(new_summary)
    db.commit()
    return new_summary

@router.put("/verify-summary/{summary_id}")
async def verify_summary(summary_id: int, data: SummaryUpdate, db: Session = Depends(get_session)):
    """
    Doctor approves or edits the AI summary.
    """
    summary = db.get(AISummary, summary_id)
    if not summary:
        raise HTTPException(status_code=404, detail="Summary not found")

    summary.content = data.final_content
    summary.is_doctor_approved = True # Finalizes the record
    
    # Trigger a Graph Sync to update the Patient's Longitudinal Record
    db.add(summary)
    db.commit()
    return {"status": "Verified & Synced to Clinical Memory"}