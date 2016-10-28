migrate:
	export NODE_ENV=development
	mv .env .env.bkp
	cp .env.example .env
	@node -r ./node_modules/dotenv/config.js node_modules/.bin/knex --cwd . --knexfile config/index.js migrate:latest

testing:
	export NODE_ENV=testing
	cp .env.testing .env
	@node -r ./node_modules/dotenv/config.js node_modules/.bin/mocha test/**/*.js

jenkins:
	export NODE_ENV=jenkins
	cp .env.jenkins .env
	@node -r ./node_modules/dotenv/config.js node_modules/.bin/mocha test/**/*.js
