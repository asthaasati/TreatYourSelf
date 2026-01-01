from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional

class Appointment(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    patient_id: str = Field(index=True)
    doctor_id: int = Field(index=True)
    slot_id: int = Field(unique=True) # Ensures one slot = one appt
    status: str = Field(default="Requested") # Requested, Confirmed, Cancelled
    created_at: datetime = Field(default_factory=datetime.utcnow)