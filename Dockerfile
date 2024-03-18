# docker build --target dev -t ria_vision:dev .
FROM node:20-alpine as dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]


FROM dev as builder
RUN npm run build

# docker build -t ria_vision:prod . 
FROM nginx:stable-alpine as production-stage
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
