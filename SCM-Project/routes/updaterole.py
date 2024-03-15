from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from routes.jwt_token import get_user_by
from models.models import *
from database.database import user_data

route = APIRouter()
html = Jinja2Templates(directory="Html")
route.mount("/CSS", StaticFiles(directory="CSS"), name="CSS")

@route.get("/Update_Role")
def update(request : Request):
    return html.TemplateResponse("updaterole.html", {"request" : request})
                                                                                                                                
@route.post("/Update_Role")
def update(request : Request, user: dict, token:str = Depends(get_user_by)):
           try:
                 # Ensure authentication token is present
                if not token:
                       raise HTTPException(status_code=401, detail="Unaothorized")  

                 # Ensure user data is provided and valid  
                if not user or not user.get("user_FirstName"):
                       raise HTTPException(status_code=401, detail="Please enter valid user")
                
                 # Query user data from the database 
                result = user_data.find({"user_FirstName" : user["user_FirstName"]})
                if not result:
                       raise HTTPException(status_code=404, detail="User not found")
                
                 # Check authorization
                if token["role"] == "user":
                       raise HTTPException(status_code=404, detail="You have no access")
                
                 # Check if the user already has the admin role
                if result["role"] == "admin":
                       raise HTTPException(status_code=401, detail="User is already a admin")

                 # Update user role to admin
                result1 = user_data.update_one({"user_FirstName" : user["user_FirstName"]}, {"$set": {"role" : "admin"}})
                if result1.modified_count > 0:
                       raise HTTPException(status_code=200, detail=" Admin role Updated Successfully ")
                else:
                       raise HTTPException(status_code=400, detail= " Role Update Failed ")
                
           except HTTPException as error:
                  return JSONResponse(content={"message" : error.detail}, status_code=error.status_code)
           except Exception as x:
                  return JSONResponse(content={"message" : x}, status_code=500)
                  
                       