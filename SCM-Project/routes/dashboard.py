from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates

route = APIRouter()

html = Jinja2Templates(directory="Html")

@route.get("/Dashboard")
def dashboard(request : Request):
    return html.TemplateResponse("dashboard.html", {"request" :  request})


