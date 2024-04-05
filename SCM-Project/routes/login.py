from fastapi import APIRouter, Request, Form, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from database.database import user_data
from passlib.context import CryptContext
from fastapi.responses import JSONResponse
from routes.jwt_token import create_access_token



route = APIRouter()
html=Jinja2Templates(directory="Html")
route.mount("/CSS", StaticFiles(directory="CSS"), name="CSS")

pwd_hash = CryptContext(schemes=["bcrypt"], deprecated = "auto" )


@route.get("/login")
def login(request : Request):
    return html.TemplateResponse("login.html", {"request" : request})

@route.post("/login")
def login(request: Request, email:str=Form(), password:str=Form()):
    try :
        user = user_data.find_one({"email":email})
        if user:
            if pwd_hash.verify(password, user["password"]):
                token = create_access_token(data={"Username" : user["Username" ], "email" : user["email"], "Role" : user["Role"] })
                response = {"access_token" : token , "Username" : user["Username" ], "email" : user["email"], "Role" : user["Role"]}
                return JSONResponse(content = response, status_code=200)
            else:
                raise HTTPException(status_code=401, detail="Password Incorrect")
        else:
            raise HTTPException(status_code=401, detail="Email Invlaid")
    
    except HTTPException as error_1:
        return JSONResponse(content={"detail" : error_1.detail}, status_code=error_1.status_code)
    except Exception as x:
            return JSONResponse(content={"detail" : x}, status_code=500)


        

    