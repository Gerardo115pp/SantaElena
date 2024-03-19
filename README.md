# Santa Elena - Funerary home
*A website for santa elena home, work in progress as of jan 25 2024...*


## Build Services

Build **Txy** with docker by running:

```bash
cd ./services/Txy
docker buildx build -t defalt115/libery-txy-cms:1.0a . --load --build-context=schemas=./operation_data/schemas --build-context=content=./operation_data/content/ 
```

Build the **payments service** with docker by running:

```bash
cd ./services/Payments
docker buildx build -t defalt115/libery-payments-service:1.0a . --load --build-context=ssl=../../ssl/ --build-context=operation_data=./operation_data/
```

Build the **web service** with docker by running:

```bash
cd ./apps/client
docker buildx build -t defalt115/santa-elena-webapp:0.9a . --load 
```

Build **WordPress** as a service with docker by running:

```bash
cd ./wordpress
docker buildx build -t defalt115/libery-wordpress:1.0a . -f ./docker/Dockerfile --load
```

