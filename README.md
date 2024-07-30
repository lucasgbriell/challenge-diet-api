# Meal Tracker API

## Overview

This project is a Meal Tracker API that allows users to manage their meals. It includes user authentication and meal management functionalities, ensuring that each meal is related to a user and can be managed only by its creator. The API also provides user metrics to track meal statistics.

## Application Rules

- **User Management**
  - Create a user.
  - Authenticate a user between requests.
  
- **Meal Management**
  - Register a meal with the following details:
    - Name
    - Description
    - Date and Time
    - Whether it is within the diet or not
  - Edit a meal, modifying any of the above details.
  - Delete a meal.
  - List all meals of a user.
  - View a single meal.
  
- **User Metrics**
  - Retrieve the total number of meals registered.
  - Retrieve the total number of meals within the diet.
  - Retrieve the total number of meals outside the diet.
  - Retrieve the best sequence of meals within the diet.

- **Access Control**
  - Users can only view, edit, and delete the meals they created.

## Routes

### User Routes

| Method | Route        | Description                     | Authentication Required |
| ------ | ------------ | ------------------------------- | ----------------------- |
| POST   | `/`          | Create a new user               | No                      |
| PUT    | `/`          | Update a user                   | Yes                     |
| DELETE | `/`          | Delete a user                   | Yes                     |
| POST   | `/login`     | Authenticate and login a user   | No                      |
| GET    | `/me`        | Get authenticated user details  | Yes                     |

### Meal Routes

| Method | Route           | Description                    | Authentication Required |
| ------ | --------------- | ------------------------------ | ----------------------- |
| GET    | `/:id`          | View a single meal             | Yes                     |
| GET    | `/`             | List all meals of a user       | Yes                     |
| POST   | `/`             | Create a new meal              | Yes                     |
| PUT    | `/:id`          | Update a meal                  | Yes                     |
| DELETE | `/:id`          | Delete a meal                  | Yes                     |
| GET    | `/summary`      | Retrieve user meal metrics     | Yes                     |

## Controllers

### UserController

Handles user-related operations such as creating, updating, deleting users, logging in, and retrieving user details.

### MealController

Handles meal-related operations such as creating, updating, deleting meals, retrieving a single meal, listing all meals of a user, and retrieving meal metrics.

## Middleware

### Authenticate Middleware

Ensures that the user is authenticated before accessing certain routes. This middleware is applied to routes that require user authentication.

## Usage

1. **Install Dependencies**

npm install

2. **Copy env file**
cp .env.example .env

note: update if necessary

3. **Run the server in development mode**
npm run dev

4. **App is up**
Enjoy!

## Technologies Used

### Dependencies

- **@fastify/cookie**: `^9.3.1` - Fastify plugin to handle cookies.
- **dotenv**: `^16.4.5` - Loads environment variables from a `.env` file.
- **fastify**: `^4.28.1` - Fast and low overhead web framework for Node.js.
- **knex**: `^3.1.0` - SQL query builder for Node.js.
- **pg**: `^8.12.0` - PostgreSQL client for Node.js.
- **supertest**: `^7.0.0` - SuperAgent driven library for testing HTTP servers.
- **tsup**: `^8.2.3` - Fast and lightweight bundler.
- **vitest**: `^2.0.4` - Testing framework for Vite projects.
- **zod**: `^3.23.8` - Type-safe schema validation library.

### Development Dependencies

- **@rocketseat/eslint-config**: `^2.2.2` - ESLint configuration from Rocketseat.
- **@types/node**: `^22.0.0` - TypeScript definitions for Node.js.
- **eslint**: `^8.57.0` - Linter for identifying and fixing problems in JavaScript/TypeScript code.
- **tsx**: `^4.16.2` - TypeScript execution environment.
- **typescript**: `^5.5.4` - TypeScript language support.
- **sqlite3**: `^5.1.7` - SQLite3 database for Node.js.