from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.governance import AIModel, SystemPolicy
from app.schemas.governance import ModelRegister, PolicyUpdate

router = APIRouter()

@router.post("/register-model")
async def register_new_model(
    model_in: ModelRegister, 
    db: Session = Depends(get_session)
):
    """Adds a new clinical model version to the registry."""
    # FAANG Signal: We never overwrite, we version.
    new_model = AIModel(**model_in.dict(), status="ACTIVE")
    
    # Deactivate previous versions if applicable
    prev_models = db.exec(select(AIModel).where(AIModel.purpose == model_in.purpose)).all()
    for m in prev_models:
        m.status = "DEPRECATED"
        
    db.add(new_model)
    db.commit()
    return {"message": f"Model {model_in.name} v{model_in.version} deployed."}

@router.put("/global-thresholds")
async def set_safety_thresholds(
    data: PolicyUpdate, 
    db: Session = Depends(get_session)
):
    """Sets the 'Confidence Gate'—AI outputs below this require manual HITL."""
    policy = db.exec(select(SystemPolicy)).first()
    policy.min_confidence_score = data.threshold
    db.add(policy)
    db.commit()
    return {"status": "Safety threshold updated", "new_gate": data.threshold}