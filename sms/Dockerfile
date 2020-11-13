FROM node:latest

COPY . /src

WORKDIR /src

RUN npm install --production

EXPOSE 5002

CMD npm start