# PahadiBrand Backend

## Overview

This backend is developed using **Node.js** and **Express.js** for the PahadiBrand project. It provides REST APIs to manage Himalayan products using in-memory data storage.

---

## Features

* Express.js REST API
* CRUD operations for products
* Product search endpoint
* Centralized error handling middleware
* CORS enabled
* Environment variable support using dotenv

---

## Project Structure

```
Backend/
├── controllers/
├── data/
├── middleware/
├── routes/
├── .env
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

## Installation

1. Clone the repository.

2. Navigate to the Backend folder.

```bash
cd Backend
```

3. Install dependencies.

```bash
npm install
```

4. Create a `.env` file.

```
PORT=5000
NODE_ENV=development
```

5. Start the development server.

```bash
npm run dev
```

The server will start at:

```
http://localhost:5000
```

---

## API Endpoints

| Method | Endpoint                       | Description          |
| ------ | ------------------------------ | -------------------- |
| GET    | /api/products                  | Get all products     |
| GET    | /api/products/:id              | Get product by ID    |
| POST   | /api/products                  | Create a new product |
| PUT    | /api/products/:id              | Update a product     |
| DELETE | /api/products/:id              | Delete a product     |
| GET    | /api/products/search?q=keyword | Search products      |

---

## Technologies Used

* Node.js
* Express.js
* CORS
* dotenv
* Nodemon

---

## Testing

All endpoints were tested using **Postman** and return appropriate HTTP status codes and JSON responses.
