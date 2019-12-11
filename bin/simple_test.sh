#!/bin/bash

echo 'Running tests...'

# 1. Setup env
echo '################################'
echo '1. Setup env'

# 2. Set Redis values
echo '################################'
echo '2. Set Redis values'

redis-cli set nodejs-proxy-test-1 'valid string'
redis-cli set nodejs-proxy-test-2 'foo'
redis-cli set nodejs-proxy-test-3 'bar'

# 3. Check and wait until proxy is Running
echo '################################'
echo '3. Check and wait until proxy is Running'
sleep 3

# 4. Connect and read values
# 5. Check they are correct

echo '################################'
echo 'Test Case 1: Cache'

echo localhost:3000/nodejs-proxy-test-1
curl localhost:3000/nodejs-proxy-test-1
echo "\n"
echo localhost:3000/nodejs-proxy-test-1
curl localhost:3000/nodejs-proxy-test-1
echo "\n"
echo localhost:3000/nodejs-proxy-test-2
curl localhost:3000/nodejs-proxy-test-2
echo "\n"

echo '################################'
echo 'Test Case 2: Expiry'

echo '################################'
echo 'Test Case 3: LRU'

echo '################################'
echo 'OK!'
