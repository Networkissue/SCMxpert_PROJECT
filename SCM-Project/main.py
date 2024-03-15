from fastapi import FastAPI, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles



#route details 
from routes.signup import route as signup_route
from routes.login import route as login
from routes.forgotpasword import route as Password_Update
from routes.dashboard import route as Dashboard
from routes.newshipment import route as Newshipment
from routes.myshipment import route as shipment_table
from routes.updaterole import route as update_role
from routes.homepage import route as homepage
from routes.settings import route as settings
app = FastAPI()
html = Jinja2Templates(directory="Html")
app.mount("/CSS", StaticFiles(directory="CSS"), name="CSS")

app.include_router(signup_route)
app.include_router(login)
app.include_router(Password_Update)
app.include_router(Dashboard)
app.include_router(Newshipment)
app.include_router(shipment_table)
app.include_router(update_role)
app.include_router(homepage)
app.include_router(settings)