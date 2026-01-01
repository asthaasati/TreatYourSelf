from sqlmodel import SQLModel, Field
from typing import Optional

class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    name: str
    role: str # "PATIENT", "DOCTOR", "ADMIN"

class Patient(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str

class Doctor(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str
    specialty: str
    license_number: str
    status: str = Field(default="PENDING") # PENDING, ACTIVE