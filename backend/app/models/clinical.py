from sqlmodel import SQLModel, Field, JSON
from datetime import datetime
from typing import Optional, List

class VitalLog(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    patient_id: int = Field(index=True)
    systolic: int
    diastolic: int
    sugar_level: int
    heart_rate: int
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class AISummary(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    appointment_id: int = Field(unique=True)
    content: str # SOAP Note
    is_doctor_approved: bool = Field(default=False)
    risk_flags: List[str] = Field(default=[], sa_type=JSON)