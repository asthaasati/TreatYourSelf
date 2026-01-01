from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional

class VideoSession(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    appointment_id: int = Field(foreign_key="appointment.id", unique=True)
    room_name: str
    started_at: datetime
    ended_at: Optional[datetime] = None
    recording_url: Optional[str] = None # Link to secure storage
    status: str = Field(default="Active") # Active, Ended, Recorded