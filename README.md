# Instruments API

Instrumnets API in node using express

## Contents
* [Installation](#installation)
* [Run](#run)
* [Tests](#tests)
* [Linter](#linter)
* [Migrations](#migrations)

---


### Installation

> **Prerequisites**
> 
> * You'll need Node version 18.x to be installed.
> * You'll also need a running instance of a postgres database.

1. `git clone git@github.com:patrikis-angelos/instruments_api.git`
2. `cd instruments_api`
3. `npm install`

### Run

Start the server: `npm start`

Or to start the server using nodemon (to track changes during development): `npm run dev`

### Tests

Run tests: `npm test`  
Run tests with coverage: `npm run test:coverage`

### Linter

Check linter errors/warnings: `npm run lint`  
Fix linter errors: `npm run lint:fix`  

### Migrations

* Create new migration: `npm run migration:create --name=MigrationName`
* Run migration: `npm run migration`
* Revert migration: `npm run migration:revert`