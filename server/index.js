import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/listings', async (req, res) => {
  try {
		const listings = await prisma.listing.findMany();
		res.json(listings);
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong '});
	}
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
})