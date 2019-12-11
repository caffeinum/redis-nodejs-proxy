# docker-build:
# 	@docker build -t caffeinum/redis-proxy .
#
# docker-run:
# 	@docker run \
# 	  -e "NODE_ENV=production" \
# 	  -u "node" \
# 		-net "host" \
# 		-p 3000:3000 \
# 	 	-d caffeinum/redis-proxy
# 	@sleep 1
#
# docker-test:
# 	@curl -i localhost:3000
# 	@echo "\n\nShould print Hello World"
#
# docker: docker-build docker-run docker-test

docker:
	@docker-compose up -d

node-test:
	@npm run test -- --exit 

curl-test:
	@sh bin/simple_test.sh

test: node-test docker curl-test

.PHONY: compose
