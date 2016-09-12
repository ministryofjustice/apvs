# APVS alpha external dropwizard API

A java implementation of an external API using dropwizard.

## Run the API within Docker
The API runs within a docker container, and assumes that the JAR file `external-api-dropwizard-1.0-SNAPSHOT.jar` is located in a `target` folder in this directory.

To generate the necessary jar, run `nvm package` in this directory.

To use this API with docker compose, uncomment the following section in the `docker-compose.yml` file (in the project root folder):

```
# Build the external api java application and expose it on port 3003.
  external-api-apvs:
    build: ./alpha/external-api-dropwizard
    ports:
      - "3002:3002"
```

and comment out the section declaring the node API:

```
# Build the external api node application and expose it on port 3002.
# external-api-apvs:
#   build: ./alpha/external-api-node # This is where you switch to Java API
#   volumes:
#    - "./alpha/external-api-node/app:/usr/src/app/app"
#   ports:
#     - "3002:3002"
```

Then run `docker-compose up` in the project root folder.


## Run the tests
To run the tests, run `mvn test` in this directory.