# Tactology Assessment Backend

## Overview
This is a NestJS-based backend application with GraphQL, TypeORM, and PostgreSQL, implementing a department management system with authentication.

## Technologies Used
- NestJS
- GraphQL
- TypeORM
- PostgreSQL
- JWT Authentication
- TypeScript

## Features
-  User registration and login with JWT-based authentication.
- Department Management
  - Create departments with optional sub-departments
  - Read department hierarchy
  - Update departments
  - Delete departments
- Protected GraphQL endpoints
- Input validation

## Prerequisites
- Node.js (v18+)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository
```bash
git clone https://github.com/Preshy-Jones/tactology_assessment.git
cd tactology_assessment
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:
```env
POSTGRES_DB_HOST=localhost
POSTGRES_DB_PORT=5432
POSTGRES_USER=your_db_username
POSTGRES_PASSWORD=your_db_username
POSTGRES_DB=your_db_name
JWT_SECRET=your_secret_key
JWT_EXPIRATION=
```

4. Run the application
  Development
```bash
npm run start:dev
```
  Production
```bash
npm run build
npm run start:prod
```

5. Access the GraphQL playground at `http://localhost:4000/graphql`

## Usage
- Register a user
```graphql
mutation {
  RegisterUser(input: {
    username: "preshyjonesRULES"
    password: "Password123@"
  }) {
    id
    username
  }
}
```

- Login
```graphql
mutation {
  Login(username: "preshyjones", password: "Password123@") {
    access_token
    user {
      id
      username
    }
  }
}
```

- Create a department
```graphql
mutation {
  CreateDepartment(input: {
    name: "Engineering"
    parentDepartmentId: null
  }) {
    id
    name
  }
}
```

- Update a department
```graphql
mutation {
  CreateDepartment(input: {
    name: "Department Name",
    subDepartments: [{ name: "Sub-department 1" }, { name: "Sub-department 2" }]
  }) {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
```

- Delete a department
```graphql
mutation {
  DeleteDepartment(id: 1)
}
```

- Get departments
```graphql
query {
  GetDepartments {
    id
    name
    subDepartments {
      id
      name
    }
  }
}
```

## Deployment
Hosted on Render.com
Deployment URL: https://tactology-assessment.onrender.com
GraphQL Playground: https://tactology-assessment.onrender.com
NOTE: Render deployment on free tier, so the server may be asleep. Kindly give it a 50 seconds to wake up.








