# Todo App

## Tech-Stack

- Database: Docker + MySQL
- ORM: TypeORM
- Framework: Nestjs

## Entities

- User
- Task
- Auth

## Endpoints

### User

- GET /users: returns all users
- POST /users: creates a new user
- GET /users/:id: returns a user by id
- PUT /users/:id: updates a user by id
- DELETE /users/:id: deletes a user by id

### Task

- GET /tasks?userId=:userId&completed=:completed: returns all tasks for a user and filters by completion
- POST /tasks: creates a new task
- GET /tasks/:id: returns a task by id
- PUT /tasks/:id: updates a task by id
- DELETE /tasks/:id: deletes a task by id
- POST /tasks/:id/complete: marks a task as completed
- POST /tasks/:id/undo: marks a task as not completed

### Auth

- POST /auth/signIn
- POST /auth/signUp
