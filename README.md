# Assisted Prison Visits Scheme (APVS)

[![Build Status](https://travis-ci.org/ministryofjustice/apvs.svg?branch=develop)](https://travis-ci.org/ministryofjustice/apvs?branch=develop)

Prototype implementation of the Assisted Prison Visits Scheme alpha. A bare bones implementation of the system intended to assist with technical spikes.

## Requirements

* docker (with docker-compose)
* Node (including npm)

## Run

Will build two node.js application containers; The first is an external facing site for claimants seeking to apply for APVS. The second is an internal facing site for APVS providers to administer the scheme. Both node applications rely on, and are linked to a mongo database housed in a third container.

```
docker-compose up
```

Note: If any new files have been added to the assets directory make sure to run npm start so that they are copied into the public directory. You can then run docker as normal.

```
npm start
```
