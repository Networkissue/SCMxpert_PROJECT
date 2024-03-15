from fastapi import HTTPException, APIRouter, Request, Form
from jose import jwt, JWTError
from passlib.context import CryptContext
from models.models import*
from fastapi.staticfiles import StaticFiles
from routes.jwt_token import get_user_by
from fastapi.templating import Jinja2Templates
from database.database import user_data
from fastapi.responses import JSONResponse

# Create an instance of APIRouter to define routes for this specific API section
route = APIRouter()

# Create an instance of Jinja2Templates to handle rendering HTML templates
html = Jinja2Templates(directory="Html")
route.mount("/CSS", StaticFiles(directory="CSS"), name="CSS")

#password hashing 
pwd = CryptContext(schemes=["bcrypt"], deprecated = "auto")

# Route to display the email changing form
@route.get("/Password_Update")
def email(request: Request):
    return html.TemplateResponse("forgotpassword.html", {"request" : request})

@route.post("/password_Update")
def update(request:Request, email:str=Form(), New_password:str=Form(), confirm_password:str=Form() ):
    try :
        updating = user_data.find_one({"email":email})
        if updating :
             # Check if password and confirm_password match?
            if New_password != confirm_password:
                raise HTTPException(status_code=401, detail="password matching error")
            if New_password == confirm_password:
                pwd_hash = pwd.hash(New_password)
                 # Update password for the given email
                user_data.update_one({"email":email}, {"$set" : {"password":pwd_hash}})
                return html.TemplateResponse("login.html", {"request" : request, "message": "Password updated successfully"})
        # Redirect to the emailget page with an error message
        return html.TemplateResponse("forgotpassword.html", {"request" : request, "message": "Invalid email"})
    except HTTPException as error:
        return JSONResponse(content={"message" : error.detail}, status_code=error.status_code)
    except Exception as x:
        # Handle other exceptions with a 500 status code
       return JSONResponse(status_code=500, content={"message": x})
