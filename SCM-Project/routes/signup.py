from fastapi import APIRouter, HTTPException, Request, Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from database.database import *
from passlib.context import CryptContext
from models.models import Signup

route = APIRouter()
html = Jinja2Templates(directory="Html")
route.mount("/CSS", StaticFiles(directory="CSS"), name="CSS")



pwd_hash = CryptContext(schemes=["bcrypt"], deprecated="auto")

@route.get("/signup")
def signup(request: Request):
    return html.TemplateResponse("signupage.html", {"request" : request})

@route.post("/signup")
def signup(request: Request, Uname:str=Form(), email:str=Form(), password:str=Form(), confirmpaassword:str=Form()):
    existing_user = user_data.find_one({"Username " : Uname})
    existing_email = user_data.find_one({"email" : email})
    try :
        
        if existing_user:
            raise HTTPException(status_code=400, detail="Try another Username , already used")
        if existing_email:
            raise HTTPException(status_code=400, detail="Email already used")
       
        
        #email validations
        if any(char.isupper() for char in email):
           raise HTTPException(status_code=400, detail="Email Should be lower letters")
        if not email[0].isalpha():
            raise HTTPException(status_code=400, detail="Email Should start alphabatical")
        if not "@" in email or email.count("@") != 1:
            raise HTTPException(status_code=400, detail="Email Should start alphabatical")
        
        #password validation
        if not any(char.isupper() for char in password):
            raise HTTPException(status_code=400, detail="Password should contains atleast One Capital letter")
        if len(password) < 7:
            raise HTTPException(status_code=400, detail="Password should contains atleast 7 characters")
        if sum(char.isdigit() for char in password) < 1:
            raise HTTPException(status_code=400, detail="Password should contains atleast One digit")
        if not any(char in "!@#$%^&*()-_+=[]{}|;:,.<>?/~" for char in password):
            raise HTTPException(status_code=400, detail="Password must contain at least one special character")
        if password != confirmpaassword:
            raise HTTPException(status_code=400, detail="Password doesn't match")
    except HTTPException as y:
        return html.TemplateResponse("signupage.html", {"request" : request, "error_message" : y.detail})
    except Exception as x:
        raise HTTPException(status_code=500, detail=f"internal server error: {str(x)}")
        
    pwd=pwd_hash.hash(password)
    Registration =Signup(Username =Uname, email= email, Role="user" ,password=pwd)
    
    user_data.insert_one(dict(Registration))
    return html.TemplateResponse("signupage.html", {"request" : request, "success_message": "User Registered Successfully"})