from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles



route = APIRouter()

html = Jinja2Templates(directory="Html")
route.mount("/CSS", StaticFiles(directory="CSS"), name="CSS" )

@route.get("/profilepage")
def profile(request : Request):
    return html.TemplateResponse("profilepage.html", {"request" : request})