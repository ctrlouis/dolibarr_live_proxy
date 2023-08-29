# Dolibarr Proxy

Simple proxy app to request your Dolibarr Rest Api.

## Requirements

- Enable API REST module in your dolibarr installation.

## Run with Docker

You can easily run dolibarr_proxy with Docker:

Copy .env.example to .env and run the server:
```
docker run \
    -p 1993:1993 \
    --name dolibarr_proxy \
    -d ctrlouis/dolibarr_proxy # start dolibarr_proxy
```
docker run --rm -p 1993:1993 --env-file .env ctrlouis/dolibarr_proxy

## Run in Development

Copy .env.example to .env, fill with your values and run the server:
```
docker-compose up
```

## Build image

```
docker build -t dolibarr_proxy .
```

## Usage

Once dolibarr_proxy is running you can send requests with to the container like you do with your dolibarr rest api :
```
curl -X GET 'localhost:1993/api/index.php/products?sortfield=t.label&sortorder=ASC'
```

## Environment variable summary

| Variable                          | Default value     | Description |
| --------------------------------- | ----------------- | ----------- |
| **PORT**                          | *1993*            | Api listening port
| **DOLIBARR_API_BASE**             | NONE              | Your dolibarr base url
| **DOLIBARR_API_KEY**              | NONE              | Your dolibarr api key
| **DOLIBARR_RESSOURCE_ALLOWED**    | NONE              | Allowed ressources (same as the user api-key authorizations)
| **DOLIBARR_CATEGORIE_REQUIRED**   | false             | Force search products by category (keep products without category hidden)