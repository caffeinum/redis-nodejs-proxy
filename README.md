# redis-nodejs-proxy

## Intro

Sometimes even [Redis](https://redis.io/) is too slow. So we cache his requests in NodeJS.

## Run

Project uses `Docker` and has `Makefile`. You can run plain JS, if you prefer, or run out-of-the-box Dockerized setup.

### Running with NodeJS

1. Configure settings in `.env` file.

```
# default values:
PORT=3000
REDIS_ADDR=127.0.0.1
REDIS_PORT=6379
CACHE_EXPIRY_TIME=3600
CACHE_CAPACITY=10000
```

2. Install Node packages and build app.

```bash
npm i
npm run start # in dev mode
```

3. Run built version

```bash
npm run build
node dist
```

4. Test:

```bash
curl localhost:3000/test1
curl localhost:3000/test1
curl localhost:3000/test2
```

### Running with Docker

1. Setup environment variables for Docker compose:

```yaml
# docker-compose.yml
...
  environment:
    - PORT=3000
    - REDIS_ADDR=host.docker.internal
    - REDIS_PORT=6379
    - CACHE_EXPIRY_TIME=3600
    - CACHE_CAPACITY=10000
    - NODE_ENV=production
...
```

2. Run Docker containers:

```bash
make
```

3. Run tests

```bash
make test
```

## Contribution

Feel free to comment

## LICENSE

[LICENSE]

MIT
