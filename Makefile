MAKEFLAGS = -j1

# export NODE_ENV = test

.PHONY: test

test:
	@NODE_ENV=test \
	babel-node ./node_modules/.bin/_mocha \
	--reporter spec \
	--require should \
	./src/backend/tests.js
