import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const navigate = useNavigate();

  const handleLogin = () => {

    localStorage.setItem("isLogin", "true");
    alert("Login thành công");

    navigate("/dashboard");
  };

  return (
    <div>

      <h1>🔑 Login Page</h1>

      <button onClick={handleLogin}>
        Đăng nhập
      </button>

    </div>
  );
}