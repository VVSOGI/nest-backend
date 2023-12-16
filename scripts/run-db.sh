set -e
source ./.env

docker run \
  --name $DB_CONTAINER_NAME \
  -e POSTGRES_PASSWORD=$DB_PASSWORD \
  -e POSTGRES_USER=$DB_USERNAME \
  -e POSTGRES_DB=$DB_DATABASE \
  -v $DB_VOLUME_NAME:/var/lib/postgresql/data \
  -p $DB_PORT:5432 \
  -d postgres

# wait for pg to start
echo "sleep wait for pg-server [$SERVER] to start";
SLEEP 5;

# create the db 
docker exec -i $DB_CONTAINER_NAME psql -U $DB_USERNAME -d $DB_DATABASE -c '\dt'
