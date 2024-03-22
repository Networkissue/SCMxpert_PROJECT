from pydantic import BaseModel

#for userdata
class Signup(BaseModel):
    user_FirstName:str
    user_LastName:str
    email:str
    role: str
    password:str

#for shipment data
class Shipment_input(BaseModel):
    Shipment_Number:int
    Route_Details:str
    Device:str
    PO_Number:int
    NDC_Number:int
    Serial_no_Goods:int
    Container_Number:int
    Goods_Type:str
    Expected_Delivery_Date:str
    Delivery_Number:int
    Batch_id:int
    Comment:str

