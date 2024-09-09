from fastapi import APIRouter, HTTPException, Request, Depends
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from routes.jwt_token import get_user_by
from database.database import shipment_data


# Create a router instance
router = APIRouter()

# Initialize Jinja2Templates to locate HTML templates
templates = Jinja2Templates(directory="Html")

# Mount static files directory for CSS
router.mount("/CSS", StaticFiles(directory="CSS"), name="CSS")

@router.get("/shipment_table")
def get_shipment_table(request: Request):
    """
    Renders the shipment table HTML page.

    request (Request): The HTTP request object.

    Returns:
        TemplateResponse: The rendered HTML template for shipment table.
    """
    return templates.TemplateResponse("myshipment.html", {"request": request})

@router.post("/shipment_table")
def fetch_shipment_data(
    request: Request,
    token: dict = Depends(get_user_by)
):
    """
    Fetches shipment data based on user role and token.

    request (Request): The HTTP request object.
    token (dict): The JWT token decoded payload.

    Returns:
        JSONResponse: Shipment data if available, otherwise an error message.
    """
    try:
        if token:
            if token["Role"] == "admin":
                # Fetch all shipments for admin
                shipment_list = list(shipment_data.find({}, {"_id": 0}))
            else:
                # Fetch shipments for the specific user
                shipment_list = list(shipment_data.find({"Username": token["Username"]}, {"_id": 0}))

            if shipment_list:
                return JSONResponse(content=shipment_list, status_code=200)
            else:
                raise HTTPException(status_code=404, detail="No shipments found")

        else:
            raise HTTPException(status_code=401, detail="Invalid or expired token")

    except HTTPException as error:
        return JSONResponse(content={"message": error.detail}, status_code=error.status_code)
    except Exception as e:
        return JSONResponse(content={"message": str(e)}, status_code=500)
        



