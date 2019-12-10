# redis-nodejs-proxy

## Intro

Sometimes even [Redis](https://redis.io/) is too slow. So we cache his requests in NodeJS.

## Run

Project uses `Docker` and has `Makefile`. You can run plain JS, if you prefer, or run out-of-the-box Dockerized setup.

### Running with NodeJS

```bash
npm i
npm run dev # in dev mode
# or
# npm run build
# npm run start
```

To test:

```bash
curl localhost:3000/test1
curl localhost:3000/test1
curl localhost:3000/test2
```

### Running with Docker

```bash
make
make test
```

## Contribution

Feel free to comment

## LICENSE

[LICENSE]

MIT
