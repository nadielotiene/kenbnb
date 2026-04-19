import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.listing.deleteMany()

  await prisma.listing.createMany({
    data: [
      {
        title: "Cozy Beach House",
        location: "Malibu, California",
        price: 237,
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800",
        startDate: "Jan 13", endDate: "20",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: true, category: "Beachfront"
      },
      {
        title: "Mountain Cabin Retreat",
        location: "Aspen, Colorado",
        price: 188,
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800",
        startDate: "Feb 5", endDate: "12",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: false, category: "Cabins"
      },
      {
        title: "Downtown Loft",
        location: "New York, NY",
        price: 312,
        rating: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800",
        startDate: "Mar 1", endDate: "7",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: true, category: "Rooms"
      },
      {
        title: "Lakefront Cottage",
        location: "Lake Tahoe, Nevada",
        price: 156,
        rating: 4.6,
        imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
        startDate: "Apr 10", endDate: "17",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: false, category: "Lakefront"
      },
      {
        title: "Tropical Villa",
        location: "Miami, Florida",
        price: 275,
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
        startDate: "May 20", endDate: "27",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: true, category: "Mansions"
      },
      {
        title: "Treehouse Escape",
        location: "Portland, Oregon",
        price: 195,
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
        startDate: "Jun 1", endDate: "8",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: true, category: "Treehouses"
      },
      {
        title: "Countryside Farmhouse",
        location: "Tuscany, Italy",
        price: 220,
        rating: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800",
        startDate: "Jul 5", endDate: "12",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: false, category: "Countryside"
      },
      {
        title: "Medieval Castle Stay",
        location: "Edinburgh, Scotland",
        price: 450,
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?w=800",
        startDate: "Aug 1", endDate: "8",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: true, category: "Castles"
      },
      {
        title: "Luxury Igloo",
        location: "Lapland, Finland",
        price: 380,
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1520769945061-0a448c463865?w=800",
        startDate: "Dec 1", endDate: "8",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: true, category: "Igloos"
      },
      {
        title: "Houseboat Adventure",
        location: "Amsterdam, Netherlands",
        price: 175,
        rating: 4.6,
        imageUrl: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800",
        startDate: "Sep 10", endDate: "17",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: false, category: "Boats"
      },
      {
        title: "Desert Camping Dome",
        location: "Sedona, Arizona",
        price: 145,
        rating: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800",
        startDate: "Oct 5", endDate: "10",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: false, category: "Camping"
      },
      {
        title: "Infinity Pool Villa",
        location: "Bali, Indonesia",
        price: 320,
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800",
        startDate: "Nov 1", endDate: "8",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: true, category: "Pools"
      },
      {
        title: "OMG Cliffside Suite",
        location: "Santorini, Greece",
        price: 520,
        rating: 5.0,
        imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
        startDate: "Jun 15", endDate: "22",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: true, category: "OMG!"
      },
      {
        title: "Grand Beachfront Mansion",
        location: "Hamptons, New York",
        price: 890,
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800",
        startDate: "Jul 20", endDate: "27",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: true, category: "Mansions"
      },
      {
        title: "Trending City Apartment",
        location: "Barcelona, Spain",
        price: 165,
        rating: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800",
        startDate: "Aug 10", endDate: "17",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: false, category: "Trending"
      },
      {
        title: "Secluded Lake Cabin",
        location: "Minnesota, USA",
        price: 132,
        rating: 4.5,
        imageUrl: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800",
        startDate: "Sep 1", endDate: "8",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: false, category: "Lakefront"
      },
      {
        title: "Pacific Ocean Treehouse",
        location: "Big Sur, California",
        price: 285,
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?w=800",
        startDate: "Oct 15", endDate: "22",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: true, category: "Treehouses"
      },
      {
        title: "Scottish Highlands Cabin",
        location: "Inverness, Scotland",
        price: 142,
        rating: 4.6,
        imageUrl: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?w=800",
        startDate: "Nov 10", endDate: "17",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: false, category: "Cabins"
      },
      {
        title: "Tokyo City Room",
        location: "Tokyo, Japan",
        price: 98,
        rating: 4.6,
        imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
        startDate: "Dec 10", endDate: "17",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: false, category: "Rooms"
      },
      {
        title: "Amalfi Coast Villa",
        location: "Positano, Italy",
        price: 410,
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?w=800",
        startDate: "Jun 20", endDate: "27",
        googleMapsUrl: "https://maps.google.com",
        isSuperhost: true, category: "Beachfront"
      },
    ]
  })
  console.log('✅ Database seeded with 20 listings!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
  