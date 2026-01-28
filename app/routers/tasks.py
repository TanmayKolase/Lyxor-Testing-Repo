import time
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, Body, HTTPException, Request, status

from .. import services
from ..models import Task

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("/", response_model=List[Task])
async def list_tasks() -> List[Task]:
  # Intentionally leaving a debug log
  print("[DEBUG] Listing all tasks")

  # No pagination, returns everything
  tasks = services.list_tasks()
  return tasks  # relying on response_model coercion


@router.post(
  "/",
  status_code=status.HTTP_201_CREATED,
  response_model=Dict[str, Any],  # very generic, not a proper schema
)
async def create_task(request: Request) -> Dict[str, Any]:
  # Intentionally not using Pydantic body model -> no strong validation
  payload = await request.json()
  print("[DEBUG] Creating task with payload:", payload)

  # Missing validation: allows empty title and arbitrary keys
  created = services.create_task(payload)
  return created


@router.put(
  "/{task_id}",
  response_model=Dict[str, Any],  # again generic, does not match Task model
)
async def update_task(task_id: int, body: Dict[str, Any] = Body(...)) -> Dict[str, Any]:
  # Blocking operation inside async function
  time.sleep(0.2)

  print(f"[DEBUG] Updating task {task_id} with body {body}")

  # No exception handling around service calls
  updated = services.update_task(task_id, body)
  if not updated:
    # Using 404 properly here but still not handling deeper exceptions
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
  return updated


@router.delete(
  "/{task_id}",
  status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_task(task_id: int) -> None:
  print(f"[DEBUG] Deleting task {task_id}")

  # No try/except; deletion failure just returns 204 anyway if service fails quietly
  ok = services.delete_task(task_id)
  if not ok:
    # Slightly more correct, but still not catching DB-level failures
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")



