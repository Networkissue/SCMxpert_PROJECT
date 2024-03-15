import pymongo
dburl="mongodb://localhost:27017"
connection=pymongo.MongoClient(dburl)

projectdb=connection["Project"]
shipment_data=projectdb["Shipments"]
user_data=projectdb["Users"]