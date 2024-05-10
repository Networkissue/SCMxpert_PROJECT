from fastapi import APIRouter, Request, HTTPException, Form, Depends
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from routes.jwt_token import get_user_by
from database.database import Devicedata

route = APIRouter()
html = Jinja2Templates(directory="Html")
route.mount("/CSS", StaticFiles(directory="CSS"), name="CSS")

@route.get("/devicedata")
def device(request : Request):
    return html.TemplateResponse("devicedata.html", {"request" : request})

@route.get("/devicedata1")
def device(request : Request, device_id:int, token:str = Depends(get_user_by)):
    try :
         #CHECKING THE ROLE
        if token["Role"] != "user" :
            if device_id:
               Data =  list(Devicedata.find({"Device_Id" : device_id},{ "_id" : 0}))
               return JSONResponse(content={"device" : Data}, status_code=200 )
        return JSONResponse(content={"message" : "Required Admin Privileges"}, status_code=401)
    except HTTPException as z :
        return JSONResponse(content={"message": z.detail}, status_code=z.status_code)
    except Exception as X :
        return JSONResponse(content={"message": X }, status_code=500)
