from fastapi import Depends, HTTPException, status
from datetime import datetime, timedelta
from typing import Optional
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, ExpiredSignatureError, JWTError
from database.database import user_data

#define your secret key and algorithm
SECRET_KEY = "Your_secret_credentials"
ALGORITHM = "HS256"

#token expiration in minutes
Access_token_expire_in = 25

# Creating an OAuth2 password-bearer authentication scheme using FastAPI.
# This scheme will be used to authenticate users via the OAuth2 password.
# The tokenUrl parameter specifies the URL where the client can request a token.
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Function to create an access token with a custom payload (data) and optional expiration time (expires_timedelta).
def create_access_token(data: dict, expires_timedelta: Optional[timedelta]= None):
    for_encoding = data.copy()
    if expires_timedelta:
        expire = datetime.utcnow() + expires_timedelta
    else :
        expire = datetime.utcnow() + timedelta(minutes=int(Access_token_expire_in))
    for_encoding.update({"exp":expire})
    print(for_encoding)
    encode_token = jwt.encode(for_encoding, SECRET_KEY, algorithm = ALGORITHM)
    return encode_token


# Function to decode an access token
def decode_access_token(token:str):
    try :
        PAYLOAD = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        
        #checking expiration time
        if PAYLOAD["exp"] <= datetime.utcnow().timestamp() :
           raise ExpiredSignatureError("Token expired")
        return PAYLOAD
    
    #    Authorization header: Bearer tokens are transmitted from the client to the server in the Authorization header of HTTP requests
    except ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, headers={"WWW-Authenticate": "Bearer"}, detail="TOKEN EXPIRED")   
    
    except JWTError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, headers={"WWW-Authenticate" : "Bearer"}, detail="NOT FOUND")
    


# This function is used to retrieve the current user's data based on a JWT token.
def get_user_by(token:str = Depends(oauth2_scheme)):
    try: 
     
        # Decode the JWT token to extract the payload
         PAYLOAD = decode_access_token(token)

         # Check if payload is valid and contains necessary keys
         if PAYLOAD and "email" in PAYLOAD:
             # Query the database to find a user with the extracted email
             user = user_data.find_one({"email" : PAYLOAD["email"]})
            
            # If user data is found, return it
             if user:
                 return user
    except JWTError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="DETAIL NOT FOUND")
    
    return None



        

    

