from fastapi import APIRouter, Depends, Query
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.doctor import Doctor
from app.schemas.doctor import DoctorMatchResponse
from typing import List

router = APIRouter()

@router.get("/search", response_model=List[DoctorMatchResponse])
async def search_doctors(
    specialty: str = Query(None),
    db: Session = Depends(get_session),
    current_patient_id: str = "current_user_id"
):
    """
    Finds doctors and ranks them using a personalized Match Score.
    """
    # 1. Fetch relevant doctors based on specialty
    query = select(Doctor)
    if specialty:
        query = query.where(Doctor.specialty == specialty)
    doctors = db.exec(query).all()

    # 2. Fetch patient health context for matching
    # In a real app, this would query the Clinical Memory Graph service
    patient_context = {"conditions": ["Hypertension"], "urgency": "High"}

    # 3. Calculate match scores for each doctor
    ranked_results = []
    for doc in doctors:
        score = calculate_personalized_match(doc, patient_context)
        ranked_results.append({
            "doctor": doc,
            "match_score": score,
            "next_available": doc.get_next_slot() # Logic from scheduling service
        })

    # Sort by descending match score
    return sorted(ranked_results, key=lambda x: x["match_score"], reverse=True)

def calculate_personalized_match(doctor, context):
    """Internal weighted scoring engine."""
    score = 0
    if doctor.specialty == "Cardiology" and "Hypertension" in context["conditions"]:
        score += 60 # High clinical alignment
    if context["urgency"] == "High" and doctor.has_immediate_slot():
        score += 30 # Immediate availability priority
    return min(score + 10, 100) # Base score for credentials