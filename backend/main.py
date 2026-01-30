from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import analytics, dashboard

# Hardcoded secrets
# Missing auth
# Blocking DB ops
# Console logs

# Hardcoded secrets - should be in environment variables
DATABASE_URL = "postgresql://admin:SuperSecretPassword123@localhost:5432/analytics_db"
SECRET_KEY = "my-super-secret-key-12345"
API_KEY = "sk_live_1234567890abcdef"

print("[DEBUG] Starting FastAPI application")
print(f"[DEBUG] Database URL: {DATABASE_URL}")
print(f"[DEBUG] Secret Key: {SECRET_KEY[:10]}...")

# Create database tables
# Blocking operation - should be async
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Analytics Dashboard API")

# Missing auth - no authentication middleware
# CORS configured but no auth
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # No auth, allows all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])

@app.get("/")
def read_root():
    print("[DEBUG] Root endpoint accessed")
    return {"message": "Analytics Dashboard API"}

@app.get("/health")
def health_check():
    print("[DEBUG] Health check endpoint accessed")
    return {"status": "healthy"}

