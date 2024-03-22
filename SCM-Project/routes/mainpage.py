from fastapi import APIRouter, Request, Form
from jose import JWTError, jwt
from routes.jwt_token import get_user_by
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


route = APIRouter()
html = Jinja2Templates(directory="Html")
route.mount("/CSS", StaticFiles(directory="CSS"), name="CSS")

@route.get("/")
def about(request : Request):
    return html.TemplateResponse("mainpage.html", {"request" : request})