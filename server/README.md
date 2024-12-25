# Expense Tracker Backend

This project is the backend of an Expense Tracker application built with NestJS and MySQL using Prisma as the ORM.

## Description

The Expense Tracker backend provides a robust and scalable API for managing expenses. It allows users to create, read, update, and delete expense records. The backend is built with NestJS, a progressive Node.js framework, and uses Prisma to interact with a MySQL database.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MySQL database

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/expense-tracker-backend.git
    cd expense-tracker-backend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up the environment variables:
    Create a `.env` file in the root directory and add the following:
    ```env
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
    ```

4. Run the Prisma migrations to set up the database schema:
    ```bash
    npx prisma migrate dev
    ```

## Running the Application

1. Start the NestJS server:
    ```bash
    npm run start:dev
    ```

2. The server will be running at `http://localhost:3000`.

## API Endpoints

- `GET /expenses` - Retrieve all expenses
- `POST /expenses` - Create a new expense
- `GET /expenses/:id` - Retrieve a specific expense by ID
- `PUT /expenses/:id` - Update a specific expense by ID
- `DELETE /expenses/:id` - Delete a specific expense by ID

## License

This project is licensed under the MIT License.