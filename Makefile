docker-build:
	@docker build -t caffeinum/redis-proxy .

docker-run:
	@docker run \
	  -e "NODE_ENV=production" \
	  -u "node" \
		-p 49160:3000 \
	 	-d caffeinum/redis-proxy
	@sleep 1

docker-test:
	@curl -i localhost:49160
	@echo "\n\nShould print Hello World"

docker: docker-build docker-run docker-test

compose:
	@docker-compose up

test:
	@npm run test

.PHONY: compose
