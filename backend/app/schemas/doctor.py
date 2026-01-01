from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# Basic info for public/list views
class DoctorBase(BaseModel):
    name: str
    specialty: str
    status: str = "ACTIVE"

# The schema requested by your error: used for AI matching or search
class DoctorMatchResponse(DoctorBase):
    id: int
    license_number: str
    bio: Optional[str] = None

# Schema for creating/updating
class DoctorCreate(DoctorBase):
    email: EmailStr
    password: str
    license_number: str

# Schema for the API response
class DoctorOut(DoctorBase):
    id: int
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True