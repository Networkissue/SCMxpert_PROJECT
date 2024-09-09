from fastapi import APIRouter, Request, Form, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from database.database import user_data
from passlib.context import CryptContext
from fastapi.responses import JSONResponse
from routes.jwt_token import create_access_token


# Create a router instance
router = APIRouter()

# Initialize Jinja2Templates to locate HTML templates
templates = Jinja2Templates(directory="Html")

# Mount static files directory for CSS
router.mount("/CSS", StaticFiles(directory="CSS"), name="CSS")

# Initialize password hashing context
pwd_hash = CryptContext(schemes=["bcrypt"], deprecated="auto")

@router.get("/login")
def get_login_page(request: Request):
    """
    Renders the login HTML page.

    request (Request): The HTTP request object.

    Returns:
        TemplateResponse: The rendered HTML template for login.
    """
    return templates.TemplateResponse("login.html", {"request": request})

@router.post("/login")
def perform_login(
    request: Request,
    email: str = Form(...),  # Form fields are required by default
    password: str = Form(...)
):
    """
    Handles user login, verifies credentials, and returns a JWT token.

    request (Request): The HTTP request object.
    email (str): The user's email provided in the form.
    password (str): The user's password provided in the form.

    Returns:
        JSONResponse: Contains the access token and user details if login is successful.
        HTTPException: Raises an error if credentials are incorrect or if there's an issue.
    """
    try:
        # Fetch the user from the database using the provided email
        user = user_data.find_one({"email": email})

        if user:
            # Verify the provided password with the stored hashed password
            if pwd_hash.verify(password, user["password"]):
                # Generate an access token for the user
                token = create_access_token(
                    data={
                        "Username": user["Username"],
                        "email": user["email"],
                        "Role": user["Role"]
                    }
                )
                response = {
                    "access_token": token,
                    "Username": user["Username"],
                    "email": user["email"],
                    "Role": user["Role"]
                }
                return JSONResponse(content=response, status_code=200)
            else:
                raise HTTPException(status_code=401, detail="Incorrect password")
        else:
            raise HTTPException(status_code=401, detail="Invalid email address")

    except HTTPException as error:
        # Return HTTPException details if any
        return JSONResponse(content={"detail": error.detail}, status_code=error.status_code)
    except Exception as e:
        # Return a generic error message for other exceptions
        return JSONResponse(content={"detail": str(e)}, status_code=500)



        

    