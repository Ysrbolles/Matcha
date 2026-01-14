up:
	docker-compose up -d

down:
	docker-compose down

build:
	docker-compose build

clean:
	docker-compose down --volumes --remove-orphans

restart:
	docker-compose restart

logs:
	docker-compose logs -f

.PHONY: up down build clean restart logs