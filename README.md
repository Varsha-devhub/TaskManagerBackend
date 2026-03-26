# 🔧 Task Manager Backend

Backend API for a full-stack task management application with authentication, password reset via email, and task operations.

---

## 🔗 Live API

⚙️ https://auth-backend-3kx0.onrender.com

---

## ✨ Features

* 🔐 User Authentication (JWT)
* 🔑 Password Reset via Email
* 📋 Task CRUD Operations
* 🔒 Protected Routes (Auth Middleware)
* 📧 Email Integration (Mailtrap)

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)
* Nodemailer

---

## ⚙️ Environment Variables

Create a `.env` file:


MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret

EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mailtrap_user
EMAIL_PASS=your_mailtrap_user

FRONTEND_URL=https://task-manager-frontend-lemon-ten.vercel.app



## 📦 Installation


git clone https://github.com/Varsha_devhub/TaskManagerBackend.git
cd TaskManagerBackend
npm install
npm start



## 📡 API Endpoints

### Auth

* POST /api/auth/register
* POST /api/auth/login
* POST /api/auth/forgot-password
* POST /api/auth/reset-password/:token

---

### Tasks

* GET /api/tasks
* POST /api/tasks
* PUT /api/tasks
* DELETE /api/tasks/:id

---

## 👨‍💻 Author

* Varsha
* GitHub: https://github.com/Varsha-devhub

---
