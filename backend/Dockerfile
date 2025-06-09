FROM node:22.15-slim AS base

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/data

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]