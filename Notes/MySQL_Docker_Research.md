# Deploying MySQL DB on Docker

## Start by pulling an image (choose an image first)

ex.  `docker pull ubuntu:latest`

## Create a Dockerfile for installations/commands to run

[docs](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

## Create a docker-compose.yml file

ex.

```
version: '3.1'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
    environment:
      MYSQL_HOST: db
      MYSQL_USER: user
      MYSQL_PASSWORD: password
      MYSQL_DB: mydatabase

  db:
    image: mysql:5.7
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: mydatabase
      MYSQL_USER: user
      MYSQL_PASSWORD: password
    volumes:
      - db-data:/var/lib/mysql

volumes:
  db-data:

```

## Build & Run the container

`docker-compose build`

`docker-compose up`



