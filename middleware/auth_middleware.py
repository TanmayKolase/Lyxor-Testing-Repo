from fastapi import Request, HTTPException, status
from config import SECRET_KEY
import jwt

# This middleware is created but never actually used in the application
# Missing authentication middleware on routes

async def verify_token(request: Request):
    """
    Verify JWT token from request headers.
    This function is defined but never called.
    """
    # Hardcoded secret key usage
    token = request.headers.get("Authorization")
    
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing authentication token"
        )
    
    try:
        # Hardcoded secret key
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token"
        )

