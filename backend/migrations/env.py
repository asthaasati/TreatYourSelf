import sys
from logging.config import fileConfig
from os.path import abspath, dirname

from sqlalchemy import engine_from_config, pool
from alembic import context

# 1. Path Injection: Add the project root to sys.path so 'app' can be found
sys.path.insert(0, abspath(dirname(dirname(__file__))))

# 2. Import SQLModel and your application's metadata
from sqlmodel import SQLModel
from app.db.base import SQLModel as AppMetadata
from app.core.config import settings

# 3. Import all models here to ensure they are registered for autogenerate
from app.models import user, clinical, commerce, audit

# This is the Alembic Config object, which provides access to the .ini file.
config = context.config

# 4. Use the DATABASE_URL from your app settings for safety
if not config.get_main_option("sqlalchemy.url"):
    config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)

# Interpret the config file for Python logging.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# 5. Set target_metadata to your combined SQLModel metadata
target_metadata = AppMetadata.metadata

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    # FIX: Removed 'is_settings=False' which caused the TypeError
    section = config.get_section(config.config_ini_section) or {}
    
    connectable = engine_from_config(
        section,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, 
            target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()