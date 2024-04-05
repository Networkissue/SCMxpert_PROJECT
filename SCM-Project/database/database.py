import pymongo
dburl="mongodb+srv://rohithvaddepally:HCkUBUf80yW3ddao@cluster0.nn6v2ug.mongodb.net/"
connection=pymongo.MongoClient(dburl)

projectdb=connection["SCMXpert_Project"]
shipment_data=projectdb["Shipments"]
user_data=projectdb["Users"]
Devicedata=projectdb["DeviceData"]


