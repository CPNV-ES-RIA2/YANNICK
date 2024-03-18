FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM mcr.microsoft.com/playwright:v1.42.1-focal as test
WORKDIR /app
COPY --from=builder /app /app
COPY tests /app/tests
COPY package*.json ./
RUN npm install
RUN npm run test

FROM nginx:stable-alpine as production
COPY --from=builder /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
