from fastapi import APIRouter, HTTPException, Form, Request, Depends
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from jose import JWTError,jwt
from routes.jwt_token import get_user_by, oauth2_scheme
from routes.newshipment import new_data
from database.database import shipment_data


route = APIRouter()
html = Jinja2Templates(directory="Html")
route.mount("/CSS", StaticFiles(directory="CSS"), name="/CSS")

@route.get("/shipment_table")
def shipment(request : Request):
    return html.TemplateResponse("myshipment.html", {"request" : request})

@route.post("/shipment_table")
def shipment(request : Request, token:dict=Depends(get_user_by)):
    # print(token)
    try :
        if token:
         
            if token["Role"] == "admin":
                shipment_list = list(shipment_data.find({},{"_id":0}))
            else : 
                shipment_list = list(shipment_data.find({"email" : token["email"]},{"_id":0}))
            
            if shipment_list:
                return JSONResponse(content=shipment_list, status_code=200)
            else:
                raise HTTPException(status_code=400, detail="Shipment table not found")
           
        else:
            raise HTTPException(status_code=401, detail="Unauthorized")
    
    except HTTPException as error:
        return JSONResponse(content={"message" : error.detail}, status_code=error.status_code)
    except Exception as x :
        return JSONResponse(content={"message" : x}, status_code=500)
        



