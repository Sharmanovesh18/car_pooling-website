import "./HomePage.css";

function HomePage() {
    return (
        <div className="homepage">
            {/*Header*/}
            <header className="NavBar">
                <div className="logo">SARTHI</div>
                <nav className="nav-links">
                    <a href="#">Home</a>
                    <a href="#">Rides</a>
                    <a href="#">Offers</a>
                    <a href="#">Help</a>
                    <a href="#">Rentals</a>
                </nav>
                <button className="login-btn">Login / Signup</button>
            </header>
        </div>
    );
}

export default HomePage;