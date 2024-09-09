from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

# Initialize the APIRouter
route = APIRouter()

# Set up templates and static files (CSS)
html = Jinja2Templates(directory="Html")
route.mount("/CSS", StaticFiles(directory="CSS"), name="CSS")

@route.get("/home")
def dashboard(request: Request):
    """
    Renders the home page (dashboard).

    request (Request): The HTTP request object.

    Returns:
        TemplateResponse: Renders the homepage template with the provided request.
    """
    return html.TemplateResponse("homepage.html", {"request": request})



