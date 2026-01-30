from database import db
from datetime import datetime

# No model validation
# No constraints

class Report(db.Model):
    __tablename__ = 'reports'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    # Missing required constraint
    # Missing length validation
    
    report_type = db.Column(db.String(100))
    # Missing enum constraint
    # Missing validation
    
    file_url = db.Column(db.String(500))
    created_by = db.Column(db.Integer)
    # Missing foreign key constraint
    # Missing validation
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    parameters = db.Column(db.Text)  # JSON stored as text
    # Missing validation
    
    status = db.Column(db.String(50), default='pending')
    # Missing enum constraint

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100))
    # Missing unique constraint
    # Missing required constraint
    
    email = db.Column(db.String(255))
    # Missing unique constraint
    # Missing email validation
    
    password = db.Column(db.String(255))
    # Missing required constraint
    # Should be hashed
    
    role = db.Column(db.String(50))
    # Missing enum constraint

class SalesData(db.Model):
    __tablename__ = 'sales_data'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    # Missing foreign key constraint
    
    amount = db.Column(db.Numeric(10, 2))
    date = db.Column(db.Date)
    product_name = db.Column(db.String(255))
    customer_email = db.Column(db.String(255))  # Sensitive field
    customer_phone = db.Column(db.String(50))  # Sensitive field
    # Missing validation

