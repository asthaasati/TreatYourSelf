from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# Common fields shared by all appointment schemas
class AppointmentBase(BaseModel):
    doctor_id: int
    patient_id: int
    slot_id: int
    reason: Optional[str] = None
    status: str = "SCHEDULED" # SCHEDULED, COMPLETED, CANCELLED

# Schema for creating a new appointment (Request Body)
class AppointmentCreate(AppointmentBase):
    pass

# Schema for reading an appointment (Response Body)
class AppointmentRead(AppointmentBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True