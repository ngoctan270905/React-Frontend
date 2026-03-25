import '../styles/Home.css'

export default function HeroSection() {
    return (
        <section className="hero">
            <img
                src="/image/banner-phu-Thoi-trang-1.webp"
                alt="Vietnamese model in elegant outfit"
                className="hero-bg"
            />
            <div className="hero-overlay"></div>
            {/* <div className="hero-content">
                <h1>Elevate Your Style<br />Timeless Fashion,<br />Sustainable Choices</h1>
                <button className="btn-primary">Shop Now</button>
            </div> */}
        </section>
    )
}