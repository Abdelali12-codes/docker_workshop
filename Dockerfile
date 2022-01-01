FROM node:latest


WORKDIR /node/app

COPY . /node/app/

ENV NAME=abdelali

ENV CITY=casablanca

EXPOSE 8000

RUN npm install

ENTRYPOINT [ "npm", "start" ]

