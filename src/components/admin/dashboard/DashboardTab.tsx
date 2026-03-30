import { 
  LuUsers, 
  LuShoppingCart, 
  LuTrendingUp, 
  LuTrendingDown, 
  LuClock,
  LuEllipsisVertical,
  LuSmartphone,
  LuMousePointer2,
  LuMonitor,
  LuTv
} from "react-icons/lu";

export default function DashboardTab() {
  const STATS = [
    {
      label: "Total User",
      value: "40,689",
      trend: "+8.5%",
      up: true,
      iconBg: "#f3f0ff",
      color: "#7367f0",
      icon: <LuUsers size={24} />,
    },
    {
      label: "Total Order",
      value: "10,293",
      trend: "+1.3%",
      up: true,
      iconBg: "#fffbeb",
      color: "#ff9f43",
      icon: <LuShoppingCart size={24} />,
    },
    {
      label: "Total Sales",
      value: "$89,000",
      trend: "-4.3%",
      up: false,
      iconBg: "#ecfdf5",
      color: "#28c76f",
      icon: <LuTrendingUp size={24} />,
    },
    {
      label: "Total Pending",
      value: "2,040",
      trend: "+1.8%",
      up: true,
      iconBg: "#fff7ed",
      color: "#00cfe8",
      icon: <LuClock size={24} />,
    },
  ];

  const PRODUCTS = [
    { name: "OnePlus 7Pro", brand: "OnePlus", cat: "Smart Phone", icon: <LuSmartphone />, catBg: "#eae8fd", pay: "$120/499", sub: "Partially Paid", badge: "badge-confirmed", status: "Confirmed" },
    { name: "Magic Mouse", brand: "Apple", cat: "Mouse", icon: <LuMousePointer2 />, catBg: "#fff8e0", pay: "$149", sub: "Fully Paid", badge: "badge-completed", status: "Completed" },
    { name: "iMac Pro", brand: "Apple", cat: "Computer", icon: <LuMonitor />, catBg: "#e0f9ff", pay: "$0/899", sub: "Unpaid", badge: "badge-cancelled", status: "Cancelled" },
    { name: "Note 10", brand: "Samsung", cat: "Smart Phone", icon: <LuSmartphone />, catBg: "#eae8fd", pay: "$149", sub: "Fully Paid", badge: "badge-completed", status: "Completed" },
    { name: "Mi LED TV 4X", brand: "Xiaomi", cat: "Smart TV", icon: <LuTv />, catBg: "#ffeee0", pay: "$349/2499", sub: "Partially Paid", badge: "badge-confirmed", status: "Confirmed" },
  ];

  return (
    <>
      <div className="stat-grid">
        {STATS.map((s) => (
          <div className="stat-card" key={s.label}>
            <div className="stat-card__body">
              <div className="stat-card__text">
                <p className="stat-card__label">{s.label}</p>
                <h2 className="stat-card__value">{s.value}</h2>
                <p className={`stat-card__trend ${s.up ? "trend-up" : "trend-down"}`}>
                  <span className="trend-icon">{s.up ? <LuTrendingUp /> : <LuTrendingDown />}</span>
                  <strong>{s.trend}</strong> Up from yesterday
                </p>
              </div>
              <div className="stat-card__icon" style={{ background: s.iconBg, color: s.color }}>
                {s.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 24 }}>
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
              {PRODUCTS.map((p, i) => (
                <tr key={i}>
                  <td>
                    <div className="product-cell">
                      <div className="product-img" style={{ color: '#7367f0' }}>{p.icon}</div>
                      <div>
                        <div className="product-name">{p.name}</div>
                        <div className="product-brand">{p.brand}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="cat-cell">
                      <div className="cat-icon" style={{ background: p.catBg, color: '#7367f0' }}>{p.icon}</div>
                      <span className="cat-label">{p.cat}</span>
                    </div>
                  </td>
                  <td>
                    <div className="pay-amount">{p.pay}</div>
                    <div className="pay-sub">{p.sub}</div>
                  </td>
                  <td><span className={`badge ${p.badge}`}>{p.status}</span></td>
                  <td><div className="action-dots"><LuEllipsisVertical /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
