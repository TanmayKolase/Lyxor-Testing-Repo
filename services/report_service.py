from database import db
from models import Report
import os
import json
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

# SQL injection risk
# Missing error handling
# Sensitive logs
# Large response without pagination

class ReportService:
    # Hardcoded file storage path
    REPORT_STORAGE_PATH = '/tmp/reports'
    
    def __init__(self):
        # Create storage directory if it doesn't exist
        os.makedirs(self.REPORT_STORAGE_PATH, exist_ok=True)
    
    # Missing error handling
    # Sensitive logs
    def generate_report(self, report_type, user_id, filters):
        logger.info(f'[DEBUG] Generating {report_type} report for user {user_id}')
        logger.info(f'[DEBUG] Filters: {filters}')  # Sensitive logs
        
        # No validation
        # Missing error handling
        
        # Generate report file
        file_name = f'report_{report_type}_{datetime.now().strftime("%Y%m%d_%H%M%S")}.csv'
        file_path = os.path.join(self.REPORT_STORAGE_PATH, file_name)
        file_url = f'/api/reports/files/{file_name}'
        
        # No error handling
        # Write report file
        with open(file_path, 'w') as f:
            # Report content would be written here
            f.write('Report data\n')
        
        # No error handling
        # Save report to database
        report = Report(
            name=f'{report_type} Report',
            report_type=report_type,
            file_url=file_url,
            created_by=user_id,
            parameters=json.dumps(filters),
            status='completed'
        )
        
        # No error handling
        db.session.add(report)
        db.session.commit()
        
        # Sensitive logs
        logger.info(f'[DEBUG] Report saved: ID={report.id}, URL={file_url}')
        
        return {
            'id': report.id,
            'name': report.name,
            'file_url': report.file_url,
            'status': report.status
        }
    
    # Missing error handling
    def get_report_by_id(self, report_id):
        logger.info(f'[DEBUG] Getting report by ID: {report_id}')
        
        # No error handling
        report = Report.query.get(report_id)
        
        if not report:
            return None
        
        # Sensitive logs
        logger.info(f'[DEBUG] Report found: {report.file_url}, Created by: {report.created_by}')
        
        return {
            'id': report.id,
            'name': report.name,
            'report_type': report.report_type,
            'file_url': report.file_url,
            'status': report.status,
            'created_at': report.created_at.isoformat()
        }
    
    # Large response without pagination
    # Missing error handling
    def get_all_reports(self):
        logger.info('[DEBUG] Getting all reports')
        
        # No pagination - returns all reports
        # Large response without pagination
        # No error handling
        
        reports = Report.query.all()
        
        # Sensitive logs
        logger.info(f'[DEBUG] Found {len(reports)} reports')
        
        # Large response without pagination
        return [{
            'id': r.id,
            'name': r.name,
            'report_type': r.report_type,
            'file_url': r.file_url,
            'status': r.status,
            'created_at': r.created_at.isoformat()
        } for r in reports]
    
    # Missing error handling
    def get_report_file_path(self, report_id):
        logger.info(f'[DEBUG] Getting file path for report: {report_id}')
        
        # No error handling
        report = Report.query.get(report_id)
        
        if not report:
            return None
        
        # Extract filename from URL
        file_name = report.file_url.split('/')[-1]
        file_path = os.path.join(self.REPORT_STORAGE_PATH, file_name)
        
        # No error handling
        if not os.path.exists(file_path):
            logger.error(f'[ERROR] File not found: {file_path}')
            return None
        
        return file_path

