FROM node:12-alpine
WORKDIR /football_marketplace
COPY . .
RUN apk add nano
WORKDIR /football_marketplce/football_marketplace-app/frontend
RUN npm install
WORKDIR /football_marketplace/football_marketplace-app
RUN npm install
WORKDIR /football_marketplace
