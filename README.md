# kenbnb 🏠

A full-stack Airbnb clone built with React, Node.js, Express, Prisma, and PostgreSQL — designed as a portfolio project to demonstrate end-to-end web development skills.

🔗 **Live Demo:** [kenbnb.vercel.app](https://kenbnb.vercel.app)  
💻 **Backend:** [kenbnb-server.onrender.com](https://kenbnb-server.onrender.com)  
👤 **Portfolio:** [your-portfolio-url.com](https://my-portfolio-six-jet-80.vercel.app/)

---

## Features

**Core**
- 🔍 Real-time search and filtering by location, price range, and property category
- 🏡 Individual listing detail pages with full property info
- 📅 Complete booking flow with check-in/check-out date selection and total price calculation
- 🔐 JWT authentication — register, login, and protected routes
- 📱 Responsive design across mobile, tablet, and desktop

**Technical highlights**
- Server-side filtering with dynamic Prisma queries
- Date overlap detection to prevent double bookings
- JWT middleware protecting booking endpoints
- Category-based filtering via hero icon carousel
- Persistent auth state via localStorage

---

## Tech Stack

**Frontend**
- React 18 + React Router v6
- Vite
- Vanilla CSS with responsive design

**Backend**
- Node.js + Express
- Prisma ORM (v6)
- PostgreSQL

**Deployment**
- Frontend → Vercel
- Backend → Render
- Database → Render PostgreSQL

---

## Architecture
kenbnb/
├── src/                  # React frontend
│   ├── components/       # Navbar, Card, Hero, ListingDetail, Auth
│   ├── App.jsx           # Routes and global state
│   └── config.js         # API URL config (local vs production)
├── server/               # Express backend
│   ├── routes/           # auth.js
│   ├── middleware/        # auth.js (JWT verification)
│   ├── prisma/           # schema, migrations, seed
│   └── index.js          # Express app + API routes
---

## Technical Callouts

### Server-side filtering
All filtering happens on the backend with dynamic Prisma `where` clauses — not client-side array filtering. This keeps the frontend lightweight and mirrors how production apps handle search.

```js
const where = {}
if (location) where.location = { contains: location, mode: 'insensitive' }
if (minPrice) where.price = { ...where.price, gte: parseFloat(minPrice) }
if (maxPrice) where.price = { ...where.price, lte: parseFloat(maxPrice) }
if (category) where.category = { equals: category, mode: 'insensitive' }
```

### Date overlap detection
Bookings are validated server-side to prevent double bookings using date range intersection logic:

```js
const existingBooking = await prisma.booking.findFirst({
  where: {
    listingId,
    OR: [{ checkIn: { lte: checkOut }, checkOut: { gte: checkIn } }]
  }
})
if (existingBooking) return res.status(409).json({ error: 'Those dates are already booked' })
```

### JWT protected routes
A middleware function verifies the JWT token on every protected request:

```js
const decoded = jwt.verify(token, process.env.JWT_SECRET)
req.user = decoded
next()
```

---

## Getting Started Locally

### Prerequisites
- Node.js 18+
- MySQL or PostgreSQL

### Installation

1. Clone the repo
\`\`\`bash
git clone https://github.com/nadielotiene/kenbnb.git
cd kenbnb
\`\`\`

2. Install frontend dependencies
\`\`\`bash
npm install
\`\`\`

3. Install backend dependencies
\`\`\`bash
cd server
npm install
\`\`\`

4. Set up environment variables
\`\`\`bash
# server/.env
DATABASE_URL="postgresql://user:password@localhost:5432/kenbnb"
JWT_SECRET="your-secret-key"
\`\`\`

5. Run migrations and seed
\`\`\`bash
cd server
npx prisma migrate dev
npx prisma db seed
\`\`\`

6. Start the backend
\`\`\`bash
node index.js
\`\`\`

7. Start the frontend
\`\`\`bash
# From root folder
npm run dev
\`\`\`

---

## Screenshots

| Home | Listing Detail | Booking |
|---|---|---|
| ![Home](screenshots/home.png) | ![Detail](screenshots/detail.png) | ![Login](screenshots/login.png) |

---

## Author

**Kenny** — Full Stack Developer  
[Portfolio](https://my-portfolio-six-jet-80.vercel.app/) · [GitHub](https://github.com/nadielotiene) · [LinkedIn](https://www.linkedin.com/in/kenneth-velazquez-dev/)