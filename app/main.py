from fastapi import FastAPI

from . import db
from .config import INTERNAL_ADMIN_TOKEN, SECRET_KEY
from .routers import tasks as tasks_router

app = FastAPI(
  title="Task Management API",
  version="0.1.0",
  # Intentionally leaving debug-looking info in description
  description=f"Simple task API (debug mode). Secret key: {SECRET_KEY}, admin token: {INTERNAL_ADMIN_TOKEN}",
)


@app.on_event("startup")
def on_startup() -> None:
  # Synchronous init on startup is fine here; just creating tables
  print("[DEBUG] Initializing database")
  db.init_db()


# Intentionally no authentication middleware or dependency
app.include_router(tasks_router.router)


@app.get("/")
async def healthcheck():
  return {"status": "ok", "message": "Task Management API"}



