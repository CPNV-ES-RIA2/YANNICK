FROM node:20-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as prod
COPY --from=base /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

FROM mcr.microsoft.com/playwright:v1.42.1-focal as test
WORKDIR /app
COPY --from=base /app /app
COPY tests /app/tests
COPY package*.json ./
RUN npm install

CMD ["npm", "run", "test"]

FROM base as dev
CMD ["npm", "run", "dev"]