<div align="center">

# 🏠 Airbnb Clone

### *A full-stack property rental platform built with the MERN stack (MongoDB, Express, React, Node.js)*

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🏗️ Project Architecture](#-project-architecture)
- [📂 Directory Structure](#-directory-structure)
- [⚙️ How It Works](#-how-it-works)
- [🚀 Getting Started](#-getting-started)
- [🛣️ API Routes](#-api-routes)
- [🔐 Authentication Flow](#-authentication-flow)
- [🏡 Host Features](#-host-features)
- [🛒 Customer Features](#-customer-features)
- [🗄️ Database Models](#-database-models)
- [🔧 Environment Variables](#-environment-variables)
- [🛡️ Security](#-security)

---

## ✨ Features

<table>
<tr>
<td>

**🔐 Authentication (JWT / Session)**
- Email + Password Signup
- OTP-based email verification via Resend
- Secure login with bcrypt hashing
- Forgot & reset password via email link
- Persistent sessions (MongoDB stored)

</td>
<td>

**🏡 Host Portal**
- Add new property listings
- Upload property photos (multer)
- Edit listing details
- Delete listings (auto-cleans image)
- Host-only dashboard

</td>
</tr>
<tr>
<td>

**🛒 Customer Portal**
- Browse all available homes
- View detailed property info
- Add / remove from wishlist
- Download House Rules PDF
- Protected customer functionality

</td>
<td>

**🛡️ Security & UX**
- Role-based React route guards
- Context API for State Management
- Server-side form validation (express-validator)
- Email notifications (Resend)
- File type enforcement on uploads

</td>
</tr>
</table>

---

## 🏗️ Project Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                   │
│          React Router DOM + Context API + Tailwind CSS       │
└────────────────────────────┬─────────────────────────────────┘
                             │  REST API Calls
┌────────────────────────────▼─────────────────────────────────┐
│                    Backend (Express App)                     │
│  ┌──────────────┐  ┌────────────┐  ┌────────────────────────┐ │
│  │ Middleware   │  │  Session   │  │   Route Guards         │ │
│  │ body-parser  │  │ connect-   │  │ /host  → host only     │ │
│  │ multer       │  │ mongo      │  │ /homes → customer only │ │
│  │ cors         │  │            │  │ auth   → auth checks   │ │
│  └──────────────┘  └────────────┘  └────────────────────────┘ │
├──────────────────────────────────────────────────────────────┤
│                           Routers                             │
│   authRouter  │  storeRouter  │  hostRouter  │  legalRouter  │
├──────────────────────────────────────────────────────────────┤
│                         Controllers                           │
│  auth controllers │ host controllers │ store controllers      │
├──────────────────────────────────────────────────────────────┤
│                     Utilities / Services                      │
│  email-util (Resend) │ photo-storage │ validator │ db-util    │
├──────────────────────────────────────────────────────────────┤
│                          MongoDB                              │
│              User Model          Home Model                   │
└──────────────────────────────────────────────────────────────┘
```

---

## 📂 Directory Structure

```
airbnb/
│
├── backend/                  # 🚀 Express API Server
│   ├── app.js                # Entry point — middleware, routes, DB connect
│   ├── controllers/          # Route logic
│   ├── routers/              # Express routers
│   ├── models/               # Mongoose schemas (User, Home)
│   ├── utils/                # Helper utilities (email, db, multer)
│   ├── uploads/              # Uploaded property photos
│   └── package.json
│
└── frontend/                 # 💻 React Client
    ├── src/
    │   ├── components/       # Reusable components
    │   ├── pages/            # View pages (Auth, Home, Host, Store)
    │   ├── store/            # React context state management
    │   ├── App.jsx           # App routing with React Router
    │   └── main.jsx          # Entry point
    ├── index.html
    ├── vite.config.js        # Vite build configuration
    └── package.json
```

---

## ⚙️ How It Works

### 1. Application Bootstrap
The application is split into a frontend and backend. The React app is served separately from the Express API, making API calls to `/` endpoints.

### 2. Role-Based Route Guards
Both the frontend and backend enforce access:
- **Backend**: API endpoints check session state and user type before executing queries.
- **Frontend**: Protected routes redirect users based on their auth context and role (`guest`, `customer`, `host`).

### 3. State Management
The React frontend utilizes the **Context API** to maintain user session state across components, updating seamlessly across the SPA.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ and **npm**
- A running **MongoDB** instance
- A **Resend** account for sending emails

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd airbnb
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env  # Or create a .env with credentials
npm run dev
# API runs on http://localhost:3010
```

3. **Frontend Setup**
```bash
cd ../frontend
npm install
npm run dev
# React App runs on http://localhost:5173
```

---

## 🔧 Environment Variables

### Backend `.env`
```env
MONGO_URI=mongodb://localhost:27017/airbnb
SESSION_SECRET_KEY=your_super_secret_key_here
RESEND_API_KEY=re_your_resend_api_key
DOMAIN=yourdomain.com
```

---

## 🔐 Authentication Flow

```
┌─────────────┐     ┌────────────────┐     ┌──────────────────┐
│   Signup    │────▶│  Save to DB    │────▶│  Send OTP Email  │
│(React Form) │     │ (unverified)   │     │   (Resend API)   │
└─────────────┘     └────────────────┘     └──────────────────┘
                                                    │
                                           ┌────────▼─────────┐
                                           │ User enters OTP  │
                                           │  (5 min expiry)  │
                                           └────────┬─────────┘
                                                    │ OTP match?
                                           ┌────────▼─────────┐
                                           │ isVerified=true  │
                                           │ → Redirect Login │
                                           └──────────────────┘
```

**Password Reset Flow:**
Forgot Password → Email → Crypto token (5 min) → Reset link → New password hashed with bcrypt

---

## 🏡 Host Features
- **Add a Home** — Fill in property details and upload a photo. Uses `multer` for disk storage on the backend API.
- **Edit a Home** — Edits listing. Old photos are intelligently garbage collected from the server disk.
- **Delete a Home** — Removes document and photo file.

---

## 🛒 Customer Features
- **Browse Homes** — Browse properties fetched through frontend API requests.
- **Home Details** — Deep dive into listing info, download legal docs.
- **Wishlist** — Instantly add to or remove from wishlist asynchronously using Context state updates.

---

## 🗄️ Database Models

### `User` Schema
```js
{
  firstName:       String (required),
  lastName:        String (required),
  email:           String (required, unique),
  password:        String (bcrypt hashed),
  userType:        'customer' | 'host',
  otp:             String,          // 6-digit OTP
  otpExpiry:       Date,            // 5 minutes from creation
  isVerified:      Boolean,         // false until OTP verified
  resetToken:      String,          // crypto token for password reset
  resetTokenExpiry:Date,
  wishlistHomes:   [ObjectId → Home] // populated on demand
}
```

### `Home` Schema
```js
{
  homeName:    String (required),
  price:       Number (required),
  location:    String (required),
  rating:      Number (required),
  photoUrl:    String,             // path like /uploads/filename.jpg
  description: String,
  host:        ObjectId → User     // the host who created this listing
}
```

---

## 🛡️ Security

| Concern | Implementation |
|---|---|
| Password storage | `bcryptjs` with 12 salt rounds |
| Session management | `express-session` + `connect-mongo` |
| Email Service | Real transactional email with `Resend` |
| OTP expiry | 5-minute window, cleared after use |
| Reset tokens | `crypto.randomBytes(32)` with 5-minute expiry |
| Route protection | Backend middleware guards & React Router Context checks |
| File upload safety | MIME type enforcement |
| Input validation | `express-validator` on API endpoints |

---

<div align="center">

Made with ❤️ using **MERN Stack** (MongoDB, Express, React, Node)

</div>
