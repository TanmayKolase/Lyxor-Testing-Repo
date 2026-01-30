# User Profile GraphQL API

Node.js GraphQL API for user profile management using Apollo Server.

## Features

- GraphQL schema and resolvers
- MySQL database integration
- Apollo Server setup
- User CRUD operations

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up MySQL database:
```bash
mysql -u root -p < db/schema.sql
```

3. Update database credentials in `src/config/database.js`

4. Start the server:
```bash
npm start
```

The GraphQL API will be available at `http://localhost:4000/graphql`

## GraphQL Queries

### Get User
```graphql
query {
  getUser(id: "1") {
    id
    email
    name
    phone
  }
}
```

### Get All Users
```graphql
query {
  getAllUsers {
    id
    email
    name
  }
}
```

### Create User
```graphql
mutation {
  createUser(input: {
    email: "newuser@example.com"
    name: "New User"
    password: "password123"
  }) {
    id
    email
    name
  }
}
```

### Update User
```graphql
mutation {
  updateUser(id: "1", input: {
    name: "Updated Name"
  }) {
    id
    email
    name
  }
}
```

## Project Structure

```
src/
├── server.js              # Apollo Server setup
├── schema/
│   └── typeDefs.js        # GraphQL schema
├── resolvers/
│   ├── resolvers.js       # Resolver map
│   └── userResolver.js   # User resolvers
├── config/
│   └── database.js       # Database connection (hardcoded secrets)
├── middleware/
│   └── auth.js           # Auth middleware (unused)
└── utils/
    └── validation.js     # Validation utilities (unused)
```
