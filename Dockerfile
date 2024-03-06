# Stage Development
FROM node:20-alpine AS dev
WORKDIR /app

COPY package*.json ./

RUN npm install && rm -rf /var/cache/apk/*

COPY . .

EXPOSE 28469

CMD ["npm", "run", "dev"]

# Stage Test
FROM dev AS test
RUN npx playwright install

RUN npm run test