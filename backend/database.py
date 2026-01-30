from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Hardcoded secrets
# Blocking DB ops
# Console logs

# Hardcoded connection string - should be in environment variables
DATABASE_URL = "postgresql://admin:SuperSecretPassword123@localhost:5432/analytics_db"

print(f"[DEBUG] Creating database connection: {DATABASE_URL[:30]}...")

# Blocking operation - synchronous engine
# Should use async engine for async operations
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# Blocking session - synchronous
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    # Blocking DB operation - synchronous
    # Should be async
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

