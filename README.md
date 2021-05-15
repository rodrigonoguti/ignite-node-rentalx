# ignite-node-rentx
Rocketseat Ignite project to get into more advanced NodeJS features.
 
Main technologies and tools:
- NodeJS
- Typescript
- ExpressJS
- Docker
- AWS: EC2, S3, SES
- Jest
- SOLID
- Github actions
- Redis (for API request rate limiter)
- Sentry

To run the project on localhost, follow the steps:
- Clone the repository
- Install dependencies with ```yarn```
- Run Docker with ```docker-compose up```
- Run database migrations with ```yarn typeorm migration:run```
- Run API with ```yarn dev```
- Run tests with ```yarn test```

To access the API documentation:
- ```http://localhost:3333/api-docs```

While in the development period, the project is running on http://18.230.123.231/ (AWS EC2 instance).
