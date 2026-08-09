
A full-stack MERN e-commerce platform focused on authentic Himalayan products, featuring product management, authentication, shopping cart functionality, and an AI-powered assistant.

---

## 2. Live Demo

🌐 **Frontend:**  
https://pahadibrand.vercel.app/

⚙️ **Backend API:**  
https://pahadibrand.onrender.com/

---

## 3. Demo Video

🎥 **Demo Video:**  
[https://youtu.be/GXRXzxK_Zi0?si=x2GrZpguoDgk4F4r]

---

## 4. Screenshots

### Home Page

![Home Page](screenshots/home.png)

### Product Details

![Product Details](screenshots/product-details.png)

### Dashboard

![Dashboard](screenshots/dashboard.png)


## 5. Features

- 🏔️ **Himalayan Product Marketplace**
  - Browse authentic products from the Himalayan region.
  - Product categories including beverages, pulses, grains, and wellness products.

- 🛍️ **Product Management**
  - View detailed product information.
  - Product pricing, stock, ratings, descriptions, and images.
  - Related product recommendations.
  - Product search functionality.

- 🛒 **Shopping Cart**
  - Add products to cart.
  - Manage product quantities.
  - Remove products from cart.

- 🔐 **User Authentication**
  - User registration and login.
  - JWT-based authentication.
  - Google OAuth authentication.
  - Protected routes for authenticated users.

- 👤 **User Management**
  - User profile information.
  - User roles and authentication status.

- 📊 **Admin Dashboard**
  - Product management.
  - Product statistics.
  - Stock and category information.

- 🤖 **AI Assistant**
  - AI-powered assistant for Himalayan product-related queries.
  - Provides product recommendations and information.
  - Integrated with Google's Gemini AI.

- 🌓 **Dark / Light Mode**
  - Toggle between light and dark themes.

- 📱 **Responsive UI**
  - Designed to work across desktop, tablet, and mobile screen sizes.

- ⚡ **REST API**
  - Backend APIs built using Express.js and Node.js.
  - MongoDB used for persistent data storage.

---

## 6. Tech Stack

### Frontend

- React.js
- JavaScript
- React Router
- Axios
- Vite
- Framer Motion
- Lucide React
- React Icons
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- Passport.js
- JWT
- Google OAuth 2.0
- Express Validator
- Express Rate Limit
- CORS

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### AI

- Google Gemini AI
- `@google/genai`

### Deployment

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas
- **Source Code:** GitHub

---

## 7. Setup Instructions

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git
- MongoDB Atlas account

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/sakshamjoshi03/PahadiBrand.git
````

```bash
cd PahadiBrand
```

---

### Step 2: Backend Setup

Navigate to the backend:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `Backend` directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:

```bash
npm start
```

For development:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

### Step 3: Frontend Setup

Open a new terminal and navigate to:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

### Environment Variables

#### Backend

| Variable               | Purpose                         |
| ---------------------- | ------------------------------- |
| `PORT`                 | Backend server port             |
| `MONGO_URI`            | MongoDB Atlas connection string |
| `JWT_SECRET`           | JWT authentication secret       |
| `JWT_EXPIRE`           | JWT expiration duration         |
| `GOOGLE_CLIENT_ID`     | Google OAuth client ID          |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret      |
| `GEMINI_API_KEY`       | Gemini AI API key               |

#### Frontend

| Variable       | Purpose              |
| -------------- | -------------------- |
| `VITE_API_URL` | Backend API base URL |

> Never commit `.env` files or API keys to GitHub.

---

## 8. API Documentation

### Base URL

Production:

```text
https://pahadibrand.onrender.com
```

Local:

```text
http://localhost:5000
```

---

### Product APIs

#### Get All Products

```http
GET /api/products
```

Example:

```text
GET https://pahadibrand.onrender.com/api/products
```

Example response:

```json
{
  "success": true,
  "count": 6,
  "data": [
    {
      "_id": "product_id",
      "name": "Buransh Juice",
      "description": "Refreshing Himalayan Rhododendron juice",
      "category": "Beverages",
      "price": 249,
      "stock": 50,
      "rating": 4.5
    }
  ]
}
```

---

### Get Product by ID

```http
GET /api/products/:id
```

Example:

```text
GET /api/products/product_id
```

---

### Create Product

```http
POST /api/products
```

Example request body:

```json
{
  "name": "Buransh Juice",
  "description": "Refreshing Himalayan Rhododendron juice",
  "category": "Beverages",
  "price": 249,
  "stock": 50,
  "rating": 4.5
}
```

---

### Update Product

```http
PUT /api/products/:id
```

Example request body:

```json
{
  "price": 299,
  "stock": 40
}
```

---

### Delete Product

```http
DELETE /api/products/:id
```

---

### Search Products

```http
GET /api/products/search?q=keyword
```

Example:

```text
GET /api/products/search?q=honey
```

---

### Related Products

```http
GET /api/products/related/:category/:id
```

Example:

```text
GET /api/products/related/Beverages/product_id
```

---

### Authentication

Authentication APIs are available under:

```text
/api/auth
```

The application supports:

* User authentication
* JWT authentication
* Google OAuth authentication
* Protected routes

---

### AI API

AI functionality is available under:

```text
/api/ai
```

The AI assistant uses Google Gemini to process user queries and provide responses related to the application and Himalayan products.

---

## 9. Architecture / Folder Structure

```text
PahadiBrand/
│
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── middleware/
│   ├── models/
│   ├── prompts/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── ...
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── README.md
```

### Application Architecture

```text
                  ┌───────────────────┐
                  │      React        │
                  │     Frontend      │
                  └─────────┬─────────┘
                            │
                         Axios
                            │
                            ▼
                  ┌───────────────────┐
                  │    Express.js     │
                  │      REST API     │
                  └──────┬─────┬──────┘
                         │     │
             ┌───────────┘     └────────────┐
             ▼                              ▼
      ┌──────────────┐              ┌──────────────┐
      │   MongoDB    │              │ Gemini AI    │
      │   Database   │              │   Service    │
      └──────────────┘              └──────────────┘
```

---

## 10. Known Limitations

* The project currently uses free-tier deployment services.
* Render's free tier may experience cold starts after periods of inactivity.
* AI functionality depends on the availability and usage limits of the Gemini API.
* MongoDB Atlas free-tier resources have limited storage and performance.
* The application is primarily developed as an internship project and may require further optimization for large-scale production use.
* Payment gateway integration is not currently implemented.
* Order management and real-time order tracking can be extended in future versions.
* Image hosting and optimization can be further improved for production-scale usage.
* Some advanced e-commerce features can be added in future iterations.

---

## 11. Credits & Acknowledgements

### Development

Developed by:

**Saksham Joshi**

Graphic Era University (GEU)

---

### Technologies & Services

* React.js
* Node.js
* Express.js
* MongoDB Atlas
* Google Gemini AI
* Vercel
* Render
* GitHub

### AI Tools

AI-assisted development and debugging were used during the development process for:

* Code suggestions
* Debugging
* Documentation
* UI improvements
* Development assistance

### References

Documentation and learning resources from the official documentation of the technologies used in this project were referred to during development.

---

## Project Links

🌐 **Live Website:**
[https://pahadibrand.vercel.app/](https://pahadibrand.vercel.app/)

⚙️ **Backend:**
[https://pahadibrand.onrender.com/](https://pahadibrand.onrender.com/)

💻 **GitHub:**
[https://github.com/sakshamjoshi03/PahadiBrand](https://github.com/sakshamjoshi03/PahadiBrand)

🎥 **Demo Video:**
[Add video link here]

---

### Made with ❤️ for PahadiBrand

````

### Before you push it

Create this folder in your **repository root**:

```text
PahadiBrand/
├── Backend/
├── Frontend/
├── screenshots/
│   ├── home.png
│   ├── product-details.png
│   ├── dashboard.png
│   └── ai-assistant.png
└── README.md
````
