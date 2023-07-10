# Dolibarr Proxy

Proxy to dolibarr rest api

# Dev

Copy .env.example and complete variables
```
cp .env.example .env
docker-compose stop && docker-compose rm -f && docker-compose up --build
```