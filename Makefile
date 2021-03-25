.PHONY: test

init:
	make clean && \
	docker-compose -f docker-compose.yml up --build
start:
	docker-compose -f docker-compose.yml up
start-build:
	docker-compose -f docker-compose.yml up --build
test:
	docker-compose -f docker-compose.yml run app npm test
test-cov:
	docker-compose -f docker-compose.yml run app npm run test:cov
format:
	docker-compose -f docker-compose.yml run app npm run format
stop:
	docker-compose -f docker-compose.yml down
clean:
	docker-compose -f docker-compose.yml down --volume