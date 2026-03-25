import '../styles/Home.css'

export default function ProductsSection() {
    return (
        <section className="products section-padding">
            <h2 className="section-title">Gợi Ý Hôm Nay</h2>

            <div className="grid-5">
                <div className="product-card">
                    <div className="product-image">
                        <img src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80" alt="Tote" />
                        <button className="add-btn"><i className="ph ph-plus"></i></button>
                    </div>
                    <div className="product-info">
                        <h4>Classic Easy Zipper Tote</h4>
                        <p>6.500.000đ</p>
                    </div>
                </div>

                <div className="product-card">
                    <div className="product-image">
                        <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=600&q=80" alt="Phone Bag" />
                        <button className="add-btn"><i className="ph ph-plus"></i></button>
                    </div>
                    <div className="product-info">
                        <h4>Concertina Phone Bag</h4>
                        <p>4.800.000đ</p>
                    </div>
                </div>

                <div className="product-card">
                    <div className="product-image">
                        <img src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80" alt="Coat" />
                        <button className="add-btn"><i className="ph ph-plus"></i></button>
                    </div>
                    <div className="product-info">
                        <h4>Wool Cashmere Sweater Coat</h4>
                        <p>8.500.000đ</p>
                    </div>
                </div>

                <div className="product-card">
                    <div className="product-image">
                        <img src="https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=600&q=80" alt="Beanie" />
                        <button className="add-btn"><i className="ph ph-plus"></i></button>
                    </div>
                    <div className="product-info">
                        <h4>Single-Origin Cashmere Beanie</h4>
                        <p>1.200.000đ</p>
                        <div className="swatches">
                            <span className="swatch" style={{ backgroundColor: '#D2B48C' }}></span>
                            <span className="swatch" style={{ backgroundColor: '#000000' }}></span>
                            <span className="swatch" style={{ backgroundColor: '#FFC0CB' }}></span>
                        </div>
                    </div>
                </div>

                <div className="product-card">
                    <div className="product-image">
                        <img src="https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&w=600&q=80" alt="Cardigan" />
                        <button className="add-btn"><i className="ph ph-plus"></i></button>
                    </div>
                    <div className="product-info">
                        <h4>Alpaca Wool Cropped Cardigan</h4>
                        <p>5.200.000đ</p>
                    </div>
                </div>
            </div>
        </section>
    )
}