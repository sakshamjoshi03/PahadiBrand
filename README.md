# PahadiBrand

An AI-powered branding assistant designed for rural food producers.

## 🔗 Live Deployments
* **Frontend Application:** [https://pahadibrand.vercel.app/dashboard](https://pahadibrand.vercel.app/dashboard)
* **Backend API Service:** [https://pahadibrand.onrender.com/](https://pahadibrand.onrender.com/)

---

## 📝 Project Overview
PahadiBrand helps local and rural food-processing businesses generate brand names, product descriptions, packaging content, competitor insights, social media posts, and brand stories using advanced Gemini AI models.

---

## 🛠️ Tech Stack

### Frontend
* **Core:** React 19 (built with Vite)
* **Routing:** React Router DOM (v6)
* **Styling:** Vanilla CSS, React Icons, Lucide React
* **Animations:** Framer Motion
* **HTTP Client:** Axios

### Backend & Database
* **Runtime Environment:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose ODM
* **Authentication:** JSON Web Tokens (JWT), Passport.js (Google OAuth 2.0)
* **AI Integration:** Google Gemini API (`@google/genai`)
* **Security & Middleware:** bcryptjs, CORS, Express Rate Limit, Express Session, Express Validator, Nodemon (Development)

---

## 🚀 Running the Project Locally

### 1. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory and populate it:
   ```env
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   JWT_EXPIRE=7d
   GOOGLE_CLIENT_ID=<your_google_client_id>
   GOOGLE_CLIENT_SECRET=<your-google-client-secret>
   GEMINI_API_KEY=<your_gemini_api_key>
   ```
4. Start the backend server:
   * **Development Mode:** `npm run dev`
   * **Production Mode:** `npm start`

### 2. Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Frontend` directory (optional - defaults to `http://localhost:5000`):
   ```env
   VITE_API_URL=<your_backend_api_url>
   ```
4. Start the frontend application:
   ```bash
   npm run dev
   ```