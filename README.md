# Expense Tracker

This is a full-stack expense tracker application built with NestJS for the backend and a frontend framework of your choice.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Expense management (CRUD operations)
- JWT-based authentication
- MongoDB integration with Prisma ORM

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Ludis-et/expense-tracker.git
    cd expense-tracker
    ```

2. Install backend dependencies:
    ```sh
    cd server
    npm install
    ```

3. Set up environment variables:
    ```sh
    cp .env.example .env
    # Update .env with your configuration
    ```

4. Start the backend server:
    ```sh
    npm run start:dev
    ```

## Usage

1. Register a new user.
2. Log in with the registered user credentials.
3. Create, read, update, and delete expenses.

## API Endpoints

### Auth

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Log in a user

### Expenses

- `POST /expenses` - Create a new expense
- `GET /expenses` - Get all expenses for the logged-in user
- `DELETE /expenses/:id` - Delete an expense by ID

### Users

- `GET /users` - Get all users
- `GET /users/:id` - Get a user by ID

## Testing

1. Unit tests:
    ```sh
    npm run test
    ```

2. End-to-end tests:
    ```sh
    npm run test:e2e
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.