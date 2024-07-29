# User CRUD with Node.js, Express, PostgreSQL, and JWT

This project is a CRUD (Create, Read, Update, Delete) application for managing users, implemented using Node.js, Express, PostgreSQL, and JWT for authentication.

## Technologies Used

- **Node.js**: JavaScript runtime environment for the server.
- **Express**: Web application framework for Node.js.
- **PostgreSQL**: Relational database management system.
- **JWT (JSON Web Tokens)**: Token-based authentication mechanism.
- **bcryptjs**: Library for password hashing.
- **dotenv**: Loads environment variables from a `.env` file.
- **morgan**: Middleware for HTTP request logging.

## Installation

### Clone the Repository

git clone https://github.com/your_username/your_repository.git
cd your_repository

### Configure the Environment

1. **Install dependencies**:

   npm install

2. **Configure the Database**:

   - Ensure you have PostgreSQL installed and running.
   - Create a database and tables using the following SQL script:

     ```sql
     CREATE DATABASE jwt_db;

     DROP TABLE IF EXISTS USERS;

     CREATE TABLE users (
       UID SERIAL PRIMARY KEY,
       EMAIL VARCHAR(50) NOT NULL UNIQUE,
       PASSWORD VARCHAR(60) NOT NULL,
       USERNAME VARCHAR(50) NOT NULL
     );

     SELECT * FROM USERS;
     ```

   - Configure the database connection in the `config.js` file. Example:

     ```javascript
     export const DATABASE_URL =
       "postgresql://username:password@localhost:5432/jwt_db";
     ```

3. **Configure Environment Variables**:

   - Create a `.env` file in the root of the project with the following variables:

     ```env
     DATABASE_URL=postgresql://username:password@localhost:5432/jwt_db
     JWT_SECRET=your_jwt_secret
     PORT=3000
     ```

## Usage

### Start the Server in Development Mode

To start the server in development mode with automatic reloading, use the following command:

npm run dev

The server will start at `http://localhost:3000` by default.

### Project Structure

login-register-jwt/
│
├── node_modules/
├── src/
│ ├── apiV1/
│ │ ├── controllers/
│ │ │ └── user.controller.js
│ │ ├── database/
│ │ │ ├── connection.database.js
│ │ │ └── init.database.sql
│ │ ├── middelwares/
│ │ │ └── jwt.middelware.js
│ │ ├── models/
│ │ │ └── user.model.js
│ │ ├── routes/
│ │ ├── public.router.js
│ │ └── user.router.js
│ ├── public/
│ ├── assets/
│ ├── login.html
│ ├── profile.html
│ └── register.html
├── .env
├── .gitignore
├── config.js
├── package.json
├── package-lock.json
└── index.js

### Available Routes

#### API (requires JWT authentication)

- **POST /api/v1/users/register**: Register a new user.
- **POST /api/v1/users/login**: Authenticate a user and return a JWT token.
- **GET /api/v1/users/profile**: Get the profile information of the authenticated user.
- **PATCH /api/v1/users/username**: Update the username of the authenticated user.
- **PATCH /api/v1/users/email**: Update the email of the authenticated user.
- **PATCH /api/v1/users/password**: Update the password of the authenticated user.
- **DELETE /api/v1/users/delete**: Delete the authenticated user.

#### User Interface (Static Files)

- **GET /login**: Serves the `login.html` file.
- **GET /profile**: Serves the `profile.html` file.
- **GET /register**: Serves the `register.html` file.

### Request Examples

#### Register User

curl -X POST http://localhost:3000/api/v1/users/register \
-H "Content-Type: application/json" \
-d '{"username": "user", "password": "password"}'

#### Login

curl -X POST http://localhost:3000/api/v1/users/login \
-H "Content-Type: application/json" \
-d '{"username": "user", "password": "password"}'

#### Get User Profile

curl -X GET http://localhost:3000/api/v1/users/profile \
-H "Authorization: Bearer <your_jwt_token>"

## Contributions

Contributions are welcome. Please follow these steps to contribute:

1. Fork the repository.
2. Create a branch for your change (`git checkout -b my-change`).
3. Make your changes and commit them (`git commit -am 'Add my change'`).
4. Push your changes to your repository (`git push origin my-change`).
5. Open a pull request on this repository.

## License

This project is licensed under the [ISC License](LICENSE).

## Contact

For any inquiries, please contact [jesus.carrascalh@gmail.com](mailto:jesus.carrascalh@gmail.com).
