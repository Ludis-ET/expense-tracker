# Expense Tracker

This is a full-stack expense tracker application that helps you manage your expenses efficiently. The server side of the application is built with Node.js and Express, while the client side is built with React.

## Project Description

The Expense Tracker application allows users to:
- Add, edit, and delete expenses
- Categorize expenses
- View expense summaries and reports
- Manage user authentication and authorization

## Installation

To install and run this project, follow these steps:

### Prerequisites

Make sure you have the following installed on your system:
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (for the database)

### Clone the Repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker/server
```

### Install Dependencies

```bash
npm install
```

### Set Up Environment Variables

Create a `.env` file in the `server` directory and add the following environment variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Run the Server

```bash
npm start
```

The server should now be running on `http://localhost:5000`.

### Run the Client

Navigate to the client directory and follow the instructions in the client's README file to install and run the client side of the application.

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.