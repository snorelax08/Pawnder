# 🐾 Pawnder — Tinder for Pet Adoption

Pawnder is a full-stack MERN application that reimagines the pet adoption experience using a Tinder-style swipe interface. Users can browse adoptable pets, swipe right to express interest, or swipe left to pass, with all interactions recorded in real time.

This project is built as a resume-ready, production-style portfolio application, focusing on clean architecture, real-world debugging, and modern UI/UX patterns.

---

## 🚀 Features

- JWT-based authentication (Login & Signup)
- User & Shelter roles
- Browse adoptable pets from MongoDB
- Swipe-based interactions (Like / Pass)
- Gesture-driven UI using Framer Motion
- RESTful backend with Express.js
- Database seeding for demo-ready setup
- Clean MVC architecture (Models, Routes, Controllers)
- Vite-powered React frontend

---

## 🛠 Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- Framer Motion
- Axios
- React Router DOM

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)

---

## 📁 Project Structure

Pawnder/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Pet.js
│   │   └── Match.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── petRoutes.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PetCard.jsx
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Home.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
└── README.md

---

## ▶️ How to Run Locally

Prerequisites:
- Node.js (LTS)
- MongoDB (running locally)

Backend setup:
cd backend
npm install
node seed.js
node server.js

Frontend setup:
cd frontend
npm install
npm run dev

Frontend runs at:
http://localhost:5173

Backend runs at:
http://localhost:5000

---

## 🧪 Demo Login

Create a test user (one-time):
Invoke-RestMethod -Uri http://localhost:5000/auth/signup -Method POST -ContentType "application/json" -Body '{"name":"Test User","email":"test@test.com","password":"123","role":"user"}'

Login credentials:
Email: test@test.com
Password: 123

---

## 🎯 What This Project Demonstrates

- End-to-end MERN stack development
- Secure authentication and API design
- MongoDB schema modeling with Mongoose
- Gesture-based UI/UX engineering
- State management and API integration
- Real-world debugging and problem solving
- Clean, scalable project structure

---

## 📌 Future Enhancements

- Match & chat system
- Shelter dashboard
- Advanced pet filters
- Cloud deployment
- Password hashing with bcrypt
- Mobile-first UI refinements

---

## 👨‍💻 Author

Atharwa Vatsyayan  
B.Tech Computer Science & Engineering  
Full Stack Developer

---

## ⭐ Support

If you like this project, give it a star on GitHub.
