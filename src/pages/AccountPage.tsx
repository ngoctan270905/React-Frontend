import { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumb from "../components/layout/Breadcrumb";
import AccountSidebar from "../components/account/AccountSidebar";

// Tabs
import OverviewTab from "../components/account/OverviewTab";
import ProfileTab from "../components/account/ProfileTab";
import OrdersTab from "../components/account/OrdersTab";
import WishlistTab from "../components/account/WishlistTab";
import AddressTab from "../components/account/AddressTab";
import NotificationsTab from "../components/account/NotificationsTab";

import "../styles/Account.css";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Header />
      <Breadcrumb />

      <div className="page-wrapper">
        <AccountSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="main-content">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "orders" && <OrdersTab />}
          {activeTab === "wishlist" && <WishlistTab />}
          {activeTab === "address" && <AddressTab />}
          {activeTab === "notifications" && <NotificationsTab />}
        </main>
      </div>

      <Footer />
    </>
  );
}