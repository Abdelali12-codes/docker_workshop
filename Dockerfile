FROM node:latest


WORKDIR /node/app

COPY . /node/app/

EXPOSE 8000

RUN npm install

ENTRYPOINT [ "npm", "start" ]

