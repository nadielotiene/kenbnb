# kenbnb 🏠

A full-stack Airbnb clone built with React, Node.js, Express, Prisma, and MySQL.

🔗 **Live Demo:** [kenbnb.vercel.app](https://kenbnb.vercel.app)

## Features

- 🔍 Real-time search and filtering by location and price (server-side)
- 🏡 Listing detail pages with full booking flow
- 📅 Date overlap detection to prevent double bookings
- 🔐 JWT authentication with protected routes
- 📱 Responsive design across mobile, tablet, and desktop

## Tech Stack

**Frontend**
- React 18
- React Router v6
- Vite

**Backend**
- Node.js
- Express
- Prisma ORM
- MySQL

**Deployment**
- Frontend: Vercel
- Backend: Render

## Getting Started

### Prerequisites
- Node.js 18+
- MySQL

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
DATABASE_URL="mysql://root@localhost:3306/kenbnb"
JWT_SECRET="your-secret-key"
\`\`\`

5. Run database migrations and seed
\`\`\`bash
cd server
./node_modules/.bin/prisma migrate dev
./node_modules/.bin/prisma db seed
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

## Technical Highlights

### Server-side filtering
Listings are filtered on the backend using dynamic Prisma queries, keeping the frontend lightweight and scalable.

### Date overlap detection
Bookings are validated server-side to prevent double bookings using date range intersection logic — the same approach used in production booking systems.

### JWT Authentication
Protected routes use middleware that validates JWT tokens on every request, ensuring only authenticated users can make bookings.

## Screenshots

*Coming soon*

## Author

Kenny — [GitHub](https://github.com/nadielotiene)