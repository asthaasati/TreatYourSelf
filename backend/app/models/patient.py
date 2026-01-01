from datetime import date, datetime
from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship

# Use TYPE_CHECKING to prevent circular imports during relationship definitions
if TYPE_CHECKING:
    from .clinical import VitalLog, Appointment

class Patient(SQLModel, table=True):
    """
    Core Patient model for TreatYourSelf.
    Contains demographic data and links to clinical trajectory.
    """
    id: Optional[int] = Field(default=None, primary_key=True)
    
    # --- Identity ---
    email: str = Field(index=True, unique=True, nullable=False)
    hashed_password: str = Field(nullable=False)
    name: str = Field(index=True)
    date_of_birth: Optional[date] = None
    gender: Optional[str] = None
    
    # --- Clinical Metadata ---
    blood_group: Optional[str] = None
    allergies: Optional[str] = None # Can be stored as a comma-separated string or JSON
    medical_history: Optional[str] = None
    
    # --- Platform Status ---
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # --- Relationships ---
    # These allow the AI to fetch history easily: patient.vitals or patient.appointments
    vitals: List["VitalLog"] = Relationship(back_populates="patient")
    appointments: List["Appointment"] = Relationship(back_populates="patient")

    class Config:
        # This helps Pydantic play nice with SQLAlchemy objects
        from_attributes = True