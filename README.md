
## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


# Saraha-app
This is the backend server for Saraha App, a simple anonymous messaging platform, built using Node.js and Express. It offers a RESTful API for user authentication, sending/receiving anonymous messages, file uploads, and more.


## Features


-  User Authentication (Signup / Login / Token-based)
- Send and receive anonymous messages
-  Email verification using Nodemailer
-  Input validation with Joi
-  File uploads using Multer
-  Password hashing with bcrypt
-  Token generation and encryption using JWT and CryptoJS
-  RESTful API architecture
-  MongoDB integration using Mongoose


## Tech Stack

| Technology | Description |
|------------|-------------|
| **Node.js** | JavaScript runtime |
| **Express** | Web framework for Node.js |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **Joi** | Data validation |
| **Bcrypt** | Password hashing |
| **Nodemailer** | Sending emails |
| **Multer** | File upload handling |
| **CryptoJS** | Encryption utilities |
| **JWT** | JSON Web Token for authentication |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

PORT
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
