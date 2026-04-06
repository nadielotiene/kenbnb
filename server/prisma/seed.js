import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.listing.createMany({
    data: [
      {
        title: "Cozy Beach House",
        location: "Malibu, California",
        price: 237,
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
        startDate: "Jan 13",
        endDate: "20",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: true,
      },
      {
        title: "Mountain Cabin Retreat",
        location: "Aspen, Colorado",
        price: 188,
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800",
        startDate: "Feb 5",
        endDate: "12",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: false,
      },
      {
        title: "Downtown Loft",
        location: "New York, NY",
        price: 312,
        rating: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
        startDate: "Mar 1",
        endDate: "7",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: true,
      },
      {
        title: "Lakefront Cottage",
        location: "Lake Tahoe, Nevada",
        price: 156,
        rating: 4.6,
        imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
        startDate: "Apr 10",
        endDate: "17",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: false,
      },
      {
        title: "Tropical Villa",
        location: "Miami, Florida",
        price: 275,
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1505916349660-8d91a99f28b4?w=800",
        startDate: "May 20",
        endDate: "27",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: true,
      },
    ]
  })
  console.log('✅ Database seeded!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())