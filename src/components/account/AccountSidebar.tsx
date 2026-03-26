import UserCard from "./UserCard"; 
import SidebarMenu from "./SidebarMenu";
import { useMutation } from "@tanstack/react-query";
import { logout, type LogoutResponse } from "../../api/auth";
import { useNavigate } from "react-router-dom";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function AccountSidebar({ activeTab, setActiveTab }: Props) {
  const navigate = useNavigate();

  // gắn interface LogoutResponse
  const logoutMutation = useMutation<LogoutResponse>({
    mutationFn: logout,
    onSuccess: (data) => {
      // TypeScript biết data kiểu LogoutResponse
      if (data.success) {
        localStorage.removeItem("token")
        navigate("/login");
      } else {
        alert(data.message);
      }
    },
    onError: (error: any) => {
      alert("Đăng xuất thất bại, error: " + error.message);
    }
  });

  return (
    <aside className="sidebar">

      <UserCard />

      <SidebarMenu 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      <button
        className="logout-btn"
        onClick={() => logoutMutation.mutate()}
        disabled={logoutMutation.isPending} // disable khi đang call API
      >
        {logoutMutation.isPending ? "Đang đăng xuất..." : <><i className="ph ph-sign-out"></i> Đăng Xuất</>}
      </button>

    </aside>
  );
}