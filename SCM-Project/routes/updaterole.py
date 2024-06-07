from fastapi import APIRouter, HTTPException, Depends, Request, Form
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from routes.jwt_token import get_user_by
from database.database import user_data

route = APIRouter()
html = Jinja2Templates(directory="Html")
route.mount("/CSS", StaticFiles(directory="CSS"), name="CSS")

@route.get("/Update_Role")
def update(request : Request):
    return html.TemplateResponse("updaterole.html", {"request" : request})
                                                                                                                                
@route.post("/Update_Role")
def update(request : Request, user: str=Form(None), token:str = Depends(get_user_by)):

           try:
              
                 # Ensure authentication token is present
                if not token:
                     raise HTTPException(status_code=401, detail="Unaothorized")  
                
                  # Check authorization
                if token["Role"] == "user":
                     raise HTTPException(status_code=401, detail="You have no access")
                

                 # Ensure user data is provided and valid  
                if not user :
                     raise HTTPException(status_code=401, detail="Please enter valid user")
                
                 # Query user data from the database 
                result = user_data.find_one({"Username" : user})
                if not result:
                     raise HTTPException(status_code=404, detail="User not found")
                
                 # Check if the user already has the admin role
                if result["Role"] == "admin":
                     raise HTTPException(status_code=401, detail="User is already an admin")

                 # Update user role to admin
                result1 = user_data.update_one({"Username" : user}, {"$set": {"Role" : "admin"}})
                if result1.modified_count > 0:
                     raise HTTPException(status_code=200, detail=" Admin role Updated Successfully ")
                else:
                     raise HTTPException(status_code=400, detail= " Role Update Failed ")
                
           except HTTPException as error:
                  return JSONResponse(content={"message" : error.detail}, status_code=error.status_code)
           except Exception as x:
                  return JSONResponse(content={"message" : x}, status_code=500)
                  
                       