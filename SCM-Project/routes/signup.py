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
def signup(request: Request, Fname:str=Form(), Lname:str=Form(), email:str=Form(), password:str=Form(), confirmpaassword:str=Form()):
    existing_user = user_data.find_one({"user_FirstName" : Fname, "user_LastName": Lname})
    existing_email = user_data.find_one({"email" : email})

    try :
        if existing_user:
            raise HTTPException(status_code=400, detail="Try another username, already used")
        if existing_email:
            raise HTTPException(status_code=400, detail="Email already used")
        if password != confirmpaassword:
            raise HTTPException(status_code=400, detail="Password doesn't match")
        if not password[0].isupper():
            raise HTTPException(status_code=400, detail="Password should start with a Capital letter")
        if len(password) < 8:
            raise HTTPException(status_code=400, detail="Password must contain 8 digits")
        if sum(char.isdigit() for char in password) < 2:
            raise HTTPException(status_code=400, detail="Password should contains atleast two digits")
        if not any(char in "!@#$%^&*()-_+=[]{}|;:,.<>?/~" for char in password):
            raise HTTPException(status_code=400, detail="Password must contain at least one special character")
    except HTTPException as he_error:
        return html.TemplateResponse("signupage.html", {"request" : request, "error_message" : he_error.detail})
    except Exception as x:
        raise HTTPException(status_code=500, detail=f"internal server error: {str(x)}")
        
    pwd=pwd_hash.hash(password)
    Reg=Signup(user_FirstName=Fname, user_LastName= Lname, email= email, role="user" ,password=pwd)
    
    user_data.insert_one(dict(Reg))
    return html.TemplateResponse("login.html", {"request" : request, "success_message": "User Registered Successfully"})