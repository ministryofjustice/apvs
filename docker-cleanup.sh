#!/usr/bin/env bash

DOCKER_PROCESSES=$(docker ps -a -q)
DOCKER_IMAGES=$(docker images -q)
NODE_CACHED_DEPENDENCIES=./alpha/docker

# Stop and delete all containers and their associated volumes.
if [ -n "$DOCKER_PROCESSES" ]; then
    printf "Docker Processes: \n%s\n\n" "$DOCKER_PROCESSES"

    docker stop $DOCKER_PROCESSES
    printf "Stopped all running Docker containers.\n"

    docker rm --volumes $DOCKER_PROCESSES
    printf "Deleted all Docker containers and their associated volumes.\n"
else
    printf "There were no Docker containers to delete.\n"
fi

# Delete all Docker images.
if [ -n "$DOCKER_IMAGES" ]; then
    printf "Docker Images: \n%s\n\n" "$DOCKER_IMAGES"

    docker rmi $DOCKER_IMAGES
    printf "Deleted all Docker images.\n"
else
    printf "There were no Docker images to delete.\n"
fi

# Deletes the cached dependencies for the node applications.
if [ -d "$NODE_CACHED_DEPENDENCIES" ]; then
    rm -rf $NODE_CACHED_DEPENDENCIES
    printf "Deleted all Node applications cached dependencies.\n"
else
    printf "There were no cached Node dependencies to delete.\n"
fi