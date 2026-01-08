# Project React – Full Stack Authentication System

This project is a **full-stack web application** built using **React (TypeScript)** for the frontend, **GraphQL (Apollo Server)** for the backend, and **PostgreSQL** as the database.  
It implements a complete **user registration and login system** with **secure password handling** and proper **frontend and backend validation**.

---

## Features Implemented

### Frontend (React – TypeScript)
- Login and Registration pages
- Apollo Client integration for GraphQL communication (Can also use pgAdmin 4 software for database handling)
- Client-side form validation:
  - Email must be a valid format (contain `@`)
  - Password must be at least **6 characters** (Can be changed on future implementation)
- User-friendly error messages for invalid inputs
- Displays authentication errors (e.g. invalid credentials)

### Backend (GraphQL – Apollo Server)
- GraphQL API with Queries and Mutations
- User registration and login mutations
- Secure password hashing using **bcrypt**
- Secure login verification using hashed password comparison
- Proper error handling using GraphQL errors
- CORS configuration for frontend communication
- Explicit IPv4 binding to avoid network issues on Windows

### Database (PostgreSQL)
- Users stored in PostgreSQL
- Passwords stored as **hashed values** (not plain text)
- Primary key uses `unique_id`

---

## System Architecture

React Frontend (Port 3333) -> Apollo Client (GraphQL) -> GraphQL Server – Apollo Server (Port 4000) -> PostgreSQL Database


---

## Technology Stack

| Layer | Technology |
|-----|-----------|
| Frontend | React, TypeScript, Apollo Client |
| Backend | Node.js, Apollo Server, GraphQL |
| Database | PostgreSQL |
| Security | bcrypt |
| Tooling | Yarn, ts-node |

---

## Project Structure

### Frontend
project-react/
├── src/
│ ├── components/
│ │ ├── Login.tsx
│ │ ├── Register.tsx
│ ├── graphql/
│ │ └── mutations.ts
│ ├── utils/
│ │ └── validation.ts
│ ├── App.tsx
│ └── index.tsx

### Backend
project-react-backend/
├── src/
│ ├── index.ts
│ ├── db.ts
│ ├── schema.ts
│ └── resolvers.ts
├── .env
├── tsconfig.json

---

## How to Run the Project

### 1️) Start PostgreSQL
Ensure PostgreSQL is running locally and the database is created.

Example table structure:

sql
CREATE TABLE users (
  unique_id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
); 

2️) Run Backend (GraphQL Server)
cd project-react-backend
yarn ts-node src/index.ts


Backend will run at:

http://127.0.0.1:4000

3️) Run Frontend (React)
cd project-react
yarn start

Frontend will run at:
http://localhost:3333

## Testing the Application

Register

Enter a valid name, email, and password
Password must be at least 6 characters
User is stored securely in the database

Login

Enter registered email and password
Correct credentials → Login successful
Invalid credentials → Error message shown

Backend Testing

GraphQL mutations can be tested using the local GraphQL Playground at:
http://127.0.0.1:4000
(p/s: Sometimes the sandbox disconnected to the server, but can still be achiveable by running pgAdmin 4 software)

## Security Considerations

Passwords are never stored in plain text
bcrypt hashing is used for password storage
Login uses secure hash comparison
Generic error messages prevent information leakage
Frontend validation improves usability
Backend validation ensures security

Example Attachments
The usage of Apollo GraphQL Sandbox query for register and log in
<img width="1600" height="820" alt="image" src="https://github.com/user-attachments/assets/0f4ff588-43ca-44ff-aadf-c31d9988fa7b" />

<img width="1600" height="754" alt="image" src="https://github.com/user-attachments/assets/f0b4c130-f244-40c4-b3d3-f7e275d55505" />

Log in and register page website
<img width="1600" height="856" alt="image" src="https://github.com/user-attachments/assets/341761a4-fbf1-468b-9e3a-dec1e8c19a5f" />

<img width="1600" height="856" alt="image" src="https://github.com/user-attachments/assets/fc4ae881-30d9-47da-9e1f-86a883b5da60" />

Hashing of the password inside the database
<img width="1528" height="629" alt="image" src="https://github.com/user-attachments/assets/e782c20e-25f6-47ce-93ae-3d3f15483e2d" />

Error handling message for both log in and register page
<img width="1600" height="757" alt="image" src="https://github.com/user-attachments/assets/682afd8b-1e97-4ae4-b644-6d07d61f4682" />

<img width="1600" height="822" alt="image" src="https://github.com/user-attachments/assets/0e68d80a-c0f5-4d92-88a7-ffa1b304d472" />

<img width="1600" height="823" alt="image" src="https://github.com/user-attachments/assets/bfc60e1d-ec90-49b0-a357-48540ee74583" />







