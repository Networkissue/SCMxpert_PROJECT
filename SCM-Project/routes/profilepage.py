from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles


# Initialize the APIRouter
route = APIRouter()

# Setup for HTML templates and static files (CSS)
html = Jinja2Templates(directory="Html")
route.mount("/CSS", StaticFiles(directory="CSS"), name="CSS")

@route.get("/profilepage")
def profile_page(request: Request):
    """
    Renders the profile page.

    request (Request): The HTTP request object.

    Returns:
        TemplateResponse: Renders the profile page template with the provided request.
    """
    return html.TemplateResponse("profilepage.html", {"request": request})
