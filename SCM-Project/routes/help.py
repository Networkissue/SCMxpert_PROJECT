from fastapi import APIRouter
from fastapi.requests import Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


# Initialize the APIRouter
route = APIRouter()

# Set up templates and static files (CSS)
html = Jinja2Templates(directory="Html")
route.mount("/CSS", StaticFiles(directory="CSS"), name="CSS")

@route.get("/help")
def help_page(request: Request):
    """
    Renders the help page.

    request (Request): The HTTP request object.

    Returns:
        TemplateResponse: Renders the help page template with the provided request.
    """
    return html.TemplateResponse("help.html", {"request": request})
