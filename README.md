# Replate

Replate is a web project that aims to make the sharing of left over food, from restaurants to charities that deal with feeding the homeless, an easier experience.

## Features

- Businesses can create food 'pickups' which are then listed on the web page
- Volunteers can accept available pickups which will remove them from public listings
- Businesses can delete a pickup after a volunteer has collected the pickup from the business

# Application Links

[Trello](https://trello.com/b/DroPax8y/replate)
[API Link](https://replate-eu.herokuapp.com/api)

# Getting Started

## NPM Scripts

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **npm run server** to start the local server
- **test** to start server using test enviromennt
- **npx knex migrate:latest** to migrate the tables
- **npx knex seed:run** to seed the tables
- **npx knex migrate:rollback** to rollback all tables

## Technologies

NodeJS - is a JavaScript runtime built on Chrome's V8 JavaScript engine.

The Express.js backend framework was used to build the server. Fast, unopinionated, minimalist web framework for Node.js

Why Express.js?

- Fast
- Efficient
- Scalable
- Lightweight(framework)

## Supporting Technologies

Linter

- ESLint - The pluggable linting utility for JavaScript and JSX

Test Tools

- Jest - Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- Supertest

# API Documentation

#### Auth Routes

| Method | Endpoint         | Access Control | Description                |
| ------ | ---------------- | -------------- | -------------------------- |
| POST   | `/auth/register` | all users      | Creates a new user account |
| POST   | `/auth/login`    | all users      | Returns a token            |

#### User Routers

| Method | Endpoint                | Access Control     | Description                         |
| ------ | ----------------------- | ------------------ | ----------------------------------- |
| GET    | `/users/:id`            | authenticated user | Returns user of :id                 |
| PUT    | `/users/:id`            | authenticated user | Updates an existing user            |
| PUT    | `/users`                | authenticated user | Updates an existing user's account  |
| POST   | `/users/details`        | authenticated user | Create user details                 |
| DELETE | `/users/:id`            | authenticated user | Removes an existing user            |
| DELETE | `/users/remove/details` | authenticated user | Remove account details of logged in |

#### Pickup Routers

| Method | Endpoint               | Access Control     | Description                       |
| ------ | ---------------------- | ------------------ | --------------------------------- |
| GET    | `/pickups`             | authenticated user | Returns all uncompleted pickups   |
| GET    | `/pickups/:id/details` | authenticated user | Returns pickup details at :id     |
| POST   | `/pickups`             | authenticated user | Creates a new pickup              |
| GET    | `/pickups/me`          | authenticated user | Returns all pickups of logged in  |
| DELETE | `/pickups/:id`         | authenticated user | Removes an existing pickup at :id |

## [Postman Generated Documentation](https://replate.postman.co/collections/3197974-4ad12a1f-de2c-4147-9608-97bccd457b3c?version=latest&workspace=0eec9087-fad5-4d1b-8cf1-ca52332fd501)

# [Frontend](https://github.com/Replate-EU/Frontend)
