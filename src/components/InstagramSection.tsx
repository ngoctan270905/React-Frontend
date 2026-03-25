import '../styles/Home.css'

export default function InstagramSection() {
    return (
        <section className="instagram">
            <div className="instagram-header">
                <h2>Cửa hàng Instagram</h2>
            </div>

            <div className="grid-5 no-gap">
                <div className="insta-item">
                    <img src="https://images.unsplash.com/photo-1601288496920-b6154fe3626a?auto=format&fit=crop&w=400&q=80" alt="Insta 1" />
                    <i className="ph ph-instagram-logo"></i>
                </div>
                <div className="insta-item">
                    <img src="https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&w=400&q=80" alt="Insta 2" />
                    <i className="ph ph-instagram-logo"></i>
                </div>
                <div className="insta-item">
                    <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" alt="Insta 3" />
                    <i className="ph ph-instagram-logo"></i>
                </div>
                <div className="insta-item">
                    <img src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=400&q=80" alt="Insta 4" />
                    <i className="ph ph-instagram-logo"></i>
                </div>
                <div className="insta-item">
                    <img src="https://images.unsplash.com/photo-1515511856280-7b23f68d2996?auto=format&fit=crop&w=400&q=80" alt="Insta 5" />
                    <i className="ph ph-instagram-logo"></i>
                </div>
            </div>
        </section>
    )
}