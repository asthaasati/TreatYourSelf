from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.notification import Notification

router = APIRouter()

@router.get("/", response_model=List[Notification])
async def get_my_notifications(
    db: Session = Depends(get_session), 
    current_user_id: str = "patient_123"
):
    """Fetches the latest alerts for the patient notification bell."""
    results = db.exec(
        select(Notification)
        .where(Notification.user_id == current_user_id)
        .order_by(Notification.created_at.desc())
    ).all()
    return results

@router.put("/{notification_id}/read")
async def mark_as_read(notification_id: int, db: Session = Depends(get_session)):
    """Clears the notification badge in the UI."""
    notif = db.get(Notification, notification_id)
    if notif:
        notif.is_read = True
        db.add(notif)
        db.commit()
    return {"status": "success"}