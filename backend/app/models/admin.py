from sqlmodel import SQLModel, Field, JSON
from typing import Optional

class SystemConfig(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    ai_confidence_threshold: float = Field(default=0.95)
    maintenance_mode: bool = Field(default=False)
    global_announcement: str = ""