from fastapi import APIRouter, HTTPException, Request
from routes.jwt_token import  Depends, get_user_by, datetime
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from models.models import Shipment_input
from database.database import shipment_data
from fastapi.templating import Jinja2Templates 


# Create a router instance
router = APIRouter()
templates = Jinja2Templates(directory="templates")  # Directory where HTML templates are stored

@router.get("/Newshipment")
def shipment(request: Request):
    """
    Renders the new shipment form.

    request (Request): The HTTP request object.

    Returns:
        TemplateResponse: The rendered HTML template.
    """
    return templates.TemplateResponse("newshipment.html", {"request": request})

@router.post("/Newshipment")
def new_data(
    request: Request,
    shipment: Shipment_input,
    current_user: str = Depends(get_user_by)
):
    """
    Processes the shipment form submission.

    request (Request): The HTTP request object.
    shipment (Shipment_input): The shipment data from the form.
    current_user (str): The currently authenticated user.

    Returns:
        JSONResponse: Response with success or error message.
    """
    try:
        # Validate shipment number length
        if len(str(shipment.Shipment_Number)) != 7:
            raise HTTPException(status_code=400, detail="Shipment_Number must be 7 characters long")
        
        # Check if all fields are filled
        if any(value == "" for value in shipment.dict().values()):
            raise HTTPException(status_code=400, detail="Please fill all values")
        
        # Check if shipment number already exists
        existing_data = shipment_data.find_one({"Shipment_Number": shipment.Shipment_Number})
        if existing_data:
            raise HTTPException(status_code=400, detail="Shipment_Number already used")
        
        # Validate expected delivery date
        expected_delivery_date_str = shipment.Expected_Delivery_Date
        if not expected_delivery_date_str:
            raise HTTPException(status_code=400, detail="Expected delivery date is required")
        
        # Ensure date is in correct format (optional, if needed)
        try:
            expected_delivery_date = datetime.strptime(expected_delivery_date_str, "%Y-%m-%d")
        except ValueError:
            raise HTTPException(status_code=400, detail="Expected delivery date format should be YYYY-MM-DD")

        # Prepare shipment data for insertion
        shipment_data_dict = {
            "Username": current_user["Username"],
            "Shipment_Number": shipment.Shipment_Number,
            "Route_Details": shipment.Route_Details,
            "Device": shipment.Device,
            "PO_Number": shipment.PO_Number,
            "NDC_Number": shipment.NDC_Number,
            "Serial_no_Goods": shipment.Container_Number,
            "Container_Number": shipment.Container_Number,
            "Goods_Type": shipment.Goods_Type,
            "Expected_Delivery_Date": shipment.Expected_Delivery_Date,
            "Delivery_Number": shipment.Delivery_Number,
            "Batch_id": shipment.Batch_id,
            "Comment": shipment.Comment
        }

        # Insert shipment data into database
        shipment_data.insert_one(shipment_data_dict)

        return JSONResponse(content={"message": "Shipment Created Successfully"}, status_code=200)
    
    except HTTPException as error:
        return JSONResponse(content={"message": error.detail}, status_code=error.status_code)
    except Exception as e:
        return JSONResponse(content={"message": str(e)}, status_code=500)
       