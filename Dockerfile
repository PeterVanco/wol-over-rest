FROM node:13.6.0-alpine3.10

WORKDIR /server

COPY . /server

RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]