import { Link } from 'react-router-dom'
import '../styles/Home.css'


export default function Footer() {
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        // Xử lý logic đăng ký nhận email ở đây
    }

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">

                    <div className="footer-col">
                        <h4>LIÊN HỆ</h4>
                        <ul>
                            <li>+84 900 123 456</li>
                            <li>Gửi Email cho chúng tôi</li>
                            <li>T2-T6 9:00 - 18:00</li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>KHÁCH HÀNG</h4>
                        <ul>
                            <li><Link to="/returns">Tiến hành đổi trả</Link></li>
                            <li><Link to="/return-policy">Chính sách đổi trả</Link></li>
                            <li><Link to="/faq">Câu hỏi thường gặp</Link></li>
                            <li><Link to="/gift-wrapping">Gói quà tặng</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>CÔNG TY</h4>
                        <ul>
                            <li><Link to="/about">Về chúng tôi</Link></li>
                            <li><Link to="/sustainability">Phát triển bền vững</Link></li>
                            <li><Link to="/careers">Tuyển dụng</Link></li>
                            <li><Link to="/privacy">Bảo mật thông tin</Link></li>
                            <li><Link to="/terms">Điều khoản</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col newsletter">
                        <h4>Nhận thông báo mới nhất</h4>
                        <form onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                placeholder="Nhập địa chỉ email của bạn"
                                required
                            />
                            <p className="terms">
                                Bằng cách đăng ký, bạn đồng ý với <Link to="/privacy">Chính sách bảo mật</Link> và <Link to="/terms">Điều khoản dịch vụ</Link>.
                            </p>
                            <button type="submit">Đăng ký</button>
                        </form>
                    </div>

                </div>
            </div>
        </footer>
    )
}