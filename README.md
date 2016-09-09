# Assisted Prison Visits Scheme (APVS)

[![Build Status](https://travis-ci.org/ministryofjustice/apvs.svg?branch=develop)](https://travis-ci.org/ministryofjustice/apvs?branch=develop)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Prototype implementation of the Assisted Prison Visits Scheme alpha. A bare bones implementation of the system intended to assist with technical spikes.

## Requirements

* docker (with docker-compose)
* Node (including npm)

## Run

Use docker-compose to build and launch the containers for the solution.

There are three node.js application containers
* External facing site for claimants seeking to apply for APVS
* External API for business logic
* Internal facing site for APVS providers to administer the scheme

The node applications are linked to a mongo database container.

```
docker-compose up

# Force a rebuild of the containers if package.json has changed to get new dependencies
#docker-compose up --build
```

When running in development, volumes are mapped from the containers to the host so changes to host files trigger the application to restart ([nodemon](http://nodemon.io/)) and node_modules dependencies are cached so they don't need to be retrieved each time.