import { useNavigate } from 'react-router-dom'

export default function Navbar({ user, onLogout }) {
    const navigate = useNavigate()

    return (
        <nav className="nav-div">
            {/* <span > */}
            <a className="logo-span" href="/">
                <img className="logo" src="/airbnb.png" alt="airbnb logo" />
                <h2 className="nav-title">
                    kenbnb
                </h2>
            </a>
            {/* </span> */}
            <div className="search-btn">
                <span className="full-text">Anywhere ⎪ Any week ⎪ Add guests</span> 
                <span className="mid-text">Start your search</span> 
                <span className="short-text">Search</span> 
                <img className="search-icon" src="/search.png" alt="search" />
            </div>
            <span className="user-span">
                <button className="render-btn">
                    Become a host
                </button>
                <button className="globe-btn">
                    <img className="globe" src="/globe.png" alt="globe" />
                </button>

                {user ? (
                    <button className="user-menu-btn" onClick={onLogout}>
                        <img className="menu" src="/menu.png" alt="menu" />
                        <span style={{ fontSize: '14px', marginLeft: '4px' }}>{user.name}</span>
                    </button>
                ) : (
                    <button className="user-menu-btn" onClick={() => navigate('/login')}>
                        <img className="menu" src="/menu.png" alt="menu" />
                        <img className="user" src="/user.png" alt="user" />
                    </button>
                )}
            </span>
        </nav>
    )
}
