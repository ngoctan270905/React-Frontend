import '../../styles/Home.css'

export default function EditorialSection() {
    return (
        <section className="editorial section-padding">
            <div className="grid-2">
                <div className="editorial-card">
                    <img src="https://images.unsplash.com/photo-1611042553365-9b101441c135?auto=format&fit=crop&w=1000&q=80" alt="The Smart Chic" />
                    <div className="card-overlay"></div>
                    <h3>Quý Cô Thanh Lịch</h3>
                </div>

                <div className="editorial-card">
                    <img src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=1000&q=80" alt="Ready To Go" />
                    <div className="card-overlay"></div>
                    <h3>Sẵn Sàng Xuống Phố</h3>
                </div>
            </div>
        </section>
    )
}