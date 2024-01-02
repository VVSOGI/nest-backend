FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
COPY .env .env

RUN npm run build

EXPOSE 4000

CMD [ "npm", "run", "start"]

