# Blog API

## Description
This is a Node.js-based API for managing blogs and their associated comments. It includes features for user authentication, blog creation, editing, deletion, and comment management. The API uses Express as its web framework, Sequelize for database ORM, and JSON Web Tokens (JWT) for authentication.

## Features
- User registration and login with password hashing.
- Token-based authentication for secure access.
- Blog management: create, edit, delete, and fetch blogs.
- Comment management: create, edit, delete, and fetch comments associated with blogs.

## Project Structure
```
├── controllers
│   ├── authController.js  # Handles user authentication
│   ├── blogController.js  # Manages blogs and comments
├── middleware
│   └── authMiddleware.js  # Middleware for token authentication
├── models
│   ├── blog.js            # Blog model definition
│   ├── comment.js         # Comment model definition
│   ├── user.js            # User model definition
├── routes
│   ├── auth.js            # Routes for authentication
│   ├── blog.js            # Routes for blogs and comments
├── utils
│   ├── generateToken.js   # Utility for generating JWT tokens
│   ├── responseFormatter.js # Utility for consistent API responses
├── database.js            # Sequelize setup and database connection
├── server.js              # Main entry point for the application
```

## API Endpoints

### Authentication Routes
Base URL: `/api/auth`

| Method | Endpoint     | Description            |
|--------|--------------|------------------------|
| POST   | `/register`  | Register a new user    |
| POST   | `/login`     | Login and get a token  |

### Blog Routes
Base URL: `/api/blog`

| Method | Endpoint       | Description                       |
|--------|----------------|-----------------------------------|
| POST   | `/`            | Create a new blog                 |
| GET    | `/`            | Fetch all blogs                   |
| GET    | `/:id`         | Fetch a single blog by ID         |
| PUT    | `/:id`         | Edit a blog by ID                 |
| DELETE | `/:id`         | Delete a blog by ID               |

### Comment Routes
Base URL: `/api/blog/:id/comment`

| Method | Endpoint             | Description                              |
|--------|----------------------|------------------------------------------|
| GET    | `/`                  | Fetch all comments for a specific blog  |
| POST   | `/`                  | Create a new comment on a blog          |
| GET    | `/:comment_id`       | Fetch a single comment by ID            |
| PUT    | `/:comment_id`       | Edit a comment by ID                    |
| DELETE | `/:comment_id`       | Delete a comment by ID                  |

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/blog-api.git
   cd blog-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   Create a `.env` file in the root directory and configure the following variables:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret
   DATABASE_URL=your_database_url
   ```

4. Run the application:
   ```bash
   npm start
   ```

## Usage
- Use tools like Postman or curl to test the endpoints.
- Authenticate by logging in and using the token in the `Authorization` header for protected routes.

## Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building APIs.
- **Sequelize**: ORM for interacting with the database.
- **JWT**: Token-based authentication.
- **bcrypt**: For hashing passwords.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---
For any issues or feature requests, please open an issue on GitHub or contact the repository maintainer.

