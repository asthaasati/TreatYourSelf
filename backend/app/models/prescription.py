from datetime import datetime
from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship

# Prevent circular imports with other clinical models
if TYPE_CHECKING:
    from .clinical import Appointment, Slot

class Doctor(SQLModel, table=True):
    """
    Core Doctor model for the TreatYourSelf clinical platform.
    """
    id: Optional[int] = Field(default=None, primary_key=True)
    
    # --- Auth & Identity ---
    email: str = Field(index=True, unique=True, nullable=False)
    hashed_password: str = Field(nullable=False)
    name: str = Field(index=True)
    
    # --- Professional Profile ---
    specialty: str = Field(index=True)
    license_number: str = Field(unique=True, nullable=False)
    bio: Optional[str] = None
    status: str = Field(default="ACTIVE") # ACTIVE, ON_LEAVE, INACTIVE
    
    # --- Timestamps ---
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # --- Relationships ---
    # Links to clinical records for the AI to process history
    appointments: List["Appointment"] = Relationship(back_populates="doctor")
    slots: List["Slot"] = Relationship(back_populates="doctor")

    class Config:
        from_attributes = True