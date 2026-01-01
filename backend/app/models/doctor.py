from datetime import datetime, time
from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship

# Prevent circular imports
if TYPE_CHECKING:
    from .patient import Patient

class Doctor(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    email: str = Field(index=True, unique=True, nullable=False)
    hashed_password: str = Field(nullable=False)
    name: str = Field(index=True)
    specialty: str = Field(index=True)
    license_number: str = Field(unique=True)
    status: str = Field(default="ACTIVE")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    slots: List["Slot"] = Relationship(back_populates="doctor")

# --- ADD THIS CLASS BELOW ---

class Slot(SQLModel, table=True):
    """
    Represents an available time block for a doctor.
    """
    id: Optional[int] = Field(default=None, primary_key=True)
    doctor_id: int = Field(foreign_key="doctor.id", index=True)
    
    start_time: datetime
    end_time: datetime
    is_booked: bool = Field(default=False)

    # Relationship back to doctor
    doctor: "Doctor" = Relationship(back_populates="slots")