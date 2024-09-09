from fastapi import APIRouter, HTTPException, Request, Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from database.database import *
from passlib.context import CryptContext
from models.models import Signup


# Initialize router
router = APIRouter()

# Template directory and static file mounting
html = Jinja2Templates(directory="Html")
router.mount("/CSS", StaticFiles(directory="CSS"), name="CSS")

# Initialize password hashing context
pwd_hash = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.get("/signup")
def signup_page(request: Request):
    """
    Renders the signup page template.
    
    request (Request): The HTTP request object.
    
    Returns:
        TemplateResponse: The rendered signup HTML page.
    """
    return html.TemplateResponse("signupage.html", {"request": request})

@router.post("/signup")
def perform_signup(
    request: Request,
    Uname: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    confirmpassword: str = Form(...)
):
    """
    Handles the signup process, including user validation and password requirements.

    
    request (Request): The HTTP request object.
    Uname (str): The username input.
    email (str): The email input.
    password (str): The password input.
    confirmpassword (str): Confirmation of the password.

    Returns:
        TemplateResponse: Success or failure message rendered on the signup page.
    """
    try:
        # Check if the username or email already exists
        existing_user = user_data.find_one({"Username": Uname})
        existing_email = user_data.find_one({"email": email})

        if existing_user:
            raise HTTPException(status_code=400, detail="Username already in use, please try another.")
        if existing_email:
            raise HTTPException(status_code=400, detail="Email already registered.")

        # Validate password requirements
        if len(password) < 7:
            raise HTTPException(status_code=400, detail="Password must contain at least 7 characters.")
        if not any(char.isupper() for char in password):
            raise HTTPException(status_code=400, detail="Password must contain at least one uppercase letter.")
        if not any(char.isdigit() for char in password):
            raise HTTPException(status_code=400, detail="Password must contain at least one digit.")
        if not any(char in "!@#$%^&*()-_+=[]{}|;:,.<>?/~" for char in password):
            raise HTTPException(status_code=400, detail="Password must contain at least one special character.")
        if password != confirmpassword:
            raise HTTPException(status_code=400, detail="Passwords do not match.")

        # Hash the password
        hashed_password = pwd_hash.hash(password)

        # Create user object and insert into the database
        new_user = Signup(Username=Uname, email=email, Role="user", password=hashed_password)
        user_data.insert_one(dict(new_user))

        # Return success message
        return html.TemplateResponse("signupage.html", {"request": request, "success_message": "User Registered Successfully"})

    except HTTPException as http_error:
        # Return error message in case of validation failure
        return html.TemplateResponse("signupage.html", {"request": request, "error_message": http_error.detail})
    
    except Exception as e:
        # Handle any other unexpected errors
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
