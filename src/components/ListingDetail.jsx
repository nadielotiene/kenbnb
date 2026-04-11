import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function ListingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`http://localhost:3001/api/listings/${id}`)
    .then(res => res.json())
    .then(data => {
      setListing(data)
      setLoading(false)
    })
  }, [id])

  if (loading) return <div className="detail-loading">Loading...</div>


  return (
    <div className="detail-container">
      <button className="detail-back" onClick={() => navigate('/')}>← Back</button>

      <h1 className="detail-title">{listing.tile}</h1>
      <p className="detail-location">📍 {listing.location}</p>

      <img 
        className="detail-photo" 
        src={listing.imageUrl} 
        alt={listing.title} 
      />

      <div className="detail-info">
        <div className="detail-main">
          <p className="detail-rating">★ {listing.rating} · {listing.isSuperhost ? '🏆 Superhost' : 'Host'}</p>
          <p className="detail-dates">Available: {listing.startDate} - {listing.endDate}</p>
          <a className="detail-map" href={listing.googleMapsUrl} target="_blank">
            View on Google Maps
          </a>
        </div>

        <div className="detail-booking">
          <p className="detail-price"><span>${listing.price}</span> / night</p>
          <button className="detail-reserve">Reserve</button>
        </div>
      </div>
    </div>
  )
}