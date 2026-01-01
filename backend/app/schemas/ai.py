from pydantic import BaseModel, Field
from typing import List, Optional

class AIInferenceBase(BaseModel):
    appointment_id: int
    model_version: str

class SOAPSummaryRequest(AIInferenceBase):
    transcript: str
    patient_history_summary: Optional[str] = None

class SOAPSummaryResponse(BaseModel):
    soap_text: str
    risk_flags: List[str] = []
    confidence_score: float = Field(..., ge=0, le=1)

class AIFeedbackCreate(BaseModel):
    summary_id: int
    is_helpful: bool
    correction_notes: Optional[str] = None