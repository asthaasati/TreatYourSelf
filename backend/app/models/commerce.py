from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from typing import Optional

class Slot(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    doctor_id: int = Field(foreign_key="doctor.id")
    start_time: datetime
    is_booked: bool = Field(default=False)

class Appointment(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    patient_id: int = Field(foreign_key="patient.id")
    doctor_id: int = Field(foreign_key="doctor.id")
    slot_id: int = Field(unique=True)
    status: str = Field(default="Requested") # Requested, Confirmed, Review