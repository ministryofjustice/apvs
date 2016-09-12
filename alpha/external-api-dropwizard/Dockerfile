FROM openjdk:8-jdk

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD . /usr/src/app

EXPOSE 3002
CMD ["java", "-jar", "-Done-jar.silent=true", "target/external-api-dropwizard-1.0-SNAPSHOT.jar", "server", "external-api-dropwizard.yml"]