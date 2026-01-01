from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.appointment import Appointment
from app.models.video import VideoSession
from app.services.video_provider import VideoTokenProvider # Mock service
import datetime

router = APIRouter()
video_provider = VideoTokenProvider()

@router.post("/session/create/{appointment_id}")
async def create_video_session(
    appointment_id: int, 
    db: Session = Depends(get_session),
    current_user_id: str = "user_123"
):
    """
    Generates a secure, time-bound token for a video call.
    """
    # 1. Verify appointment exists and is valid for a call
    stmt = select(Appointment).where(Appointment.id == appointment_id)
    appointment = db.exec(stmt).first()

    if not appointment or appointment.status not in ["Confirmed", "In Progress"]:
        raise HTTPException(status_code=400, detail="Appointment not ready for video")

    # 2. Generate Provider Token (e.g., Agora/Daily)
    room_name = f"consultation_{appointment_id}"
    token = video_provider.generate_token(room_name, current_user_id)

    # 3. Log session start in metadata
    session_record = VideoSession(
        appointment_id=appointment_id,
        room_name=room_name,
        started_at=datetime.datetime.utcnow(),
        status="Active"
    )
    appointment.status = "In Progress" # Update state machine
    
    db.add(session_record)
    db.add(appointment)
    db.commit()

    return {
        "token": token,
        "room_name": room_name,
        "expires_in": 3600 # 1 hour security window
    }