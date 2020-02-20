db-migrate db:drop Matcha --config ./config/database.json
db-migrate db:create Matcha --config ./config/database.json
db-migrate up --config ./config/prod.json
