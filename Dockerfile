FROM node:16-alpine

RUN mkdir -p /var/www/code && mkdir -p /storage/exec/js && mkdir -p /storage/exec/py

WORKDIR /usr/src/app
COPY package*.json ./
COPY . .

RUN npm install

CMD npm run build && npm run start:prod
