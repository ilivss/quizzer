# Quizzer

Pub quiz webapplication developed for the course DWA at HAN University of Applied Sciences.

## Dev environment

### API

Follow the steps below start developing:

1. Create a `.env` file in `./api` with the following contents:
   ```
   PORT=5000
   MONGO_URI=mongodb://user:password@localhost:27017
   ENVIRONMENT=dev
   ```
2. Start the local MongoDB docker container:
   ```Bash
   ~/.../quizzer
    $ sudo docker compose up -d
      ⠿ Container quizzer-mongodb  Running
   ```
3. Seed the database with questions:
   ```Bash
   ~/.../quizzer/api
    $ yarn run seed
   ```
4. Start the api:
   ```Bash
   ~/.../quizzer/api
    $ yarn run dev
   ```
5. From now on you just have start the docker container and api:

   ```Bash
   ~/.../quizzer
    $ docker compose up -d
    $ cd ./api && yarn run dev
   ```
   > Swagger is accessible through http://localhost:5000/swagger

###  quizmaster, team & scoreboard

🚀 vite.js + 🧪 react + 📝 typescript + 🎨 tailwindcss

1. `cd` into the app directory
2. run `yarn` to install deps
3. run `yarn dev` to start the local development server

> Note: when running multiple apps simultaneously, vite will assign the next available port starting at `5173`.