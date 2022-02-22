FROM node:13-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . .
RUN npm install

EXPOSE 3000
CMD node ./bin/www
