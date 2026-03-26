import '../../styles/Home.css'

export default function CategoriesSection() {
    return (
        <section className="categories section-padding">
            <div className="section-intro">
                <p>Nâng tầm phong cách sống với một tủ đồ thông minh và tinh tế hơn.</p>
                <p className="text-gray">Các sản phẩm được thiết kế bền vững, hướng tới vẻ đẹp vượt thời gian.</p>
            </div>

            <div className="grid-3">
                <div className="category-card">
                    <img src="/image/pexels-photo-36264469.jpeg" alt="New Arrivals" />
                    <div className="card-overlay"></div>
                    <h3>Hàng Mới Về</h3>
                </div>

                <div className="category-card">
                    <img src="/image/pexels-photo-36264469.jpeg" alt="The Casual Edit" />
                    <div className="card-overlay"></div>
                    <h3>Phong Cách Thường Ngày</h3>
                </div>

                <div className="category-card">
                    <img src="/image/pexels-photo-36356040.jpeg" alt="Best-Sellers" />
                    <div className="card-overlay"></div>
                    <h3>Bán Chạy Nhất</h3>
                </div>
            </div>
        </section>
    )
}