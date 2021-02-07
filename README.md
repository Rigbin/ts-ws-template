# TypeScript Template

TypeScript WebService/MicroService template for build automation.

created for educational purpose. [FH JOANNEUM IMS](https://www.fh-joanneum.at/ims/), by [Harald Schwab](https://github.com/Rigbin).  
For **IMS19** *WS20* lecture **Secure Service Oriented Architectures** by [Egon Teiniker](https://github.com/teiniker).

You can find the repository on [GitHub](https://github.com/Rigbin/ts-ws-template).

## About
Here you can find a base template to create web/micro services with [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/), using [TypeScript](https://www.typescriptlang.org/).

You can run it locally, as long as you have installed Node.js, or using Docker (see [docker-dev](#docker-dev) section).

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

You find also a compose-file in the project for a productive service: [docker-compose.prod.yml](docker-compose.prod.yml). To start the production environment, run the following command in the console

```console
docker-compose -f docker-compose.prod.yml up
```

#### Multi-Stage
Because we need to transpile TypeScript to JavaScript before we can run the service (without [`ts-node`](https://github.com/TypeStrong/ts-node)), we use the [multi-stage](https://docs.docker.com/develop/develop-images/multistage-build/) functionality of Docker.

For this project, we need two stages.

```dockerfile
ARG NODE_VERSION=14-stretch
...
```
at the beginning of the Dockerfile, we define an variable `NODE_VERSION` which will be used for the base container.

```dockerfile
...

FROM node:${NODE_VERSION} AS builder

WORKDIR "/usr/src/app"

ENV NODE_OPTIONS="--max-old-space-size=1024"

COPY package*.json  ./
COPY tsconfig*.json ./
COPY .eslintrc.json ./
COPY ./src          ./src
RUN npm ci --silent && npm run build

...
```
In stage one, we use a full `node:` container as base. We add a name to it (`AS builder`), that we need later to reference in stage two.

The `NODE_OPTIONS` is needed to avoid errors while build, because the memory requirements at this stage can be higher than available by default.

We copy the needed files into the container and run `npm ci` to download needed node packages (including `devDependencies`) and run the build.

Stage one is finished at this point. We could find the `dist` directory in this container, which we will copy later into the actual Container.

```Dockerfile
...
FROM node:${NODE_VERSION}-slim

WORKDIR "/app"

ENV NODE_ENV=production
ENV SERVER_PORT=8080

COPY package*.json  ./
RUN npm ci --silent --only=${NODE_ENV}

## copy compiled files from stage 1
COPY --from=builder /usr/src/app/dist ./dist

CMD ["node", "/app/dist/server.js"]
EXPOSE ${SERVER_PORT
```

In stage two, we use the `node:...-slim` container to keep the container as small as possible. We set the `NODE_ENV` environment variable to `production` and the Port, that will be used by the container.

We only copy `package*.json` files, because we only install production `dependencies`.

Now, we copy the `dist/` directory (transpiled JavaScript sources) from the first stage (`builder`) into the actual Container and define the `CMD` to run the service.


### Docker-Dev

When you don't want to install/configure Node.js locally, you can run a full development service inside Docker. Therefore, we provide the [docker-compose](docker-compose.yml) and [Dockerfile.dev](Dockerfile.dev).

All you need is a docker compose environment. See [here](https://docs.docker.com/compose/install/).

1. Start dev server
  ```console
  docker-compose up
  ```
  > **HINT**: Use the option `-d` to run docker-compose detached in the background.

Docker-compose will build and start a new dev-instance, were the local [src](./src) folder will be mapped. So you can develop without a local node environment.

As separate service, a test-instance will run, which will watch the tests inside [test](./test) and run them automatically on any changes, therefore you find a separate compose file [docker-compose.override.yml](docker-compose.override.yml) in the project. Because of the name (`.override`), it will automatically attached when you simple run `docker-compose up`.

When you want to run the development instance without the test-service, you can run:
```console
docker-compose -f docker-compose.yml up
```

#### Downsides
Because only `src/` will be mapped into the container, you need to re-run the service every time you need to make some changes in the [package.json](package.json) (e.g. add additional packages).

> When making some changes you should also run `docker-compose build` before up, to re-build the container image! Or you start the service with `docker-compose up --build`!


## Prerequisites
When developing locally, you need [Node.js](https://nodejs.org/en/), we recommend the current (02.2021) [LTS 14.x](https://nodejs.org/dist/latest-v14.x/).

A useful tool to manage different versions of Node.js locally would be [NVM](https://github.com/nvm-sh/nvm).

Clone this repository and install node packages using `npm`.
```console
git clone https://github.com/Rigbin/ts-ws-template ts-service
cd ts-service
npm ci --silent
```

Now, you can run the local development server.
```console
npm run start:dev
```

To build the project, run `npm run build` or take a look into the [Docker](#docker) section.

## Testing

We're using [Jest](https://jestjs.io/) for testing, you can find some example tests inside of [test](./test). With the help of [supertest](https://www.npmjs.com/package/supertest) we also can do some [End2End-Testing](./test/e2e) without the need of a separate running node-server.

Run tests locally
```console
npm test
```

Run tests in watching mode
```console
npm run test:watch
```

Run tests with coverage (you can find the coverage report in [test/coverage](./test/coverage)).
```console
npm run test:coverage
```

When you use [docker-compose](#docker-dev) you will also have a separate service running the tests in watch mode.

## Useful links
* [root-less Docker](https://docs.docker.com/engine/security/rootless/)
* [Docker Compose](https://docs.docker.com/compose/)
* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Jest](https://jestjs.io/)
