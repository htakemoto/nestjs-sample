# NestJS Sample

Sample project based on [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Requirements

- Node.js

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

Open your browser and navigate to http://127.0.0.1:3000

### Sample REST APIs

```bash
# Create an user
curl -X POST -H "Content-Type: application/json" -d '{"username": "htakemoto", "age": 35}' 127.0.0.1:3000/users
# Get all users
curl 127.0.0.1:3000/users
# Get an user
curl 127.0.0.1:3000/users/1
# Update an user
curl -X PUT -H "Content-Type: application/json" -d '{"username": "htakemoto", "age": 18}' 127.0.0.1:3000/users/1
# Remove an user
curl -X DELETE 127.0.0.1:3000/users/1
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

## Project Overview

```
src
+- app.controller.ts
+- app.module.ts
+- main.ts
```

|  File  |  Note  |
| ---- | ---- |
|  app.controller.ts  |  Basic controller sample with a single route.  |
|  app.module.ts  |  The root module of the application.  |
|  main.ts  |  The entry file of the application which uses the core function NestFactory to create a Nest application instance. |

## NestJS Tips

### Prerequisite

Install **Nest CLI**

```bash
npm i -g @nestjs/cli
```

```bash
# create a controller
nest g controller users
# create a service
nest g service users
# create a module
nest g module users
```
