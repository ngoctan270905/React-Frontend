import "../../styles/Admin.css";

export default function DashboardPage() {
  return (
    <>
      {/* Thanh trang trí phía trên card */}
      <div className="card-bar"></div>

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {/* Row 1: OnePlus */}
              <tr>
                <td>
                  <div className="product-cell">
                    <div className="product-img">📱</div>
                    <div>
                      <div className="product-name">OnePlus 7Pro</div>
                      <div className="product-brand">OnePlus</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="cat-cell">
                    <div className="cat-icon" style={{ background: "#eae8fd" }}>📱</div>
                    <span className="cat-label">Smart Phone</span>
                  </div>
                </td>
                <td>
                  <div className="pay-amount">$120/499</div>
                  <div className="pay-sub">Partially Paid</div>
                </td>
                <td><span className="badge badge-confirmed">Confirmed</span></td>
                <td><div className="action-dots">⋮</div></td>
              </tr>

              {/* Row 2: Magic Mouse */}
              <tr>
                <td>
                  <div className="product-cell">
                    <div className="product-img">🖱️</div>
                    <div>
                      <div className="product-name">Magic Mouse</div>
                      <div className="product-brand">Apple</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="cat-cell">
                    <div className="cat-icon" style={{ background: "#fff8e0" }}>🖱️</div>
                    <span className="cat-label">Mouse</span>
                  </div>
                </td>
                <td>
                  <div className="pay-amount">$149</div>
                  <div className="pay-sub">Fully Paid</div>
                </td>
                <td><span className="badge badge-completed">Completed</span></td>
                <td><div className="action-dots">⋮</div></td>
              </tr>

              {/* Row 3: iMac Pro */}
              <tr>
                <td>
                  <div className="product-cell">
                    <div className="product-img">💻</div>
                    <div>
                      <div className="product-name">iMac Pro</div>
                      <div className="product-brand">Apple</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="cat-cell">
                    <div className="cat-icon" style={{ background: "#e0f9ff" }}>💻</div>
                    <span className="cat-label">Computer</span>
                  </div>
                </td>
                <td>
                  <div className="pay-amount">$0/899</div>
                  <div className="pay-sub">Unpaid</div>
                </td>
                <td><span className="badge badge-cancelled">Cancelled</span></td>
                <td><div className="action-dots">⋮</div></td>
              </tr>

              {/* Row 4: Note 10 */}
              <tr>
                <td>
                  <div className="product-cell">
                    <div className="product-img">📱</div>
                    <div>
                      <div className="product-name">Note 10</div>
                      <div className="product-brand">Samsung</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="cat-cell">
                    <div className="cat-icon" style={{ background: "#eae8fd" }}>📱</div>
                    <span className="cat-label">Smart Phone</span>
                  </div>
                </td>
                <td>
                  <div className="pay-amount">$149</div>
                  <div className="pay-sub">Fully Paid</div>
                </td>
                <td><span className="badge badge-completed">Completed</span></td>
                <td><div className="action-dots">⋮</div></td>
              </tr>

              {/* Row 5: Mi LED TV */}
              <tr>
                <td>
                  <div className="product-cell">
                    <div className="product-img">📺</div>
                    <div>
                      <div className="product-name">Mi LED TV 4X</div>
                      <div className="product-brand">Xiaomi</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="cat-cell">
                    <div className="cat-icon" style={{ background: "#ffeee0" }}>📺</div>
                    <span className="cat-label">Smart TV</span>
                  </div>
                </td>
                <td>
                  <div className="pay-amount">$349/2499</div>
                  <div className="pay-sub">Partially Paid</div>
                </td>
                <td><span className="badge badge-confirmed">Confirmed</span></td>
                <td><div className="action-dots">⋮</div></td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}