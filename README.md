# 🔧 Task Manager Backend (Node.js + Express)

Backend API for the Task Manager application, handling authentication, task management, and email-based password reset.

🔗 **Frontend:** https://task-manager-frontend-lemon-ten.vercel.app  
🔗 **Frontend Repo:** https://github.com/Varsha-devhub/TaskManager-frontend  

---

## 🔗 Live API

⚙️ https://auth-backend-3kx0.onrender.com

---

## ✨ Features

- 🔐 JWT Authentication & Authorization
- 🔑 Secure Login & Registration
- 📧 Password Reset via Email (Token-based)
- ✅ Task CRUD APIs
- 🔒 Protected Routes
- 🔒 Password hashing using bcrypt

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Nodemailer
- Mailtrap

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

---

## 📦 Installation

git clone https://github.com/Varsha_devhub/TaskManagerBackend.git
cd TaskManagerBackend
npm install
npm start

---

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

## 🧠 Highlights

- Implemented secure token-based authentication
- Designed RESTful APIs with protected routes
- Handled real-world deployment and environment configuration
- Integrated email service for password reset

---

## 👨‍💻 Author

* Varsha
* GitHub: https://github.com/Varsha-devhub

---
