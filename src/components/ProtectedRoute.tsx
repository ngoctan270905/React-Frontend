import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const isLogin = localStorage.getItem("isLogin");

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}