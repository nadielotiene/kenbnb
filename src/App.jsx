// import React from "react"
import './style.css'
import iconData from "./iconData"
import data from "./data"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Card from "./components/Card"
import Footer from "./components/Footer"
import { useState } from 'react'

export default function App() {
  const [heart, setHeart] = useState(
    data.map(place => ({ id: place.id, isFavorite: false }))
  )

  function toggleFavorite(id) {
    setHeart(prevState =>
      prevState.map(item =>
        item.id === id
          ? { ...item, isFavorite: !item.isFavorite } : item
      )
    )
  }

  const cards = data.map(place => {
    const heartState = heart.find(item => item.id === place.id)
    const heartIcon = heartState?.isFavorite ? "heart-full.png" : "heart-empty.png"
    return (
      <Card
        key={place.id}
        {...place}
        toggleClick={() => toggleFavorite(place.id)}
        heartIcon={heartIcon}
      />
    )
  })

  const hero = iconData.map(icon => {
    return (
      <Hero
        key={icon.id}
        {...icon}
      />
    )
  })

  return (
    <>
    <Navbar />
      <section className="hero-section">
        {hero}
      </section>
      <section className="cards-list">
        {cards}
      </section>
      <Footer />
    </>
  )
}
