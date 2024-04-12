# Specify the base image to use for building this Docker image.
FROM python:3.12.2

# Install the python-dotenv & confluent_kafka package using pip.
RUN pip install python-dotenv confluent_kafka 

# Set the working directory within the Docker container.
WORKDIR /SCM/SCM-Project/kafka/producer/

# Copy the current directory (.) from the Docker build context to the working directory in the container.
COPY . /SCM/SCM-Project/kafka/producer/

# Expose port 8005 to allow communication with the container from the host or other containers.
EXPOSE 8005 

# This command executes the 'python server.py' script.
CMD ["python", "producer.py"]
