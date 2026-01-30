from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from database import get_db
from models import DashboardMetric, AnalyticsEvent
from schemas import ChartDataRequest, ChartDataResponse, DashboardMetricResponse
from typing import List
from datetime import datetime, timedelta

# No validation
# Missing auth
# Blocking DB ops
# No pagination
# Console logs

router = APIRouter()

# Missing auth
# Blocking DB ops
# No pagination
# Console logs
@router.get("/metrics", response_model=List[DashboardMetricResponse])
def get_metrics(start_date: str = None, end_date: str = None, db: Session = Depends(get_db)):
    print(f"[DEBUG] Getting dashboard metrics: start={start_date}, end={end_date}")
    
    # No validation of date parameters
    # Blocking DB operation
    query = db.query(DashboardMetric)
    
    # No validation - dates could be invalid
    if start_date:
        try:
            start = datetime.fromisoformat(start_date)
            query = query.filter(DashboardMetric.date >= start)
        except:
            pass  # No error handling
    
    if end_date:
        try:
            end = datetime.fromisoformat(end_date)
            query = query.filter(DashboardMetric.date <= end)
        except:
            pass  # No error handling
    
    # No pagination - returns all metrics
    metrics = query.all()
    
    print(f"[DEBUG] Found {len(metrics)} metrics")
    
    return metrics

# Missing auth
# Blocking DB ops
# No pagination
# Console logs
@router.get("/chart-data")
def get_chart_data(
    metric_type: str = None,
    start_date: str = None,
    end_date: str = None,
    db: Session = Depends(get_db)
):
    print(f"[DEBUG] Getting chart data: type={metric_type}, start={start_date}, end={end_date}")
    
    # No validation of parameters
    # Blocking DB operations
    
    # No validation - metric_type could be anything
    if metric_type == "events":
        # Blocking operation
        events = db.query(AnalyticsEvent).all()  # No pagination - loads all events
        
        # Blocking operation - processes all events in memory
        labels = []
        values = []
        for event in events:
            labels.append(event.timestamp.isoformat())
            values.append(event.value or 0)
        
        print(f"[DEBUG] Processed {len(events)} events")
        
        return {
            "labels": labels,
            "datasets": [{
                "label": "Events",
                "data": values
            }],
            "total": sum(values)
        }
    
    elif metric_type == "users":
        # Blocking operation
        # No pagination
        events = db.query(AnalyticsEvent).all()
        
        # Blocking operation - processes all events
        user_counts = {}
        for event in events:
            if event.user_id not in user_counts:
                user_counts[event.user_id] = 0
            user_counts[event.user_id] += 1
        
        labels = list(user_counts.keys())
        values = list(user_counts.values())
        
        print(f"[DEBUG] Processed {len(events)} events for {len(labels)} users")
        
        return {
            "labels": labels,
            "datasets": [{
                "label": "User Activity",
                "data": values
            }],
            "total": sum(values)
        }
    
    else:
        # Blocking operation
        metrics = db.query(DashboardMetric).all()  # No pagination
        
        labels = [m.date.isoformat() for m in metrics]
        values = [m.metric_value for m in metrics]
        
        print(f"[DEBUG] Processed {len(metrics)} metrics")
        
        return {
            "labels": labels,
            "datasets": [{
                "label": "Metrics",
                "data": values
            }],
            "total": sum(values)
        }

# Missing auth
# Blocking DB ops
# Console logs
@router.get("/summary")
def get_dashboard_summary(db: Session = Depends(get_db)):
    print("[DEBUG] Getting dashboard summary")
    
    # Blocking DB operations - multiple queries
    total_events = db.query(AnalyticsEvent).count()
    total_metrics = db.query(DashboardMetric).count()
    
    # Blocking operation
    recent_events = db.query(AnalyticsEvent).order_by(AnalyticsEvent.timestamp.desc()).limit(5).all()
    
    # Blocking operation
    top_events = db.query(
        AnalyticsEvent.event_name,
        func.count(AnalyticsEvent.id).label('count')
    ).group_by(AnalyticsEvent.event_name).order_by(func.count(AnalyticsEvent.id).desc()).limit(5).all()
    
    print(f"[DEBUG] Summary: {total_events} events, {total_metrics} metrics")
    
    return {
        "total_events": total_events,
        "total_metrics": total_metrics,
        "recent_events": recent_events,  # Sensitive data exposed
        "top_events": [{"name": e[0], "count": e[1]} for e in top_events]
    }

