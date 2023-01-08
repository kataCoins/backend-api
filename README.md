# Backend APi : KataCoins

## Description

Backend API for KataCoins app.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Docker (WIP)
```bash
docker build . -t kata-coin-api

docker run -d -p8080:8080 --name kata-coin-backend kata-coin-api
```
