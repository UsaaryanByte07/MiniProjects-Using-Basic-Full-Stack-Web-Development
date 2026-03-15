<div align="center">

# 🏠 Airbnb Clone

### *A full-stack property rental platform built with Node.js, Express & MongoDB*

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)
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

**🔐 Authentication**
- Email + Password Signup
- OTP-based email verification
- Secure login with bcrypt hashing
- Forgot & reset password via email link
- Persistent sessions (15-day cookies)

</td>
<td>

**🏡 Host Portal**
- Add new property listings
- Upload property photos
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
- Customer-only protected routes

</td>
<td>

**🛡️ Security & UX**
- Role-based route guards
- Flash messages for feedback
- Server-side form validation
- Email notifications (Nodemailer)
- File type enforcement on uploads

</td>
</tr>
</table>

---

## 🏗️ Project Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        Client (Browser)                       │
│                       EJS + Tailwind CSS                      │
└────────────────────────────┬─────────────────────────────────┘
                             │  HTTP Requests
┌────────────────────────────▼─────────────────────────────────┐
│                      Express App (App.js)                      │
│  ┌──────────────┐  ┌────────────┐  ┌────────────────────────┐ │
│  │ Middleware   │  │  Session   │  │   Route Guards         │ │
│  │ body-parser  │  │ connect-   │  │ /host  → host only     │ │
│  │ multer       │  │ mongo      │  │ /homes → customer only │ │
│  │ connect-flash│  │            │  │ /login → logged-out    │ │
│  └──────────────┘  └────────────┘  └────────────────────────┘ │
├──────────────────────────────────────────────────────────────┤
│                           Routers                             │
│   authRouter  │  storeRouter  │  hostRouter  │  legalRouter  │
├──────────────────────────────────────────────────────────────┤
│                         Controllers                           │
│  signupCtrl │ loginCtrl │ hostCtrl │ storeCtrl │ otpCtrl     │
├──────────────────────────────────────────────────────────────┤
│                     Utilities / Services                      │
│  email-util │ photo-storage-util │ validator-util │ db-util  │
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
├── App.js                    # 🚀 App entry point — middleware, routes, DB connect
│
├── controllers/
│   ├── auth/
│   │   ├── signupController.js       # Signup + OTP generation + email send
│   │   ├── loginController.js        # Login/logout logic
│   │   ├── verifyOtpController.js    # OTP verification
│   │   └── forgetPasswordController.js # Forgot/reset password
│   ├── hostController.js             # Add, edit, delete home listings
│   ├── storeController.js            # Browse homes, wishlist, home details
│   └── legalController.js            # Legal pages
│
├── routers/
│   ├── authRouter.js         # /login, /signup, /verify-otp, /forgot-password
│   ├── hostRouter.js         # /host/add-home, /host/edit-home, /host/host-homes
│   ├── storeRouter.js        # /, /homes, /homes/:id, /wishlist
│   ├── legalRouter.js        # Legal pages
│   └── notFoundRouter.js     # 404 catch-all
│
├── models/
│   ├── User.js               # User schema (auth + wishlist)
│   └── Home.js               # Home listing schema
│
├── views/                    # EJS templates
│   ├── auth/                 # signup, login, verify-otp, forgot/reset password
│   ├── store/                # index, homes, home-details, wishlist
│   ├── host/                 # host-homes, edit-or-add-home, home-added
│   ├── partials/             # navbar, head, shared components
│   ├── legal/                # terms, privacy
│   └── error/                # 404 page
│
├── utils/
│   ├── db-util.js            # MongoDB connection URL
│   ├── email-util.js         # Nodemailer transporter
│   ├── photo-storage-util.js # Multer storage + file filter
│   ├── session-util.js       # connect-mongo session store
│   ├── path-util.js          # Root directory helper
│   └── validator-util.js     # express-validator validators
│
├── public/                   # Static assets (CSS, JS, images, PDF rules)
└── uploads/                  # Uploaded property photos (auto-created)
```

---

## ⚙️ How It Works

### 1. Application Bootstrap (`App.js`)
The app starts by connecting to MongoDB, then:
- Serves static files from `/public` and `/uploads`
- Applies `body-parser` for form data and `multer` for file uploads
- Sets up `express-session` backed by MongoDB (`connect-mongo`) for persistent 15-day sessions
- Registers route guards as middleware *before* the routers
- Mounts all routers

### 2. Role-Based Route Guards
Before any protected route is reached, inline middleware in `App.js` enforces access:

| Route | Rule |
|---|---|
| `/host/*` | Must be logged in **and** be a `host` |
| `/homes/*` | Must be logged in **and** be a `customer` |
| `/wishlist/*` | Must be logged in **and** be a `customer` |
| `/login`, `/signup` | Must **not** be logged in (redirects away if already logged in) |

### 3. Request Flow Example (Adding a Home)
```
Browser  →  POST /host/add-home
          →  Route guard: isLoggedIn && userType === 'host'? ✅
          →  hostRouter → postAddHome controller
          →  Multer processes uploaded photo → saves to /uploads/
          →  New Home document saved to MongoDB (with host's userId)
          →  res.render("host/home-added")
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v16+ and **npm**
- A running **MongoDB** instance (local or MongoDB Atlas)
- A **Gmail account** with an [App Password](https://myaccount.google.com/apppasswords) for sending emails

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd airbnb

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env  # or create .env manually (see below)

# 4. Start the development server
npm run dev
# or
node App.js
```

The server starts at **http://localhost:3010**

---

## 🔧 Environment Variables

Create a `.env` file in the project root:

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/airbnb
# or MongoDB Atlas:
# MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/airbnb

# Session
SESSION_SECRET_KEY=your_super_secret_key_here

# Email (Gmail + App Password)
EMAIL=youremail@gmail.com
GOOGLE_APP_PASSWORD=your_16_char_app_password
```

> **⚠️ Gmail Setup:** You must enable 2FA on your Google account and generate an **App Password** (not your normal Gmail password) for Nodemailer to work.

---

## 🛣️ API Routes

### Auth Routes (`/`)
| Method | Path | Description | Access |
|---|---|---|---|
| `GET` | `/signup` | Signup page | Guest only |
| `POST` | `/signup` | Register new user → sends OTP | Guest only |
| `GET` | `/verify-otp?email=` | OTP verification page | Guest only |
| `POST` | `/verify-otp` | Verify OTP → activate account | Guest only |
| `GET` | `/login` | Login page | Guest only |
| `POST` | `/login` | Authenticate user | Guest only |
| `POST` | `/logout` | Destroy session | Logged in |
| `GET` | `/forgot-password` | Forgot password page | Public |
| `POST` | `/forgot-password` | Send reset email | Public |
| `GET` | `/reset-password?token=&email=` | Reset password page | Public |
| `POST` | `/reset-password` | Update password | Public |

### Store Routes (Customer)
| Method | Path | Description | Access |
|---|---|---|---|
| `GET` | `/` | Landing page | Public |
| `GET` | `/homes` | Browse all listings | Customer |
| `GET` | `/homes/:homeId` | View home details | Customer |
| `GET` | `/wishlist` | View wishlist | Customer |
| `POST` | `/wishlist/add` | Add home to wishlist | Customer |
| `POST` | `/wishlist/remove` | Remove from wishlist | Customer |
| `GET` | `/rules/:homeId` | Download House Rules PDF | Logged in |

### Host Routes (`/host/`)
| Method | Path | Description | Access |
|---|---|---|---|
| `GET` | `/host/host-homes` | Host dashboard | Host |
| `GET` | `/host/add-home` | Add home form | Host |
| `POST` | `/host/add-home` | Create new listing | Host |
| `GET` | `/host/edit-home/:homeId?isEditing=true` | Edit home form | Host |
| `POST` | `/host/edit-home` | Save edits | Host |
| `POST` | `/host/delete-home/:homeId` | Delete listing | Host |

---

## 🔐 Authentication Flow

```
┌─────────────┐     ┌────────────────┐     ┌──────────────────┐
│   Signup    │────▶│  Save to DB    │────▶│  Send OTP Email  │
│  (POST)     │     │ (unverified)   │     │  (Nodemailer)    │
└─────────────┘     └────────────────┘     └──────────────────┘
                                                    │
                                           ┌────────▼─────────┐
                                           │  User enters OTP │
                                           │  (5 min expiry)  │
                                           └────────┬─────────┘
                                                    │ OTP match?
                                           ┌────────▼─────────┐
                                           │  isVerified=true │
                                           │  → Redirect Login│
                                           └──────────────────┘
```

**Password Reset Flow:**
```
Forgot Password → Email → Crypto token (5 min) → Reset link → New password hashed with bcrypt
```

---

## 🏡 Host Features

After logging in as a **host**, navigate to `/host/host-homes`:

1. **Add a Home** — Fill in name, price, location, rating, description, and upload a photo (`JPG/PNG` only). The photo is stored in the `/uploads/` directory and served statically.

2. **Edit a Home** — Click Edit on any listing. If you upload a new photo, the old one is **automatically deleted from disk**.

3. **Delete a Home** — Removes the MongoDB document **and** deletes the associated photo from disk.

---

## 🛒 Customer Features

After logging in as a **customer**, navigate to `/homes`:

1. **Browse Homes** — See all listings with photo, name, location, rating, and price.
2. **Home Details** — Click any listing to see the full description and booking info.
3. **Wishlist** — Add/remove homes to your personal wishlist. A heart icon shows which homes are already saved.
4. **House Rules PDF** — Download the property rules PDF directly from the home details page.

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
| Session management | `express-session` + `connect-mongo` (server-side) |
| OTP expiry | 5-minute window, cleared after use |
| Reset tokens | `crypto.randomBytes(32)` with 5-minute expiry |
| Route protection | Inline middleware before router mounts |
| File upload safety | MIME type enforcement (JPG / JPEG / PNG only) |
| Input validation | `express-validator` on all POST forms |
| Host data isolation | All home queries include `host: userId` filter |

---

## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `express` | Web framework |
| `mongoose` | MongoDB ODM |
| `express-session` | Session management |
| `connect-mongo` | Persist sessions in MongoDB |
| `bcryptjs` | Password hashing |
| `nodemailer` | Sending emails (OTP/reset) |
| `multer` | File upload handling |
| `connect-flash` | Temporary session messages |
| `express-validator` | Form validation |
| `ejs` | Server-side templating |
| `dotenv` | Environment variable loading |
| `nodemon` | Dev server auto-restart |

---

<div align="center">

Made with ❤️ using **Node.js**, **Express**, **MongoDB** & **EJS**

</div>
