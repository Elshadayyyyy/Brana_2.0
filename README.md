# Brana

## Overview
This platform solves two key problems faced by Ethiopian Orthodox believers:

1. **Lack of access to books**: Spiritual books are often expensive or unavailable. This platform offers affordable digital versions of those books while protecting the rights of authors.
2. **Low engagement with long spiritual videos**: The integrated AI chatbot makes spiritual learning interactive by answering questions instantly, eliminating the need to watch lengthy videos.

---

## Features

-  EPUB Book Upload & Reading (in-browser)
-  Digital purchases with Telebirr
-  AI-powered chatbot for spiritual questions
- Auth with JWT, author-only upload access
-  Multilingual UI (Amharic & English)

---

## Technologies Used

| Stack      | Tools                     |
|------------|---------------------------|
| Frontend   | React, Axios, Bootstrap   |
| Backend    | Node.js, Express          |
| Database   | MongoDB + Mongoose        |
| Auth       | JWT, bcrypt               |
| File Upload| Multer                    |
| Payments   | Telebirr(mock)            |
| EPUB Reader| epub.js / epubjs-render   |
| Chatbot    | ADDIS API |

---

## Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/Elshadayyyyy/Branaa.git
cd NEW FOLDER(2)
   Install server dependencies
    ```bash
cd server
npm install
Install client dependencies
bash
cd ../client
npm install
Set environment variables

Create a .env file in server/:

env
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
Run development servers

Backend: npm run dev (from /server)

Frontend: npm start (from /client)




# developed by
Elshaday Alem

