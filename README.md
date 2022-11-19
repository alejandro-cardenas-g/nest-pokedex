<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clone the repository
2. Install dependencies

```
yarn install
```

3. Install nest cli

```
npm i -g @nestjs/cli
```

4. set up the database on docker

```
docker-compose up -d
```

5. Set the enviromental variables expose on **.env.example** into a **.env** file

6. run the server

```
yarn start:dev
```

7. Fill the data on the database with pokemon

```
GET to http://localhost:3000/api/v2/seed
```

## Stack

- MongoDB
- Nestjs

# Production building

1. Create file **.env.prod** with the variables on **.env.example**

2. Generate the image with the build command

```
docker-compose -f focker-compose.prod.yaml --env-file .env.prod up --build
```

# Notes

To run the docker-compose production env on background cancel the current process and run

```
docker-compose -f focker-compose.prod.yaml --env-file .env.prod up -d
```
