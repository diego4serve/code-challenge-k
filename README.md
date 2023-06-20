# Koombea Code Challenge


Libraries used

- Typescript
- Express
- Sqlite
- TypeORM
- Cheerio
- EJS


## Running on localhost

First make sure you have Node 18 installed. After that run:

```sh
npm install
npm run start
```

Then browse http://localhost:3000

## Architecture Overview

```text
- src
  - config/        # This directory holds project-specific configurations, likely related to the authentication strategy using Passport.
  - constants/     # Contains application-level constants that may be used throughout the codebase.
  - controllers/   # Houses the controller layer, responsible for handling requests and generating appropriate HTML templates or performing redirects.
  - entity/        # Model layer using TypeORM entities, representing the data structure and relationships.
  - middlewares/   # Middleware functions that can be used to handle common tasks or add additional functionality to routes.
  - routes/        # Organizes routes based on subject, such as authentication, scrap, and pages. Each file in this directory represents a group of related routes.
  - services/      # Services layer, where heavier logic resides to keep the controllers clean. Interacts with the entity layer and performs complex operations.
  - views/         # Contains the view layer using EJS templates. This directory holds the HTML templates that will be rendered and sent to the client.
  - app.ts         # The main script file that sets up the Express application, middleware, and registers the routes.
  - data-source.ts # Handles the configuration of the data source, in this case, the SQLite file and connection setup.

```


