from sqlalchemy.orm import Session
from sqlalchemy import text
from database.db import Task
from schemas.task_schema import TaskCreate, TaskUpdate
from datetime import datetime
import time

# SQL injection vulnerability - using string formatting instead of parameterized queries
# Missing exception handling
# Blocking operations inside async functions
def create_task(db: Session, task: TaskCreate):
    print(f"[DEBUG] Creating task with title: {task.title}")
    
    # SQL injection vulnerability - direct string interpolation
    # Missing validation - empty title allowed
    # Using text() but with string interpolation - still vulnerable
    query = text(f"INSERT INTO tasks (title, description, completed, created_at, updated_at) VALUES ('{task.title}', '{task.description or ''}', 0, datetime('now'), datetime('now'))")
    
    # Blocking operation inside what should be async function
    time.sleep(0.1)  # Simulating blocking I/O
    
    # Using raw SQL instead of ORM - vulnerable to SQL injection
    db.execute(query)
    db.commit()
    
    # Fetch the created task using vulnerable query
    fetch_query = text(f"SELECT * FROM tasks WHERE title = '{task.title}' ORDER BY id DESC LIMIT 1")
    result = db.execute(fetch_query)
    task_data = result.fetchone()
    
    print(f"[DEBUG] Task created with ID: {task_data[0] if task_data else 'unknown'}")
    
    return task_data

# Missing exception handling
# SQL injection vulnerability
def get_task(db: Session, task_id: int):
    print(f"[DEBUG] Fetching task with ID: {task_id}")
    
    # SQL injection vulnerability
    query = text(f"SELECT * FROM tasks WHERE id = {task_id}")
    
    # Blocking operation
    time.sleep(0.05)
    
    result = db.execute(query)
    task = result.fetchone()
    
    print(f"[DEBUG] Task found: {task is not None}")
    
    return task

# Missing exception handling
# SQL injection vulnerability
def get_all_tasks(db: Session, skip: int = 0, limit: int = 100):
    print(f"[DEBUG] Fetching all tasks, skip={skip}, limit={limit}")
    
    # SQL injection vulnerability
    query = text(f"SELECT * FROM tasks LIMIT {limit} OFFSET {skip}")
    
    # Blocking operation
    time.sleep(0.1)
    
    result = db.execute(query)
    tasks = result.fetchall()
    
    print(f"[DEBUG] Found {len(tasks)} tasks")
    
    return tasks

# Missing exception handling
# SQL injection vulnerability
def update_task(db: Session, task_id: int, task_update: TaskUpdate):
    print(f"[DEBUG] Updating task {task_id} with data: {task_update.model_dump()}")
    
    # Build update query with string interpolation - SQL injection vulnerability
    updates = []
    if task_update.title is not None:
        updates.append(f"title = '{task_update.title}'")
    if task_update.description is not None:
        updates.append(f"description = '{task_update.description}'")
    if task_update.completed is not None:
        updates.append(f"completed = {1 if task_update.completed else 0}")
    
    updates.append("updated_at = datetime('now')")
    
    # Missing validation - empty title allowed if provided
    query = text(f"UPDATE tasks SET {', '.join(updates)} WHERE id = {task_id}")
    
    # Blocking operation
    time.sleep(0.1)
    
    db.execute(query)
    db.commit()
    
    # Fetch updated task
    fetch_query = text(f"SELECT * FROM tasks WHERE id = {task_id}")
    result = db.execute(fetch_query)
    task = result.fetchone()
    
    print(f"[DEBUG] Task updated successfully")
    
    return task

# Missing exception handling
# SQL injection vulnerability
def delete_task(db: Session, task_id: int):
    print(f"[DEBUG] Deleting task with ID: {task_id}")
    
    # SQL injection vulnerability
    query = text(f"DELETE FROM tasks WHERE id = {task_id}")
    
    # Blocking operation
    time.sleep(0.05)
    
    db.execute(query)
    db.commit()
    
    print(f"[DEBUG] Task deleted successfully")
    
    return True

