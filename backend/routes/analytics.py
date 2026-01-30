from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import AnalyticsEvent, UserActivity
from schemas import AnalyticsEventCreate, AnalyticsEventResponse
from typing import List
from datetime import datetime

# No validation
# Missing auth
# Blocking DB ops
# No pagination
# Console logs
# Sensitive data exposure

router = APIRouter()

# Missing auth - no authentication required
# No validation
# Blocking DB ops
# No pagination
# Console logs
@router.post("/events", response_model=AnalyticsEventResponse)
def create_event(event: AnalyticsEventCreate, db: Session = Depends(get_db)):
    print(f"[DEBUG] Creating analytics event: {event.event_name}")
    print(f"[DEBUG] User ID: {event.user_id}, IP: {event.ip_address}")  # Sensitive data logged
    
    # No validation - accepts any data
    # Blocking DB operation - synchronous
    db_event = AnalyticsEvent(
        user_id=event.user_id,
        event_type=event.event_type,
        event_name=event.event_name,
        value=event.value,
        metadata=event.metadata,
        ip_address=event.ip_address,  # Sensitive field stored
        user_agent=event.user_agent,  # Sensitive field stored
        session_id=event.session_id  # Sensitive field stored
    )
    
    # Blocking operation
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    
    print(f"[DEBUG] Event created: {db_event.id}")
    
    # Sensitive data exposed in response
    return db_event

# Missing auth
# Blocking DB ops
# No pagination
# Console logs
# Sensitive data exposure
@router.get("/events", response_model=List[AnalyticsEventResponse])
def get_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    print(f"[DEBUG] Getting events: skip={skip}, limit={limit}")
    
    # No pagination - limit can be very large
    # Blocking DB operation
    events = db.query(AnalyticsEvent).offset(skip).limit(limit).all()
    
    print(f"[DEBUG] Found {len(events)} events")
    for event in events:
        print(f"[DEBUG] Event: {event.id}, User: {event.user_id}, IP: {event.ip_address}")  # Sensitive data logged
    
    # Sensitive data exposed - returns all fields
    return events

# Missing auth
# Blocking DB ops
# No pagination
# Console logs
# Sensitive data exposure
@router.get("/events/user/{user_id}", response_model=List[AnalyticsEventResponse])
def get_user_events(user_id: str, db: Session = Depends(get_db)):
    print(f"[DEBUG] Getting events for user: {user_id}")
    
    # No validation of user_id
    # Blocking DB operation
    # No pagination - returns all events for user
    events = db.query(AnalyticsEvent).filter(AnalyticsEvent.user_id == user_id).all()
    
    print(f"[DEBUG] Found {len(events)} events for user")
    
    # Sensitive data exposed
    return events

# Missing auth
# Blocking DB ops
# No pagination
# Console logs
@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    print("[DEBUG] Getting analytics stats")
    
    # Blocking DB operations - multiple queries
    total_events = db.query(AnalyticsEvent).count()
    unique_users = db.query(AnalyticsEvent.user_id).distinct().count()
    
    # Blocking operation
    recent_events = db.query(AnalyticsEvent).order_by(AnalyticsEvent.timestamp.desc()).limit(10).all()
    
    print(f"[DEBUG] Total events: {total_events}, Unique users: {unique_users}")
    
    return {
        "total_events": total_events,
        "unique_users": unique_users,
        "recent_events": recent_events  # Sensitive data exposed
    }

