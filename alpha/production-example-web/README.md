# Production example web

This is an example node application which includes the [GOV.UK front-end toolkit](https://github.com/alphagov/govuk_frontend_toolkit) but has been modified to be production ready. It is intended as an example and template for beta node applications.

## Run

### Run local

```
npm install # install dependencies
./build.sh  # build static resources from dependencies
npm start   # http://localhost:3100
```

### Run development container

```
# Compile static resources and container image
./build.sh
docker build -f Dockerfile-dev -t production-example-node:dev .

# Run with nodemon and host volumes for app folder mapped to container to reload on changes and cached node_modules
docker run --rm -p 3100:3100 -v $(pwd)/app:/usr/src/app/app -v $(pwd)/cache_node_modules:/usr/src/app/node_modules --name production-example-node-dev production-example-node:dev
```

### Run production container

```
# Compile static resources and container image
./build.sh
docker build -t production-example-node:prod .

# Run with PM2 process manager to run clustered process per CPU and restart on any failures
docker run --rm -p 3100:3100 --name production-example-node-prod production-example-node:prod
```

## Features

* structured for containers - move all but package.json and node_modules into app folder, so when running container for development you can run using nodemon with volumes mapped to local folders and reload on changes with application files separated from dependencies. `npm install` can still be run by attaching to containers and executing manually
* GDS styles - added npm modules for GOV.UK styles, build script and documented in ODP
* security headers - added [helmet](https://www.npmjs.com/package/helmet)
* gzip - added [compression](https://www.npmjs.com/package/compression)
* logger - added basic bunyan logger
* NODE_ENV set to `production`
* Process Manager - using [PM2](http://pm2.keymetrics.io/) to run application clustered per CPU available to container and to automatically restart all node apps

## Notes

* Should explicitly set npm dependency versions in package.json (e.g. `"express": "4.13.4"` not `"express": "~4.13.4"`) so when building production container they are not changed on build
* PM2 can be used to run multiple node applications together on a single server, i.e. Service and Worker applications
* Using:
  * Express
    * nunjunks templates
  * Bunyan logging
  * Shell script to build
  * PM2 process manager
  * Docker
  * [helmet](https://www.npmjs.com/package/helmet) for security headers

## Installing GDS styles

This is important for consistency between services and to keep styles maintable inline with GDS updates.

* Added govuk_frontend_toolkit, govuk_template_jinja (using nunjucks templates) and govuk_elements

## Links

* [Express production best practise](https://expressjs.com/en/advanced/best-practice-performance.html)
* [GOV.UK front-end toolkit](https://github.com/alphagov/govuk_frontend_toolkit)
* [PM2](http://pm2.keymetrics.io/)
* [Blog on using PM2 with Docker/Node](https://medium.com/@adriendesbiaux/node-js-pm2-docker-docker-compose-devops-907dedd2b69a#.hfhhc5slc)