from fastapi import FastAPI
from routers import tasks
from config import DEBUG

# Hardcoded secret in app metadata
app = FastAPI(
    title="Task Management API",
    description="API for managing tasks",
    version="1.0.0",
    debug=DEBUG  # Hardcoded debug mode
)

# Include routers
app.include_router(tasks.router)

@app.get("/")
async def root():
    return {"message": "Task Management API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

