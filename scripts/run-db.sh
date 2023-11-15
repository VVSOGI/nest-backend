set -e
source ./.env

SERVER="my_database_server";
PW="mysecretpassword";
DB="my_database";

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run --name $SERVER -e POSTGRES_PASSWORD=$DB_PASSWORD \
  -e POSTGRES_USER=$DB_USERNAME \
  -e PGPASSWORD=$DB_PASSWORD \
  -p $DB_PORT:$DB_PORT \
  -d postgres

# wait for pg to start
echo "sleep wait for pg-server [$SERVER] to start";
SLEEP 1;

# create the db 
echo "CREATE DATABASE $DB_DATABASE ENCODING 'UTF-8';" | docker exec -i $SERVER psql -U $DB_USERNAME
echo "\l" | docker exec -i $SERVER psql -U $DB_USERNAME
