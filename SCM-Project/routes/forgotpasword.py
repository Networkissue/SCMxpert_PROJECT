from fastapi import HTTPException, APIRouter, Request, Form, Depends
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

# Password hashing context
pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Route to display the password update form
@route.get("/Password_Update")
def password_update_form(request: Request):
    """
    Renders the password update form.
    
    
    request (Request): The HTTP request object.
        
    Returns:
        TemplateResponse: Renders the password update page template.
    """
    return html.TemplateResponse("forgotpassword.html", {"request": request})

# Route to handle password update logic
@route.post("/Password_Update")
def update_password(request: Request, email: str = Form(), New_password: str = Form(), confirm_password: str = Form()):
    """
    Handles updating the password for the user.
    
    
    request (Request): The HTTP request object.
    email (str): The email of the user to update the password for.
    New_password (str): The new password to set.
    confirm_password (str): The confirmation of the new password.
        
    Returns:
        JSONResponse: A JSON response with a success or error message.
    """
    try:
        user = user_data.find_one({"email": email})
        
        if not user:
            return JSONResponse(content={"error": "Email invalid"}, status_code=401)
        
        # Check if the new password matches the confirmation password
        if New_password != confirm_password:
            return JSONResponse(content={"error": "Password mismatch"}, status_code=401)
        
        # Hash the new password
        pwd_hash = pwd.hash(New_password)
        
        # Update the password for the given email
        user_data.update_one({"email": email}, {"$set": {"password": pwd_hash}})
        
        return JSONResponse(content={"message": "Password updated successfully"}, status_code=200)
    
    except HTTPException as error:
        return JSONResponse(content={"error": error.detail}, status_code=error.status_code)
    
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

