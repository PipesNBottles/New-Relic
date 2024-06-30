# Simple API, a simple web app

The project's goal is to implement the Full-Stack SWE Assignment at New Relic.


# Set-up
For local development purposes you can run both the dashboard and the api separately though you will need a couple of pre-requisites. 

## The Dashboard

1. you will need node v18 or later
2. in the directory `simple-dashboard` run `npm install` or if you use yarn, `yarn install`
3. change the values in the .env file based on what host and port you are running the api on

## The API

1. you will need python version 3.10 or later
2. The package manager for the project is poetry, you can see how to install it at https://python-poetry.org/docs/
3. once poetry is installed, in the root directory where the `pyproject.toml` is located run `poetry install` and all dependencies will be added

## Docker

if you wish to just run the project without installing anything you simply need to run `docker-compose up -d --build` 


# Running the project

if running the api only:
`poetry run uvicorn shift_service.server:app --host 0.0.0.0 --port 8000`
documentation for the apis local `http://0.0.0.0:8000/docs`

if running the dashboard:

`yarn start` or `react-scripts start`

# Architecture and Design

## Backend 

The frameworks chosen for this project are FastApi and React. They were chosen simply due to the speed required to get something ready by the deadline.

[FastApi](https://fastapi.tiangolo.com/) is a python framework that gives strong type hints and performance while using python. The main pros with FastApi is that it comes with several tools in the box.

For managing types in a safe way [Pydantic](https://docs.pydantic.dev/latest/) and for the web server [Starlette](https://www.starlette.io).

Thus for the models and data the design is a follows:

Using SQLAlchemy our `Users` class is a declarative ORM for our users table allowing easy tracking and manipulation of data with our database. Likewise with Pydantic we have defined a schema for Users and the query params to prevent unneccessary errors or mistakes from the user. This makes the code reliable and repeatable, along with ease of scalability and extendibility.

## Database

Our database of choice is Postgres for the docker container and pseudo prod environemnt along with PGAdmin for direct access. In the local development environment the default database unless otherwise specified is sqlite. The reasoning for this is that unlike in a prod environment where metrics and other features are overkill for dev since most developers need quick reliable tools since they are their own customer.

## Frontend

For the frontend React with TypeScript was used. The choice was again the speed needed for development with the type safety provided from TypeScript for data.

The organization of the code is based on data models, user data we have our index for pulling all users as well as specialized components to show the data. If Redux or some other library is needed everything will go in shared since all shared resources will be there, including APIs. If in the future we have multiple APIs we can split those up into classes or other resources specifically for requests or other actions and extend our types for them.

# Known Issues

Searching - Not case sensitive, if this is an issue we can fix it by changing the filter in the `AllUsers` component.