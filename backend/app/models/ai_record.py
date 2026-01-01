from sqlmodel import SQLModel, Field, JSON
from typing import Optional, List

class AISummary(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    appointment_id: int = Field(foreign_key="appointment.id", unique=True)
    content: str # The SOAP structured text
    risk_flags: List[str] = Field(default=[], sa_type=JSON) # e.g. ["Dizziness_Risk"]
    is_doctor_approved: bool = Field(default=False) # The HITL gate
    confidence_score: float = 0.0 # AI's self-assessment