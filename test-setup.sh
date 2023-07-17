#!/bin/bash

TESTS_FOLDER="tests"
TESTS_DIST_FOLDER="${TESTS_FOLDER}/dist/${TESTS_FOLDER}"
CONFIG_FILE="${TESTS_DIST_FOLDER}/db-config"
MIGRATIONS_FOLDER="${TESTS_FOLDER}/migrations"
MIGRATION_NAME="init"

getEnvValue(){
  value=$(cut -d "=" -f2- <<< $(grep -i "$1" .env.test))
  echo "$value"
}

echo "Creating docker image"
DOCKER_IMAGE="test_postgres"
docker build -t ${DOCKER_IMAGE} .

echo "Running docker image"
docker run -d --name test_postgres_container \
  -e POSTGRES_DB="$(getEnvValue "DATABASE_NAME")" \
  -e POSTGRES_USER="$(getEnvValue "DATABASE_USER")" \
  -e POSTGRES_PASSWORD="$(getEnvValue "DATABASE_PASSWORD")" \
  -p "$(getEnvValue "DATABASE_PORT")":5432 "${DOCKER_IMAGE}"

rm -rf ${TESTS_FOLDER}/dist ${MIGRATIONS_FOLDER}

echo "Compiling tests"
cd ${TESTS_FOLDER} && tsc && cd ..

echo "Generating migrations"
output=$(typeorm -d ${CONFIG_FILE}.js migration:generate ${MIGRATIONS_FOLDER}/${MIGRATION_NAME})

if [[ "${output}" == *"generated successfully"* ]];
then
  echo "Compile migrations to .js file"
  tsc ${MIGRATIONS_FOLDER}/*.ts

  echo "Running migrations"
  typeorm -d ${CONFIG_FILE}.js migration:run
else
  echo  "No migrations... skipping running migrations"
fi

echo "Running fixtures"
node ${TESTS_DIST_FOLDER}/initialize.js

echo "Cleanup..."
rm -rf ${TESTS_FOLDER}/dist ${MIGRATIONS_FOLDER}

