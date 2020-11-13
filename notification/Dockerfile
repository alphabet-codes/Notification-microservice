FROM node:latest

COPY . /src

WORKDIR /src

RUN npm install --production

EXPOSE 5003

CMD npm start