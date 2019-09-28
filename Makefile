#!make
.PHONY: install test

install:
	npm install

test:
	source .env.example && npm test
