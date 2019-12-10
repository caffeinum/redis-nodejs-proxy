docker-build:
	@docker build -t caffeinum/redis-proxy .

docker-run:
	@docker run -p 49160:3000 -d caffeinum/redis-proxy
	@sleep 1

docker-test:
	@curl -i localhost:49160
	@echo "Should print Hello World"

docker: docker-build docker-run docker-test

test:
	@npm run test

.PHONY: test
