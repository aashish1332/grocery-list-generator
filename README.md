# 🛒 Smart Grocery List Generator

A premium, AI-powered grocery suggestion and list management application built with React, Vite, and MongoDB.

## ✨ Features

- **Modern UI/UX**: Sleek, "Apple-style" liquid glass aesthetics with high-end animations (Framer Motion).
- **Interactive Shaders**: Dynamic WebGL background animations for an immersive experience.
- **AI Suggestions**: Intelligent grocery recommendations based on historical data.
- **Full-Stack Authentication**: Secure sign-up and sign-in workflows using MongoDB and JWT.
- **Dark/Light Mode**: Seamless theme transitions with synchronized shader effects.

## 🚀 Tech Stack

- **Frontend**: React, Vite, Framer Motion, Three.js (Shaders)
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Vanilla CSS with modern design tokens

## 🛠️ Setup

### Prerequisites

- Node.js installed
- MongoDB instance (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aashish1332/grocery-list-generator.git
   ```
2. Install dependencies:
   ```bash
   # Root (Frontend)
   npm install

   # Backend
   cd backend
   npm install
   ```
3. Configure environment variables in `backend/.env`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```
4. Start the development servers:
   ```bash
   # Frontend
   npm run dev

   # Backend
   cd backend
   npm start
   ```

## 📝 License

MIT
