# Auth (JWT) + Guards
This project was generated using NestJS CLI version 11.0.10

## Description
A NestJS application demonstrating authentication using JWT, Guards, DTO validation, and error handling, backed by a PostgreSQL database running via Docker Compose.

This project includes:
- User Register / Login
- Secure password hashing
- JWT authentication
- Auth Guards to protect routes
- Input validation with DTOs
- Exception handling
- Unit test
- Database integration with PostgreSQL
- Ready-to-run containerized setup


### Development server
To start a local development server, run:
``` bash
$ npm install
$ npm run start:dev
```
API available at: http://localhost:3000

### Running unit tests
To execute unit tests with the Jest test runner, use the following command:
``` bash
$ npm run test

```

### Optional: Docker
This project includes two Docker Compose configurations:
- Development environment
- Production environment

1- Development (docker-compose.dev.yml)

```
# Used for local development with hot reload.
$ docker-compose -f docker-compose.dev.yml up -d

# Stop containers.
$ docker-compose -f docker-compose.dev.yml down

# Logs.
$ docker-compose -f docker-compose.dev.yml logs -f app
```


2- Production (docker-compose.prod.yml)

```
# Used for production-ready builds.
$ docker-compose -f docker-compose.prod.yml up -d --build

# Stop containers.
$ docker-compose -f docker-compose.prod.yml down

```



### Available endpoints
Auth endpoints : 

```
# Register
POST /auth/signup

# Body Example :
{
  "email": "user@example.com",
  "password": "Password123"
  "firstname" : "user"
  "lastname" : "user"
}
```

```
# Login
POST /auth/signin

# Body Example :
{
  "email": "user@example.com",
  "password": "Password123"
}

```


### Additional Resources
For more information on using the NestJs, including detailed command references, visit the https://docs.nestjs.com page.

The project can also be run using Docker, for more details, see the https://docs.docker.com page.

