# Base Image
FROM node:22-alpine AS build

# Create a Work Directory
WORKDIR /app

# Copy Dependencies & Clean Install (Automated)
COPY package*.json ./
RUN npm ci

# Copy the Rest of Frontend
COPY . .

# Inject Backend API URL as Environmental Variable
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build the Frontend
RUN npm run build

# Set up Nginx
FROM nginx:alpine

# Copy Frontend Build & Nginx Configuration
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose Port 80 & Run Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]