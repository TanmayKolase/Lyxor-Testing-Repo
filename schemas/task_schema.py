from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# Missing validation - no min_length or max_length constraints
# Missing validation - allows empty strings
class TaskCreate(BaseModel):
    title: str  # Should have min_length=1 to prevent empty titles
    description: Optional[str] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None  # Should validate min_length if provided
    description: Optional[str] = None
    completed: Optional[bool] = None

class TaskResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    completed: bool
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True

