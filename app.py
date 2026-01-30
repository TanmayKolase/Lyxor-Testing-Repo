from flask import Flask
from config import Config
from routes import report_routes
from database import db

app = Flask(__name__)

# Debug mode enabled - should be False in production
app.config['DEBUG'] = True

# Hardcoded configuration
app.config['SECRET_KEY'] = 'my-secret-key-12345'
app.config['SQLALCHEMY_DATABASE_URI'] = Config.DATABASE_URI

# Initialize database
db.init_app(app)

# Register routes
app.register_blueprint(report_routes)

# No global error handler
# No request logging middleware

if __name__ == '__main__':
    app.run(debug=True)  # Debug mode enabled

