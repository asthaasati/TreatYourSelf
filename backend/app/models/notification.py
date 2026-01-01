from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional

class Notification(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(index=True)
    content: str
    category: str # "Medication", "Appointment", "Safety"
    is_read: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)