# Assisted Prison Visits Scheme (APVS)

[![Build Status](https://travis-ci.org/ministryofjustice/apvs.svg?branch=develop)](https://travis-ci.org/ministryofjustice/apvs?branch=develop)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Prototype implementation of the Assisted Prison Visits Scheme alpha. A bare bones implementation of the system intended to assist with technical spikes.

## Requirements

* docker (with docker-compose)
* Node (including npm)

## Run

Will build two node.js application containers; The first is an external facing site for claimants seeking to apply for APVS. The second is an internal facing site for APVS providers to administer the scheme. Both node applications rely on, and are linked to a mongo database housed in a third container.

Build the application:
```
docker-compose build
```

Run the application:
```
docker-compose up
```

# Configuration
Optional configuration for the prototype.

## ELK Stack
The prototype has been configured to stream log messages from the Bunyan logger to an instance of the ELK stack running in a Docker container. By default this is disabled. To enable this functionality uncomment the ELK configuration in the docker-compose.yml file and set the following environment variables:

- LOGSTASH_HOST :: The name of the host running Logstash. If using the 'sebp/elk' image set this to 'elk'.
- LOGSTASH_PORT :: A Logstash TCP port that the Bunyan logger should send log messages to. If using the 'sebp/elk' image set this to '9998'.