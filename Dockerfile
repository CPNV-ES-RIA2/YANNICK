# docker build --target dev -t ria_vision:dev .
FROM node:20-alpine as dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

# docker build --target test -t ria_vision_frontend:test .
FROM mcr.microsoft.com/playwright:v1.42.1-focal as test
# Set working directory
WORKDIR /app

# Copy test code
COPY tests /app/tests
COPY package.json /app/
# Install dependencies
RUN npm cache clean --force
RUN npm install -g playwright
RUN npm install
RUN apt-get update && apt-get install -y wget gnupg ca-certificates && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt install -y nodejs

# Run tests
CMD ["npm", "run", "test"]