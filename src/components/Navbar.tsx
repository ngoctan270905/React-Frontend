import { NavLink, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav>
        <NavLink to="/">Trang chủ</NavLink>
        <NavLink to="/about">Giới thiệu</NavLink>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>

      <Outlet />
    </>
  );
}