from fastapi import FastAPI, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles



#route details 
from routes.signup import route as signup_route
from routes.login import route as login
from routes.forgotpasword import route as Password_Update
from routes.newshipment import route as Newshipment
from routes.myshipment import route as shipment_table
from routes.updaterole import route as update_role
from routes.homepage import route as homepage
from routes.settings import route as settings
from routes.mainpage import route as aboutpage
from routes.profilepage import route as myprofile
from routes.help import route as helppage



app = FastAPI()
html = Jinja2Templates(directory="Html")
app.mount("/CSS", StaticFiles(directory="CSS"), name="CSS")

app.include_router(signup_route)
app.include_router(login)
app.include_router(Password_Update)
app.include_router(Newshipment)
app.include_router(shipment_table)
app.include_router(update_role)
app.include_router(homepage)
app.include_router(settings)
app.include_router(aboutpage)
app.include_router(myprofile)
app.include_router(helppage)