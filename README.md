**Features**
User Registration: Allows new users to register with a username, email, password, and role. Roles include admin, manager, and staff.
User Login: Allows users to login using their email and password, returning a JWT token for authentication.
Product Management: Enables CRUD operations on products with role-based access control:
Create Product: Accessible by admin role only.
Read Product: Accessible by admin and manager roles.
Update Product: Accessible by admin and manager roles.
Delete Product: Accessible by admin role only.

Technologies Used
Node.js: JavaScript runtime for server-side development.
Express.js: Web framework for Node.js to build the API.
JWT (JSON Web Token): For user authentication and authorization.
PostgreSQL

API Endpoints
User Registration
Endpoint: /v1/auth/register
Method: POST
Body Parameters:
username: String
email: String
password: String
role: String (admin, manager, staff)

Response:
201: User created successfully
400: Validation error

User Login
Endpoint: /v1/auth/login
Method: POST
Body Parameters:
email: String
password: String
Response:
200: Successful login, returns JWT token
401: Invalid credentials


Product Management
Create Product
Endpoint: /v1/product/create
Method: POST
Headers: Authorization: Bearer <token>
Body Parameters:
title: String
description: String
inventory_count: Number
Response:
201: Product created successfully
400: Token not provided or insufficient permissions

Read Product
Endpoint: v1/product/:id
Method: GET
Headers: Authorization: Bearer <token>
Response:
200: product details
400: Token not provided or insufficient permissions

Update Product
Endpoint: /v1/product/1/update
Method: PUT
Headers: Authorization: Bearer <token>
Body Parameters:
title: String
description: String
inventory_count: Number
Response:
200: Product updated successfully
400: Token not provided or insufficient permissions

Delete Product
Endpoint: /v1/product/1/delete
Method: DELETE
Headers: Authorization: Bearer <token>
Response:
200: Product deleted successfully
400: Token not provided or insufficient permissions
**
Installation and Setup**

Clone repoistory
 git clone git@github.com:ifthikarudheen/Syoft-Task.git

 Navigate to the project directory
Install dependencies
npm install

Configure environment variables:
Create a .env file in the root directory and add your database configuration and JWT secret key.

.env
JWT_SECRET=thisisasamplesecret
JWT_ACCESS_EXPIRATION_MINUTES=30
JWT_REFRESH_EXPIRATION_DAYS=30
PORT=3000

DB_NAME = 'products'
DB_USER = 'postgres'
DB_PASSWORD = 'ifthikar'
DB_HOST = 'localhost'

need a config.json inside src/config like the below
{
  "development": {
    "username": "postgres",
    "password": "ifthikar",
    "database": "products",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}



then migrate using    npx sequelize-cli db:migrate

run it using   npm run dev
!!!
