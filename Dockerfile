FROM node:20-alpine as dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]