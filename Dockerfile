FROM node:14-alpine

WORKDIR /node-app

COPY package.json .

COPY migrate-mongo-config.js .

COPY migrations /migrations

RUN npm install --quiet

RUN npm install nodemon -g --quiet

RUN npm install migrate-mongo -g --quiet

COPY . . 

EXPOSE 9000

CMD npm run dev