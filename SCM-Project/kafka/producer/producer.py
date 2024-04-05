import socket
from confluent_kafka import Producer 
from dotenv import load_dotenv
import os


load_dotenv()

# Load environment variables

Bootstrap_Servers = os.getenv("KAFKA_INSTANCE") 
Server_host = os.getenv("SERVER_HOST")
Server_port = os.getenv("SERVER_PORT")
topic = os.getenv("topic")
# Creating a new socket Server

client_socket  = socket.socket()

# Create a Kafka producer & bootstrap.servers is a broker list of endpoints whether a producer or consumer should be connect to.

producer_kafka = Producer({"bootstrap.servers" : Bootstrap_Servers})

try :
    client_socket.connect((Server_host, int(Server_port) ))
    while True :
        Received_Data = client_socket.recv(1024)
        if not Received_Data:
            break

        Decoded_data = Received_Data.decode('utf-8')
        print(Decoded_data)

        # produce the received data to kafka server
        producer_kafka.produce("topic", value = Decoded_data)
        producer_kafka.flush()

except ConnectionRefusedError :
    print("Unable to Connect to the server, Reconnect....")

except Exception as x:
    print(f"Error : {x}")

finally:
  client_socket.close() 



