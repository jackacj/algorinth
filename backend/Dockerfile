# Base Image
FROM python:3.13-slim

# Create a Working Directory
WORKDIR /app

# Install System Dependencies Needed for PostgreSQL
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy the Python Environment
COPY requirements.txt .
# Upgrade Pip and Install Python Environment
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copy the Rest of the Backend
COPY . .

# Add to Path, Expose a Port & Run Backend
ENV PYTHONPATH=/app
EXPOSE 8000
CMD ["fastapi", "run", "api.py", "--host", "0.0.0.0", "--port", "8000"]