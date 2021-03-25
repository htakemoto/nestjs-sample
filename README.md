# NestJS Sample

Sample project based on [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Local Environment Setup

### Requirements

- Docker

### Run App

1. Create `.env` file in project root by providing the following configs:

    ```bash
    ENVIRONMENT=local
    DB_HOST=db
    DB_PORT=5432
    DB_DATABASE=localdb
    DB_SCHEMA=sample
    DB_USERNAME=postgres
    DB_PASSWORD=postgres
    ```

2. Run app

    ```bash
    make start
    ```

    Open your browser and navigate to http://127.0.0.1:3000

    Note: database will be initialized based on `db/init.sql`

    **Sample REST APIs**

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

3. Check DB

    1. access http://127.0.0.1:8080 and login with the following:

        - System: PostgreSQL
        - Server: db
        - Username: postgres
        - Password: postgres
        - Database: localdb

    2. select `sample` in schema

### Other Makefile Options

    ```bash
    # start with a fresh & clean docker container env
    make init
    # rebuild app container based on Dockerfile
    make start-build
    # stop all running containers
    make stop
    # stop and destroy container including network and volume data
    make clean
    ```

## Test

```bash
# unit tests
make test

# test coverage
make test-cov

# format codes
make format
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

### NestJS Commands

```bash
# create a controller
nest g controller users
# create a service
nest g service users
# create a module
nest g module users
```
