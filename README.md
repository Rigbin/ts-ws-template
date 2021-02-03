# TypeScript Template

TypeScript WebService/MicroService template for build automation

created for educational purpose. [FH JOANNEUM IMS](https://www.fh-joanneum.at/ims/), by [Harald Schwab](mailto:harald.schwab@edu.fh-joanneum.at).  
**IMS19** *WS20* **Secure Service Oriented Architectures** by [Egon Teiniker](mailto:egon.teiniker@fh-joanneum.at).

## About
Here you can find a base template to create web/micro services with [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/), using [TypeScript](https://www.typescriptlang.org/).

You can run it locally, as long as you have installed Node.js, or using Docker. (`TODO...`).

This project provides a [Dockerfile](Dockerfile) to create a container running the service. This Dockerfile is [multi-staged](https://docs.docker.com/develop/develop-images/multistage-build/), to first build/transpile TypeScript to JavaScript. Find more information in the [Docker](#docker) section.

The template has [logging](src/util/logger/logger.ts), an example [middleware](src/app/middleware/logging/logging.ts) and a basic [routing](src/app/router.ts) included, as well as a basic [configuration](src/config/environment.ts) using [dotenv](https://www.npmjs.com/package/dotenv) and uses [cors](https://www.npmjs.com/package/cors).


### Docker

1. Build docker image
  ```console
  docker build --no-cache -t "ts-service" .
  ```
2. Run docker container
  ```console
  docker container run -it -d -p 8080:8080 --name ts-service ts-service
  ```

Check log-output
```console
docker container logs -f ts-service
```

Stop container
```console
docker container stop ts-service
```

## Prerequisites
When developing locally, you need [Node.js](https://nodejs.org/en/), I recommend the current (02.2021) [LTS 14.x](https://nodejs.org/dist/latest-v14.x/).

A useful tool to manage different versions of Node.js locally would be [NVM](https://github.com/nvm-sh/nvm).

Clone this repository and install node packages using `npm`.
```console
git clone https://git-iit.fh-joanneum.at/ims_exercises/typescript-template.git ts-service
cd ts-service
npm ci --silent
```

Now, you can run the local development server.
```console
npm run start:dev
```

To build the project, run `npm run build` or take a look into the [Docker](#docker) section.

## Useful links

<!-- TODO -->