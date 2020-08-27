# NestJS Sample

Sample project based on [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Requirements

- Node.js
- PostgreSQL

## Local Environment Setup

1. Prepare your PostgreSQL on your local machine sach as using Docker

    ```bash
    docker run --name postgres \
        --rm \
        -d \
        -p 5432:5432 \
        -e POSTGRES_PASSWORD=postgres \
        postgres:11.7
    ```

    - `-d` option will run container in background<br>
    - `--rm` option will automatically delete container once stopped

    ```bash
    # stop container
    # (schema and table data will be removed by --rm option above)
    docker container stop postgres
    ```

3. Create `.env` file in project root by providing the following configs:

    ```bash
    ENVIRONMENT=local
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DATABASE=postgres
    DB_USERNAME=postgres
    DB_PASSWORD=postgres
    ```

4. Install Node.js dependencies

    ```bash
    npm install
    ```

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

Open your browser and navigate to http://127.0.0.1:3000

### Sample REST APIs

```bash
# Create an user
curl -X POST -H "Content-Type: application/json" -d '{"firstName": "Steve", "lastName": "Jobs", "isActive": true}' 127.0.0.1:3000/users
# Get all users
curl 127.0.0.1:3000/users
# Get an user
curl 127.0.0.1:3000/users/1
# Update an user
curl -X PUT -H "Content-Type: application/json" -d '{"firstName": "Steve", "lastName": "Jobs", "isActive": false}' 127.0.0.1:3000/users/1
# Remove an user
curl -X DELETE 127.0.0.1:3000/users/1
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
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
