source scripts/env.sh

echo $SERVER_URL

## register
REGISTER=$(curl -sS -X POST $SERVER_URL/users/register \
-H "Content-Type: application/json" \
-d '{
        "email":"benny@netninja.dev", 
        "password": "123123"
}')

echo $REGISTER

## login
LOGIN=$(curl -sS -X POST $SERVER_URL/auth/login \
-H "Content-Type: application/json" \
-d '{
        "email":"benny@netninja.dev", 
        "password": "123123"
}')

echo $LOGIN
