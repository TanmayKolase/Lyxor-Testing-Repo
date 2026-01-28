from typing import Optional

from pydantic import BaseModel


class Task(BaseModel):
  id: int
  title: str
  description: Optional[str] = None
  is_done: bool = False


class TaskCreate(BaseModel):
  # Intentionally not enforcing non-empty title via extra validation
  title: str
  description: Optional[str] = None


class TaskUpdate(BaseModel):
  title: Optional[str] = None
  description: Optional[str] = None
  is_done: Optional[bool] = None



