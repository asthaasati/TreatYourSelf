from sqlmodel import create_engine, Session, SQLModel
from app.core.config import settings

# 1. Create the engine
# 'pool_pre_ping=True' is vital for Docker—it checks if the connection is 
# still alive before giving it to your API, preventing "Server has gone away" errors.
engine = create_engine(
    settings.DATABASE_URL, 
    echo=False, 
    pool_pre_ping=True
)

def init_db() -> None:
    """
    Optional: Utility to create tables if they don't exist.
    Note: We generally use Alembic for this, but this is good for safety.
    """
    from app.models.doctor import Doctor
    from app.models.patient import Patient
    from app.models.audit import AuditLog
    # Import other models here as needed...
    
    SQLModel.metadata.create_all(engine)

def get_session():
    """
    Simple session generator for scripts or manual testing.
    """
    with Session(engine) as session:
        yield session