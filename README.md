# Starter boilerplate for NestJS
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Features
- [x] Swagger API
- [x] Git pre commit and pre push hooks
- [x] Typeorm migrations setup (history with reverting included)
- [WIP] Automated E22 testing with GitHub CI

## Migrations

1. Make some changes to the files with suffix `*.entity.ts`
2. Decide name for migration (eg. `new-username-column`)
3. Run `npm run migration:generate --name=new-username-column`
    - Check that new file was generated under [migrations/history](migrations/history)
    - Check that SQL query inside the file corresponds to what you wanted
4. If you want to run migration use `npm run migration:run`
    - Check that database was affected as expected

### Production migrations
Migrations will be applied automatically in other environments before application will start, since we
have `migrationsRun: true` configured in [src/config/database.ts](src/config/database.ts)

> You can simulate production migrations by doing 2 following steps:
> - Run `npm run build`
> - Run `npm run start:prod`
>
> After that check database that migration was applied properly

### Reverting migrations
Migrations can be reverted using `npm run migration:revert` which will call `down function` on the latest migration file
- After that migration record will be removed from `migrations` table in database
- If you want to revert multiple migrations, just run this command multiple times...

## Tests
Tests configuration resides in [/tests](./tests) directory.
- [fixtures](./tests/fixtures) defines necessary data which will be loaded into database
- [db-config.ts](./tests/db-config.ts) defines database connections based on [.evn.test](.env.test)
  - If you do not have [.evn.test](.env.test), create it based on [.evn.test.sample](.env.test.sample)
- [initialize.ts](./tests/initialize.ts) is main script which initializes db connection and runs all db fixtures
- [test.setup.sh](./test-setup.sh), starts docker, compiles code, run migrations and fixtures
  
### How to spin-off test database
- Startup docker daemon
  - If you do not have docker installed, then install it for example for Mac is [Docker Desktop](https://docs.docker.com/desktop/install/mac-install)
- Run `./test-setup.sh`
  - After that you can check created database in your favorite tool
- Run `npm run test`

> Note that for now if you want to test source code, you need to copy .env.test to .env (you must use same test db)

**Tests roadmap:**
 - [ ] When running `npm run test`, make sure that `.env` is automatically overridden with `.env.test`, so we do not need to copy that...
 - [ ] Make separate script for running fixtures, since this will be common case when writing tests (before each fixtures application we need to clean db)
 - [ ] Setup GitHub CI with tests