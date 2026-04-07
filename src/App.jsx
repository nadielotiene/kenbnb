// import React from "react"
import './style.css'
import iconData from "./iconData"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Card from "./components/Card"
import Footer from "./components/Footer"
import { useState, useRef, useEffect } from 'react'

export default function App() {
  const heroRef = useRef(null);
  const [scrollState, setScrollState] = useState({ left: false, right: true });
  const [listings, setListings] = useState([]);
  const [heart, setHeart] = useState([]);

  // Fetch listings from backend
  useEffect(() => {
    fetch('http://localhost:3001/api/listings')
    .then(res => res.json())
    .then(data => {
      setListings(data)
      setHeart(data.map(item => ({ id: item.id, isFavorite: false })))
    })
  }, [])

  // Hero scroll
  useEffect(() => {
    const el = heroRef.current
    function checkScroll() {
      setScrollState({
        left: el.scrollLeft > 0,
        right: el.scrollLeft < el.scrollWidth - el.clientWidth
      })
    }
    checkScroll()
    window.addEventListener("resize", checkScroll)
    return () => window.removeEventListener("resize", checkScroll)
  }, [])

  function scrollHero(direction) {
    heroRef.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth"
    })
  }

  function handleScroll() {
    const el = heroRef.current
    setScrollState({
      left: el.scrollLeft > 0,
      right: el.scrollLeft < el.scrollWidth - el.clientWidth
    })
  }
  
  function toggleFavorite(id) {
    setHeart(prevState =>
      prevState.map(item =>
        item.id === id
          ? { ...item, isFavorite: !item.isFavorite } : item
      )
    )
  }

  // const [heart, setHeart] = useState(
  //   data.map(place => ({ id: place.id, isFavorite: false }))
  // )

  const cards = listings.map(place => {
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

  const hero = iconData.map(icon => (
      <Hero key={icon.id} {...icon} />
  ))

  return (
    <>
    <Navbar />
    <div className="hero-wrapper">
      <button 
        className="hero-arrow left" 
        onClick={() => scrollHero("left")}
        disabled={!scrollState.left}  
      >‹</button>
      <section className="hero-section" ref={heroRef} onScroll={handleScroll}>
        {hero}
      </section>
      <button 
        className="hero-arrow right"
        onClick={() => scrollHero("right")}
        disabled={!scrollState.right}
      >›</button>
    </div>
      {/* <section className="hero-section">
        {hero}
      </section> */}
      <section className="cards-list">
        {cards}
      </section>
      <Footer />
    </>
  )
}
