import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function ListingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [bookingStatus, setBookingStatus] = useState(null)

  useEffect(() => {
    fetch(`http://localhost:3001/api/listings/${id}`)
    .then(res => res.json())
    .then(data => {
      setListing(data)
      setLoading(false)
    })
  }, [id])

  function calculateTotal() {
    if (!checkIn || !checkOut) return 0
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    return nights > 0 ? nights * listing.price : 0
  }

  async function handleBooking() {
    const totalPrice = calculateTotal()
    if (!checkIn || !checkOut || totalPrice <= 0) {
      setBookingStatus('error')
      return
    }

    try {
      const res = await fetch('http://localhost:3001/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: parseInt(id),
          checkIn,
          checkOut,
          guests,
          totalPrice
        })
      })

      const data = await res.json()

      if (res.status === 409) {
        setBookingStatus('conflict')
      } else if (res.ok) {
        setBookingStatus('success')
      } else {
        setBookingStatus('error')
      }
    } catch (error) {
      setBookingStatus('error')
    }
  }

  if (loading) return <div className="detail-loading">Loading...</div>

  return (
    <div className="detail-container">
      <button className="detail-back" onClick={() => navigate('/')}>← Back</button>
      <h1 className="detail-title">{listing.title}</h1>
      <p className="detail-location">
        <img src="/red-pin.svg" alt="red pin" />
        {listing.location}
      </p>
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

          <div className="booking-inputs">
            <div className="booking-field">
              <label>Check in</label>
              <input 
                type="date"
                value={checkIn}
                onChange={e => {
                  setCheckIn(e.target.value)
                  setBookingStatus(null)
                }} 
              />
            </div>

            <div className="booking-field">
              <label>Check out</label>
              <input 
                type="date"
                value={checkOut}
                onChange={e => {
                  setCheckOut(e.target.value)
                  setBookingStatus(null)
                }} 
              />
            </div>

            <div className="booking-field">
              <label>Guests</label>
              <input 
                type="number"
                min="1"
                max="16"
                value={guests}
                onChange={e => setGuests(parseInt(e.target.value))} 
              />
            </div>
          </div>

          {calculateTotal() > 0 && (
            <p className="booking-total">Total: <span>${calculateTotal()}</span></p>
          )}

          {bookingStatus === 'success' && <p className="booking-success">Booking confirmed!</p>}
          {bookingStatus === 'conflict' && <p className="booking-error">Those dates are already booked!</p>}
          {bookingStatus === 'error' && <p className="booking-error">Please select valid dates.</p>}

          <button className="detail-reserve" onClick={handleBooking}>Reserve</button>
        </div>
      </div>
    </div>
  )
}