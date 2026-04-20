import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

export default function Navbar({ user, onLogout, filters, onFilterChange }) {
	const navigate = useNavigate()
	const [dropdownOpen, setDropdownOpen] = useState(false)
	const dropdownRef = useRef(null)

	useEffect(() => {
		function handleClickOutside(e) {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setDropdownOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	return (
		<nav className="nav-div">
			<a className="logo-span" href="/">
				<img className="logo" src="/airbnb.png" alt="airbnb logo" />
				<h2 className="nav-title">
					kenbnb
				</h2>
			</a>
			<div className="search-btn">
				<input 
					className="nav-search-input"
					type="text"
					placeholder="Anywhere"
					value={filters?.location || ""}
					onChange={e => onFilterChange({ location: e.target.value })}
				/>
				<span className="nav-divider">|</span>
				<input 
					className="nav-search-input nav-price-input"
					type="number" 
					placeholder="Min $"
					value={filters?.minPrice || ""}
					onChange={e => onFilterChange({ minPrice: e.target.value })}
				/>
				<span className="nav-divider">|</span>
				<input 
					className="nav-search-input nav-price-input"
					type="number" 
					placeholder="Max $"
					value={filters?.maxPrice || ""}
					onChange={e => onFilterChange({ maxPrice: e.target.value })}
				/>
				<img className="search-icon" src="/search.png" alt="search" />
			</div>

			<span className="user-span">
				<button className="render-btn">
					Become a host
				</button>
				<button className="globe-btn">
					<img className="globe" src="/globe.png" alt="globe" />
				</button>

				<div className="user-menu-wrapper" ref={dropdownRef}>
					<button className="user-menu-btn" onClick={() => setDropdownOpen(prev => !prev)}>
						<img className="menu" src="/menu.png" alt="menu" />
						<img className="user" src="/user.png" alt="user" />
					</button>

					{dropdownOpen && (
						<div className="user-dropdown">
							{user ? (		 
								<>
									<p className="dropdown-name">{user.name}</p>
									<hr className="dropdown-divider" />
									<button className="dropdown-item" onClick={() => {
										onLogout()
										setDropdownOpen(false)
									}}>Log out</button>
								</>
							) : (
								<>
									<button className="dropdown-item" onClick={() => {
										navigate('/login')
										setDropdownOpen(false)
									}}>Log in</button>
									<button className="dropdown-item" onClick={() => {
										navigate('/login?mode=signup')
										setDropdownOpen(false)
									}}>Sign up</button>
								</>
							)}
						</div>
					)}
				</div>
			</span>
		</nav>
	)
}
