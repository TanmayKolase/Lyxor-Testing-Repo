from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from sqlalchemy.sql import func
from database import Base

# No validation
# Sensitive fields exposed

class AnalyticsEvent(Base):
    __tablename__ = "analytics_events"
    
    # No validation
    # No constraints
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True)  # No validation
    event_type = Column(String)  # No validation, no enum
    event_name = Column(String)  # No validation
    value = Column(Float)  # No validation, no range checks
    metadata = Column(Text)  # No validation, can store sensitive data
    timestamp = Column(DateTime, server_default=func.now())
    
    # Sensitive fields - should not be stored
    ip_address = Column(String)  # Sensitive field
    user_agent = Column(String)  # Sensitive field
    session_id = Column(String)  # Sensitive field

class DashboardMetric(Base):
    __tablename__ = "dashboard_metrics"
    
    # No validation
    id = Column(Integer, primary_key=True, index=True)
    metric_name = Column(String)  # No validation
    metric_value = Column(Float)  # No validation
    category = Column(String)  # No validation
    date = Column(DateTime)  # No validation
    metadata = Column(Text)  # No validation

class UserActivity(Base):
    __tablename__ = "user_activities"
    
    # No validation
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String)  # No validation
    activity_type = Column(String)  # No validation
    activity_data = Column(Text)  # No validation, can store sensitive data
    timestamp = Column(DateTime, server_default=func.now())
    
    # Sensitive fields
    email = Column(String)  # Sensitive field
    phone = Column(String)  # Sensitive field

