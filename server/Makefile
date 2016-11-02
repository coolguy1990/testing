migrate:
	export NODE_ENV=development
	cp .env.example .env
	@node -r ./node_modules/dotenv/config.js node_modules/.bin/knex --cwd . --knexfile config/index.js migrate:latest

testing:
	export NODE_ENV=testing
	cp .env.testing .env
	@node -r ./node_modules/dotenv/config.js node_modules/.bin/istanbul cover node_modules/.bin/_mocha test/**/*.js

jenkins:
	export NODE_ENV=jenkins
	cp .env.jenkins .env
	@node -r ./node_modules/dotenv/config.js node_modules/.bin/istanbul cover node_modules/.bin/_mocha test/**/*.js

linting:
	./node_modules/.bin/eslint -c .eslintrc.js -f checkstyle . > lintresults.xml || true
