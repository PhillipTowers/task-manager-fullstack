# Task Manager

## Description

This project is a fullstack task management application built as part of my learning process in software development.

The main goal was not only to implement a CRUD application, but to simulate a real-world development environment by applying structured architecture, separation of concerns, and good development practices.

It also represents my first complete fullstack project, helping me understand how frontend and backend systems interact in a real scenario.

---

## Tech Stack

**Frontend**

* React
* TypeScript
* Vite

**Backend**

* Node.js
* Express
* TypeScript

**Database**

* PostgreSQL (managed with pgAdmin)
* Prisma ORM

**Other Tools**

* Zod (validation)
* Jest (testing)

---

## Features

* Create, edit, and delete tasks
* Mark tasks as completed
* Inline editing of task descriptions
* Confirmation before deleting tasks
* Centralized state management using a custom React hook
* Backend validation and structured error handling

---

## Architecture

### Frontend

* Component-based architecture (`TareaForm`, `TareaList`, `TareaItem`)
* Custom hook (`useTareas`) manages global state and API communication
* Clear separation between UI and logic
* Unidirectional data flow

### Backend

* Layered architecture:

  ```
  routes → controllers → services → database
  ```
* Input validation using Zod schemas
* Centralized error handling with custom error classes
* Clean separation of responsibilities

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/PhillipTowers/task-manager-fullstack.git
```

### 2. Backend setup

```bash
cd backend-tareas
npm install
```

Create a `.env` file in `backend-tareas` with your PostgreSQL connection:

```env
DATABASE_URL=your_database_url
```

Then run:

```bash
npx prisma migrate dev
npm run dev
```

---

### 3. Frontend setup

```bash
cd frontend-tareas
npm install
npm run dev
```

---

## Purpose of the Project

This project was built to:

* Strengthen my fullstack development skills
* Understand how to structure a real-world application
* Apply best practices in both frontend and backend
* Bridge gaps from my academic experience by building a complete system from scratch

---

## Author

Felipe Torres (PhillipTowers)
