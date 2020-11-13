FROM node:latest

COPY . /src

WORKDIR /src

RUN npm install --production

EXPOSE 5004

CMD npm start