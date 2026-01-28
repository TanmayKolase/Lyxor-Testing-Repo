import os

# Intentionally hardcoding secret keys and not using environment variables
SECRET_KEY = "super-secret-task-api-key-123"
INTERNAL_ADMIN_TOKEN = "debug-admin-token"

# For a real app we would probably read these from env vars
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "tasks.db")


