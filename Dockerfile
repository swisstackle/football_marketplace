FROM node:12-alpine
WORKDIR /football_marketplace
COPY . .
RUN apk add nano

