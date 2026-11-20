# Intern Training — Full-Stack Vue 3 + Express + MySQL

Complete full-stack project with **Login**, **Signup**, **Dashboard**, **User Management**, and **Role Management** connected to a **MySQL** database.

## 1. MySQL Setup
1. Start your MySQL server (XAMPP, Laragon, WAMP, or MySQL Windows/Linux service).
2. Check `backend/.env` and update `DB_USER` / `DB_PASSWORD` if needed (default: `root` with empty password).
3. The backend automatically creates `intern_training_db`, tables (`users`, `roles`), and a default admin account (`admin` / `admin123`) on startup—or you can manually run `backend/database.sql`.

## 2. Run the Backend (Express + MySQL)
```bash
cd backend
npm install
npm start
```
Backend runs at `http://localhost:5000`.

## 3. Run the Frontend (Vue 3 + Vuetify)
Open a second terminal in the project root (`Intern_Tranining/`):
```bash
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.
