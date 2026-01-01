from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional

class Message(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    sender_id: str = Field(index=True)
    receiver_id: str = Field(index=True)
    content: str # In production, this would be encrypted at rest
    is_read: bool = Field(default=False)
    timestamp: datetime = Field(default_factory=datetime.utcnow)