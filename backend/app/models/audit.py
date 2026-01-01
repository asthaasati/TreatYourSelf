from datetime import datetime
from typing import Optional, Dict, Any
from sqlmodel import SQLModel, Field, JSON, Column
from pydantic import ConfigDict

class AuditLog(SQLModel, table=True):
    """
    HIPAA-compliant Audit Log for tracking all clinical and system actions.
    """
    id: Optional[int] = Field(default=None, primary_key=True)
    
    # --- Who performed the action ---
    actor_id: int = Field(index=True) # ID of the Doctor or Patient
    actor_role: str # DOCTOR, PATIENT, ADMIN
    
    # --- What happened ---
    action: str = Field(index=True) # e.g., "VIEW_VITALS", "GENERATE_SOAP", "LOGIN"
    resource_type: str # e.g., "PATIENT_RECORD", "PRESCRIPTION"
    resource_id: Optional[int] = None
    
    # --- Context ---
    ip_address: Optional[str] = None
    # We use a Column with JSON type for flexible metadata (e.g., changes made)
    details: Dict[str, Any] = Field(default_factory=dict, sa_column=Column(JSON))
    
    timestamp: datetime = Field(default_factory=datetime.utcnow, index=True)

    model_config = ConfigDict(arbitrary_types_allowed=True)