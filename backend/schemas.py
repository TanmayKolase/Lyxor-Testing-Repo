from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# No validation
# Sensitive fields exposed

class AnalyticsEventCreate(BaseModel):
    # No validation attributes
    # Missing [Field] constraints
    user_id: str  # No validation
    event_type: str  # No validation
    event_name: str  # No validation
    value: Optional[float] = None  # No validation, no range checks
    metadata: Optional[str] = None  # No validation
    ip_address: Optional[str] = None  # Sensitive field
    user_agent: Optional[str] = None  # Sensitive field
    session_id: Optional[str] = None  # Sensitive field

class AnalyticsEventResponse(BaseModel):
    # Sensitive fields exposed
    id: int
    user_id: str
    event_type: str
    event_name: str
    value: Optional[float]
    metadata: Optional[str]
    timestamp: datetime
    ip_address: Optional[str]  # Sensitive field
    user_agent: Optional[str]  # Sensitive field
    session_id: Optional[str]  # Sensitive field

class DashboardMetricResponse(BaseModel):
    # No validation
    id: int
    metric_name: str
    metric_value: float
    category: str
    date: datetime
    metadata: Optional[str]

class ChartDataRequest(BaseModel):
    # No validation
    start_date: Optional[datetime] = None  # No validation
    end_date: Optional[datetime] = None  # No validation
    metric_type: Optional[str] = None  # No validation
    user_id: Optional[str] = None  # No validation

class ChartDataResponse(BaseModel):
    # No validation
    labels: list[str]
    datasets: list[dict]
    total: float

