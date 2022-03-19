FROM node:12-alpine
WORKDIR /football_marketplace
COPY . .
RUN npm install -g truffle
WORKDIR /football_marketplace/football_marketplace-contracts
RUN truffle migrate --network=ropsten
WORKDIR /football_marketplace
RUN apk add nano
CMD ["npm", "start"]
