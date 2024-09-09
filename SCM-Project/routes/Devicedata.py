from fastapi import APIRouter, Request, HTTPException, Form, Depends
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from routes.jwt_token import get_user_by
from database.database import Devicedata


# Create an instance of APIRouter to define routes for this specific API section
route = APIRouter()

# Create an instance of Jinja2Templates to handle rendering HTML templates
html = Jinja2Templates(directory="Html")
route.mount("/CSS", StaticFiles(directory="CSS"), name="CSS")

# Route to display the device data page
@route.get("/devicedata")
def device(request: Request):
    """
    Renders the device data form page.
    
    request (Request): The HTTP request object.
    
    Returns:
        TemplateResponse: The device data page template.
    """
    return html.TemplateResponse("devicedata.html", {"request": request})

# Route to retrieve device data based on device ID, requires admin privileges
@route.get("/devicedata1")
def device_data(request: Request, device_id: int, token: dict = Depends(get_user_by)):
    """
    Retrieves device data based on device ID, accessible only by users with admin privileges.
    
    
    request (Request): The HTTP request object.
    device_id (int): The ID of the device to retrieve data for.
    token (dict): The authentication token, which contains user role information.

    Returns:
        JSONResponse: Device data or an error message.
    """
    try:
        # Check if the user has admin privileges
        if token["Role"] != "admin":
            return JSONResponse(content={"message": "Required Admin Privileges"}, status_code=401)

        # Retrieve data for the given device ID
        if device_id:
            data = list(Devicedata.find({"Device_Id": device_id}, {"_id": 0}))
            
            # Check if any data is found
            if data:
                return JSONResponse(content={"device": data}, status_code=200)
            else:
                return JSONResponse(content={"message": "Device not found"}, status_code=404)

    except HTTPException as z:
        return JSONResponse(content={"message": z.detail}, status_code=z.status_code)

    except Exception as X:
        return JSONResponse(content={"message": str(X)}, status_code=500)

