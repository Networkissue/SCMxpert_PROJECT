from fastapi import APIRouter, HTTPException, Depends, Request, Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from routes.jwt_token import get_user_by
from database.database import user_data


# Initialize router
route = APIRouter()

# Template directory and static file mounting
html = Jinja2Templates(directory="Html")
route.mount("/CSS", StaticFiles(directory="CSS"), name="CSS")

@route.get("/Update_Role")
def update_page(request: Request):
    """
    Renders the update role page template.
    
    request (Request): The HTTP request object.
    
    Returns:
        TemplateResponse: The rendered HTML page to update user roles.
    """
    return html.TemplateResponse("updaterole.html", {"request": request})

@route.post("/Update_Role")
def update_role(
    request: Request, 
    user: str = Form(None), 
    token: dict = Depends(get_user_by)
):
    """
    Handles role updating for users, allowing only admins to upgrade a user's role to admin.


     request (Request): The HTTP request object.
     user (str): The username to update the role for.
     token (dict): The user's authentication token from the request.

    Returns:
        JSONResponse: Success or failure message based on the role update operation.
    """
    try:
        # Ensure authentication token is present
        if not token:
            raise HTTPException(status_code=401, detail="Unauthorized")

        # Check if the requesting user has admin privileges
        if token["Role"] != "admin":
            raise HTTPException(status_code=403, detail="Access denied: Insufficient permissions")

        # Ensure a username is provided for updating
        if not user:
            raise HTTPException(status_code=400, detail="Please enter a valid username")

        # Query the user from the database
        result = user_data.find_one({"Username": user})
        if not result:
            raise HTTPException(status_code=404, detail="User not found")

        # Check if the user already has the 'admin' role
        if result["Role"] == "admin":
            raise HTTPException(status_code=400, detail="User is already an admin")

        # Update the user's role to 'admin'
        update_result = user_data.update_one({"Username": user}, {"$set": {"Role": "admin"}})
        if update_result.modified_count > 0:
            return JSONResponse(content={"message": "Admin role updated successfully"}, status_code=200)
        else:
            raise HTTPException(status_code=400, detail="Role update failed")

    except HTTPException as http_error:
        # Handle HTTP exceptions with appropriate error messages
        return JSONResponse(content={"message": http_error.detail}, status_code=http_error.status_code)
    
    except Exception as e:
        # Handle unexpected exceptions
        return JSONResponse(content={"message": f"Internal server error: {str(e)}"}, status_code=500)
