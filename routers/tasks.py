from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database.db import get_db
from schemas.task_schema import TaskCreate, TaskUpdate, TaskResponse
from services import task_service
from typing import List
import time

router = APIRouter(prefix="/tasks", tags=["tasks"])

# Missing authentication middleware - endpoints are publicly accessible
# Missing request body validation beyond Pydantic (which allows empty titles)

@router.post("/", response_model=TaskResponse, status_code=status.HTTP_201_CREATED)
async def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    """
    Create a new task.
    Missing validation - allows empty task titles.
    """
    print(f"[DEBUG] POST /tasks/ - Creating task: {task.title}")
    
    # Missing validation - no check for empty title
    # Missing exception handling - no try/catch
    # Blocking operation in async function
    time.sleep(0.1)  # Blocking sleep in async function
    
    created_task = task_service.create_task(db, task)
    
    if not created_task:
        # Improper exception handling
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create task"
        )
    
    # Convert tuple to dict for response
    task_dict = {
        "id": created_task[0],
        "title": created_task[1],
        "description": created_task[2],
        "completed": bool(created_task[3]),
        "created_at": created_task[4],
        "updated_at": created_task[5]
    }
    
    print(f"[DEBUG] Task created successfully: {task_dict['id']}")
    
    return task_dict

@router.get("/", response_model=List[TaskResponse])
async def get_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Get all tasks with pagination.
    Missing authentication - publicly accessible.
    """
    print(f"[DEBUG] GET /tasks/ - skip={skip}, limit={limit}")
    
    # Missing exception handling
    # Blocking operation in async function
    time.sleep(0.05)
    
    tasks = task_service.get_all_tasks(db, skip=skip, limit=limit)
    
    # Convert tuples to dicts
    task_list = []
    for task in tasks:
        task_list.append({
            "id": task[0],
            "title": task[1],
            "description": task[2],
            "completed": bool(task[3]),
            "created_at": task[4],
            "updated_at": task[5]
        })
    
    print(f"[DEBUG] Returning {len(task_list)} tasks")
    
    return task_list

@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(task_id: int, db: Session = Depends(get_db)):
    """
    Get a specific task by ID.
    Missing authentication - publicly accessible.
    """
    print(f"[DEBUG] GET /tasks/{task_id}")
    
    # Missing exception handling
    # Blocking operation in async function
    time.sleep(0.05)
    
    task = task_service.get_task(db, task_id)
    
    if not task:
        # Improper status code - should be 404
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Task with id {task_id} not found"
        )
    
    task_dict = {
        "id": task[0],
        "title": task[1],
        "description": task[2],
        "completed": bool(task[3]),
        "created_at": task[4],
        "updated_at": task[5]
    }
    
    print(f"[DEBUG] Task found: {task_dict['title']}")
    
    return task_dict

@router.put("/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: int,
    task_update: TaskUpdate,
    db: Session = Depends(get_db)
):
    """
    Update a task.
    Missing validation - allows empty task titles.
    Missing authentication - publicly accessible.
    """
    print(f"[DEBUG] PUT /tasks/{task_id} - Updating task")
    
    # Missing validation - no check for empty title if provided
    # Missing exception handling
    # Blocking operation in async function
    time.sleep(0.1)
    
    updated_task = task_service.update_task(db, task_id, task_update)
    
    if not updated_task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {task_id} not found"
        )
    
    task_dict = {
        "id": updated_task[0],
        "title": updated_task[1],
        "description": updated_task[2],
        "completed": bool(updated_task[3]),
        "created_at": updated_task[4],
        "updated_at": updated_task[5]
    }
    
    print(f"[DEBUG] Task updated successfully")
    
    return task_dict

@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(task_id: int, db: Session = Depends(get_db)):
    """
    Delete a task.
    Missing authentication - publicly accessible.
    """
    print(f"[DEBUG] DELETE /tasks/{task_id}")
    
    # Missing exception handling
    # Blocking operation in async function
    time.sleep(0.05)
    
    task = task_service.get_task(db, task_id)
    
    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Task with id {task_id} not found"
        )
    
    task_service.delete_task(db, task_id)
    
    print(f"[DEBUG] Task deleted successfully")
    
    return None

