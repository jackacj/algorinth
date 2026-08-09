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

# Serve Compiled React Application
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]