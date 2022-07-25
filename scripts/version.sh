#!/usr/bin/env bash

function get_package_version() {
    grep -o '"version": "[^"]*' ./package.json | grep -o '[^"]*$'
}

ACTUAL=$(pwd)
GIT_HASH=$(sh $ACTUAL/scripts/get-hash.sh);
VERSION_NAME=$(get_package_version)-$GIT_HASH

# echo | cat ./client/package.json | jq --arg version_name $VERSION_NAME '. + {version_name: $version_name}' >> ./client/versionName.json
echo '{ "version_name": "'$VERSION_NAME '" }' > ./versionName.json
