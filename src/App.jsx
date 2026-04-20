// import React from "react"
import './style.css';
import iconData from "./iconData";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Card from "./components/Card";
import Footer from "./components/Footer";
import ListingDetail from "./components/ListingDetail"
import Auth from './components/Auth'
import { useState, useRef, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import API_URL from './config';

export default function App() {
  const heroRef = useRef(null);
  const [scrollState, setScrollState] = useState({ left: false, right: true });
  const [listings, setListings] = useState([]);
  const [heart, setHeart] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    category: '',
  })

  const navigate = useNavigate();

  // Fetch listings from backend
  useEffect(() => {
    const params = new URLSearchParams()
    if (filters.location) params.append('location', filters.location)
    if (filters.minPrice) params.append('minPrice', filters.minPrice)
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
    if (filters.category) params.append('category', filters.category)
    

    fetch(`${API_URL}/api/listings?${params}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setListings(data)
          setHeart(data.map(item => ({ id: item.id, isFavorite: false })))
        }
      })
  }, [filters])

  // Add user state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  function handleLogin(userData) {
    setUser(userData)
    navigate('/')
  }

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  // Hero scroll
  useEffect(() => {
    const el = heroRef.current
    if (!el) return

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

  const cards = listings.map(place => {
    const heartState = heart.find(item => item.id === place.id)
    const heartIcon = heartState?.isFavorite ? "heart-full.png" : "heart-empty.png"
    return (
      <Card
        key={place.id}
        {...place}
        toggleClick={() => toggleFavorite(place.id)}
        heartIcon={heartIcon}
        onClick={() => navigate(`/listings/${place.id}`)}
      />
    )
  })

  const hero = iconData.map(icon => (
      <Hero 
        key={icon.id} 
        {...icon} 
        isActive={filters.category === icon.alt}
        onClick={() => setFilters(prev => ({
          ...prev,
          category: prev.category === icon.alt ? '' : icon.alt
        }))}
      />
  ))

  const homePage = (
    <>
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

      <section className="cards-list">
        {cards.length > 0
          ? cards
          : <p className="no-results">No listings found for this category</p>
        }
      </section>
      <Footer />
    </>
  )

  return (
    <>
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        filters={filters}
        onFilterChange={(newFilters) => setFilters(prev => ({ ...prev, ...newFilters }))}
      />
      <Routes>
        <Route path="/" element={homePage} />
        <Route path="/listings/:id" element={<ListingDetail />} />
        <Route path="/login" element={<Auth onLogin={handleLogin} />} />
      </Routes>
    </>
  )
}
