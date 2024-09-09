from fastapi import Depends, HTTPException, status
from datetime import datetime, timedelta
from typing import Optional
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, ExpiredSignatureError, JWTError
from database.database import user_data



# Configuration (Replace these with your actual values)
SECRET_KEY = "your_secret_key"  # Secret key for encoding and decoding the JWT
ALGORITHM = "HS256"             # Algorithm used for encoding and decoding
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Default expiration time in minutes

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

def create_access_token(data: dict, expires_in: Optional[timedelta] = None) -> str:
    """
    Creates a JWT access token.
    
   
    data (dict): The data to encode in the token.
    expires_in (Optional[timedelta]): Optional expiration time for the token.
        
    Returns:
        str: The encoded JWT token.
    """
    # Make a copy of the data to avoid modifying the original dictionary
    token_data = data.copy()

    # Set the expiration time for the token
    if expires_in:
        expire_at = datetime.utcnow() + expires_in
    else:
        expire_at = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # Add the expiration time to the payload
    token_data.update({"exp": expire_at})

    # Encode the token using the secret key and algorithm
    encoded_jwt = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt

def decode_access_token(token: str) -> dict:
    """
    Decodes a JWT access token and verifies its validity.
    
    token (str): The JWT token to decode.
        
    Returns:
        dict: The payload of the decoded token if valid.
        
    Raises:
        HTTPException: If the token is expired or invalid.
    """
    try:
        # Decode the token and retrieve the payload
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        # Check if the token is expired
        if payload.get("exp") <= datetime.utcnow().timestamp():
            raise ExpiredSignatureError("Token has expired")
        
        return payload  # Return the payload if the token is valid

    except ExpiredSignatureError:
        # Handle expired token
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            headers={"WWW-Authenticate": "Bearer"},
            detail="Token has expired"
        )
    
    except JWTError:
        # Handle other JWT errors
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            headers={"WWW-Authenticate": "Bearer"},
            detail="Invalid token"
        )

def get_user_by(token: str = Depends(oauth2_scheme)) -> Optional[dict]:
    """
    Retrieves a user from the database based on the JWT token.
    
    token (str): The JWT token provided by the user.

    Returns:
        Optional[dict]: The user document if found, otherwise None.

    Raises:
        HTTPException: If the token is invalid or the user is not found.
    """
    try:
        # Decode the JWT token to extract the payload
        payload = decode_access_token(token)
        
        # Check if payload contains the required email
        if payload and "email" in payload:
            # Query the database to find a user with the extracted email
            user = user_data.find_one({"email": payload["email"]})
            
            if user:
                return user  # Return the user if found

    except JWTError:
        # Handle JWT errors, such as invalid token
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )
    
    # Return None if user is not found or if payload is invalid
    return None
