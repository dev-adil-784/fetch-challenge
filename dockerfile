FROM node:18-alpine

WORKDIR /

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 4000

CMD [ "npm", "start"]