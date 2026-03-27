export default function Navbar() {
    return (
        <nav className="nav-div">
            <span className="logo-span">
                <img className="logo" src="/airbnb.png" alt="airbnb logo" />
                <h2 className="nav-title">
                    kenbnb
                </h2>
            </span>
            <button className="search-btn">
                <span className="full-text">Anywhere ⎪ Any week ⎪ Add guests</span> 
                <span className="mid-text">Start your search</span> 
                <span className="short-text">Search</span> 
                <img className="search-icon" src="/search.png" alt="search" /></button>
            <span className="user-span">
                <button className="render-btn">
                    Become a host
                </button>
                <button className="globe-btn">
                    <img className="globe" src="/globe.png" alt="globe" />
                </button>
                <button className="user-menu-btn">
                    <img className="menu" src="/menu.png" alt="globe" />
                    <img className="user" src="/user.png" alt="user" />
                </button>
            </span>
        </nav>
    )
}
