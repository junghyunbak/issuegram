#!/bin/bash

SCRIPT_DIR=$(dirname "$(readlink -f "$0")")

IMAGE_NAME=issuegram

docker rm --force ${IMAGE_NAME}

docker build --no-cache --file "$SCRIPT_DIR/Dockerfile" --tag ${IMAGE_NAME} "$SCRIPT_DIR/.."

docker run --detach --publish 3005:3000 --name ${IMAGE_NAME} ${IMAGE_NAME}

docker system prune -af
