# Node Mongo App

A Node.js application with MongoDB container to store user details.

## Prerequisites

- Node.js
- Docker

## Setup

1. Clone the repository.
2. Navigate to the project directory.

### Install dependencies

```sh
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the following:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/node-mongo-app
```

### Run MongoDB with Docker

```sh
docker run --name mongo -d -p 27017:27017 mongo
```

### Start the server

```sh
npm start
```

## API Endpoints

- `POST /api/users` - Create a new user.
- `GET /api/users` - Get all users.
- `GET /api/users/:id` - Get a user by ID.
- `PATCH /api/users/:id` - Update a user by ID.
- `DELETE /api/users/:id` - Delete a user by ID.
