
from confluent_kafka import Consumer
from dotenv import load_dotenv
import os
from pymongo import MongoClient
import json

load_dotenv()

# Developing kafka configuration

kafka_instance = os.getenv("KAFKA_INSTANCE")
Kafka_Groupid = os.getenv("Consumer_Group")
Consumer_kafka = {
    'bootstrap.servers' : kafka_instance,
    'group.id' : Kafka_Groupid,
    'enable.auto.commit': 'false',
    'auto.offset.reset': 'latest'
}

# connecting to MongoDB

Client = MongoClient( os.getenv("MongoDB_string", ""))
db = Client[os.getenv("MongoDB_Databse", "")]
collection = db[os.getenv("MongoDB_Collection", "")]

# kafka consumer

consumer = Consumer(Consumer_kafka) 
topic = "topic"
consumer.subscribe([topic])

try :

    while True :

         #Getting all messages from kafka-broker server in 2s
        message = consumer.poll(2.0)
    
        if message is None :
            print("Waiting for the data...")
        elif message.error():
            error_message = message.error()
            print("Error:", error_message)
        else :
            Data = message.value().decode("utf-8")
            print("Received data:", Data)

             # Insert the JSON-formatted data into MongoDB in dict format.
            collection.insert_one(json.loads(Data))

except Exception as X :
     print(f"Error : {X}")

finally :
    consumer.close()








