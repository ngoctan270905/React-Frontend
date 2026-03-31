import { Link } from 'react-router-dom'
import '../../styles/Home.css'
import { useUser } from '../../context/UserContext'
export default function Header() {
    const { user } = useUser()
    console.log("Lấy dữ liệu user từ Context:", user)

    return (
        <>
            <div className="announcement-bar">
                Miễn phí giao hàng toàn quốc cho đơn hàng từ 2.000.000đ. Mua sắm ngay
            </div>

            <header className="header">
                <div className="header-container">
                    <Link to="/" className="logo-link">
                        <div className="logo">ABC</div>
                    </Link>

                    <nav className="desktop-nav">
                        <Link to="/shop">Cửa hàng</Link>
                        <Link to="/new-arrivals">Hàng mới về</Link>
                        <Link to="/sale">Khuyến mãi</Link>
                        <Link to="/magazine">Tạp chí</Link>
                    </nav>

                    <div className="header-icons">
                        <i className="ph ph-magnifying-glass"></i>
                        <i className="ph ph-map-pin hide-mobile"></i>
                        <Link to="/account" title={user?.fullname || ''}>
                            <i className="ph ph-user hide-mobile"></i>
                        </Link>
                        <i className="ph ph-heart"></i>
                        <div className="cart-icon">
                            <i className="ph ph-shopping-bag"></i>
                            <span className="cart-badge">2</span>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}