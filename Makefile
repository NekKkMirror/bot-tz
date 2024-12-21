# Development
run-dev:
	docker compose -f docker-compose.development.yml up -d --force-recreate

# Production
run-prod:
	docker compose -f docker-compose.production.yml up -d --force-recreate

stop-prod:
	docker compose -f docker-compose.production.yml down
