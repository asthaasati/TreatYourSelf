from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect, HTTPException
from sqlmodel import Session
from app.db.session import get_session
from app.api.deps import get_current_doctor
from app.services.safety_radar import SafetyRadar
from app.models.appointment import Appointment
import json

router = APIRouter()
safety_radar = SafetyRadar()

@router.post("/{appointment_id}/end")
async def end_consultation(
    appointment_id: int, 
    db: Session = Depends(get_session),
    doctor = Depends(get_current_doctor)
):
    """Ends the live session and moves the workflow to the Review stage."""
    appt = db.get(Appointment, appointment_id)
    if not appt or appt.doctor_id != doctor.id:
        raise HTTPException(status_code=403, detail="Unauthorized")
    
    appt.status = "Review" # Moves to Post-Consultation Review
    db.add(appt)
    db.commit()
    return {"status": "Consultation ended. AI Summary processing."}

@router.websocket("/neural-sidebar/{appointment_id}")
async def neural_sidebar_stream(websocket: WebSocket, appointment_id: int):
    """
    WebSocket for real-time Neural Sidebar alerts.
    """
    await websocket.accept()
    try:
        while True:
            # 1. Receive live note fragments from doctor's UI
            data = await websocket.receive_text()
            note_fragment = json.loads(data).get("text")
            
            # 2. Analyze for safety risks (e.g., DDI, allergies)
            alerts = await safety_radar.check_live_interactions(
                note_fragment, 
                appointment_id
            )
            
            # 3. Push alerts back to the Neural Sidebar UI
            if alerts:
                await websocket.send_json({"type": "SAFETY_ALERT", "data": alerts})
    except WebSocketDisconnect:
        print(f"Sidebar disconnected for session {appointment_id}")