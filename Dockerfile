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
ENV PATH /app/node_modules/.bin:$PATH
COPY --from=base /app /app
COPY tests /app/tests
COPY package*.json ./
# Get the needed libraries to run Playwright
RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev
# Install the dependencies in Node environment
RUN npm install


FROM base as dev
CMD ["npm", "run", "dev"]