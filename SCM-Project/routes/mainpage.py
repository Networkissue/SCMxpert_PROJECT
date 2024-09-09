from fastapi import APIRouter, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


# Initialize the APIRouter
route = APIRouter()

# Set up templates and static files (CSS)
html = Jinja2Templates(directory="Html")
route.mount("/CSS", StaticFiles(directory="CSS"), name="CSS")

@route.get("/")
def main_page(request: Request):
    """
    Renders the main page (about page).

    
    request (Request): The HTTP request object.

    Returns:
        TemplateResponse: Renders the main page template with the provided request.
    """
    return html.TemplateResponse("mainpage.html", {"request": request})
