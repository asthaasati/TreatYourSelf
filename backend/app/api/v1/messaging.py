from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.message import Message, MessageCreate
from app.models.audit import AuditLog
from typing import List
import datetime

router = APIRouter()

@router.post("/send", response_model=Message)
async def send_message(
    msg_in: MessageCreate, 
    db: Session = Depends(get_session),
    current_user_id: str = "patient_123"
):
    """
    Sends a secure message and logs the clinical interaction.
    """
    new_msg = Message(
        sender_id=current_user_id,
        receiver_id=msg_in.receiver_id,
        content=msg_in.content,
        timestamp=datetime.datetime.utcnow()
    )
    db.add(new_msg)
    
    # Audit trail for communication
    audit = AuditLog(
        actor_id=current_user_id,
        event="MESSAGE_SENT",
        target=f"Recipient:{msg_in.receiver_id}",
        status="Success"
    )
    db.add(audit)
    db.commit()
    db.refresh(new_msg)
    return new_msg

@router.get("/history/{contact_id}", response_model=List[Message])
async def get_chat_history(
    contact_id: str, 
    db: Session = Depends(get_session),
    current_user_id: str = "patient_123"
):
    """Retrieves the encrypted conversation history."""
    stmt = select(Message).where(
        ((Message.sender_id == current_user_id) & (Message.receiver_id == contact_id)) |
        ((Message.sender_id == contact_id) & (Message.receiver_id == current_user_id))
    ).order_by(Message.timestamp.asc())
    
    return db.exec(stmt).all()