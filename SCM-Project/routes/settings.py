from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

route = APIRouter()
html = Jinja2Templates(directory="Html")
route.mount("/CSS", StaticFiles(directory="CSS"), name="CSS" )


@route.get("/settings")
def setting(request : Request):
    return html.TemplateResponse("settings.html", {"request" : request})