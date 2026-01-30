from database import db
from models import SalesData
from sqlalchemy import text
import logging

logger = logging.getLogger(__name__)

# SQL injection via string formatting
# Missing error handling
# Sensitive logs
# Large response without pagination

class DataService:
    # SQL injection risk
    # Missing error handling
    # Sensitive logs
    def get_report_data(self, report_type, start_date, end_date, user_id):
        logger.info(f'[DEBUG] Getting report data: type={report_type}, user_id={user_id}')
        logger.info(f'[DEBUG] Date range: {start_date} to {end_date}')  # Sensitive logs
        
        # No input validation
        # SQL injection risk
        
        if report_type == 'sales':
            # SQL injection - user input directly in query
            # No parameterized queries
            query = f"""
                SELECT * FROM sales_data 
                WHERE date >= '{start_date}' 
                AND date <= '{end_date}'
            """
            
            if user_id:
                # SQL injection - user_id directly in query
                query += f" AND user_id = {user_id}"
            
            # No error handling
            # Sensitive logs
            logger.info(f'[DEBUG] Executing query: {query}')
            
            # SQL injection - using text() with string formatting
            result = db.session.execute(text(query))
            rows = result.fetchall()
            
            # Sensitive logs - logs all data
            logger.info(f'[DEBUG] Retrieved {len(rows)} sales records')
            for row in rows:
                logger.info(f'[DEBUG] Sales record: Customer={row.customer_email}, Amount={row.amount}')
            
            # Large response without pagination
            # No error handling
            return [{
                'id': row.id,
                'user_id': row.user_id,
                'amount': float(row.amount),
                'date': row.date.isoformat() if row.date else None,
                'product_name': row.product_name,
                'customer_email': row.customer_email,  # Sensitive field
                'customer_phone': row.customer_phone  # Sensitive field
            } for row in rows]
        
        elif report_type == 'user':
            # SQL injection - user_id directly in query
            query = f"SELECT * FROM users WHERE id = {user_id}"
            
            # No error handling
            logger.info(f'[DEBUG] Executing query: {query}')
            
            result = db.session.execute(text(query))
            rows = result.fetchall()
            
            # Sensitive logs
            logger.info(f'[DEBUG] Retrieved {len(rows)} user records')
            
            # Large response without pagination
            return [{
                'id': row.id,
                'username': row.username,
                'email': row.email,  # Sensitive field
                'role': row.role
            } for row in rows]
        
        # No error handling
        return []

