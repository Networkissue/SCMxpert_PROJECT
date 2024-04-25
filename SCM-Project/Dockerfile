FROM python:3.12.2

WORKDIR /SCM/SCM-Project

# Copy the requirements.txt file into the container
COPY requirement.txt /SCM/SCM-Project

# Install project dependencies
RUN pip install --no-cache-dir -r requirement.txt python-dotenv

COPY . .

EXPOSE 8001

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]

