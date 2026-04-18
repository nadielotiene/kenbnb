import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'
dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes)

app.get('/api/listings', async (req, res) => {
  try {
		const { location, minPrice, maxPrice } = req.query

		const listings = await prisma.listing.findMany({
			where: {
				...(location && {
					location: {
						contains: location,
					}
				}),
				...(minPrice && { price: { gte: parseFloat(minPrice) } }),
				...(maxPrice && { price: { lte: parseFloat(maxPrice) } }),
			}
		});

		res.json(listings);
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong '});
	}
})

app.get('/api/listings/:id', async (req, res) => {
	try {
		const listing = await prisma.listing.findUnique({
			where: { id: parseInt(req.params.id) }
		})
		if (!listing) return res.status(404).json({ error: 'Listing not found' })
		res.json(listing)
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong' })
	}
})

app.post('/api/bookings', async (req, res) => {
	try {
		const { listingId, checkIn, checkOut, guests, totalPrice } = req.body

		// Check for date overlap
		const existingBooking = await prisma.booking.findFirst({
			where: {
				listingId,
				OR: [
					{ checkIn: { lte: checkOut}, checkOut: {gte: checkIn} }
				]
			}
		})
		if (existingBooking) {
			return res.status(409).json({ error: 'Those dates area already booked' })
		}

		const booking = await prisma.booking.create({
			data: { listingId, checkIn, checkOut, guests, totalPrice }
		})

		res.status(201).json(booking)
	} catch (error) {
		res.status(500).json({error: 'Something went wrong' })
	}
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
})