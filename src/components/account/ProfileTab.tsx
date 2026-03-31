import { useState, useEffect } from "react";
import { useUser } from '../../context/UserContext'
import { useMutation } from '@tanstack/react-query'
import { updateProfile, type UpdateProfileData } from "../../api/profile_user";

export default function ProfileTab() {
  const { user, refetchUser } = useUser()
  const [isEditing, setIsEditing] = useState(false);

  // Khởi tạo state cho các trường nhập liệu
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  // Đồng bộ state khi dữ liệu user từ Context thay đổi
  useEffect(() => {
    if (user) {
      setFullname(user.fullname || "");
      setPhoneNumber(user.phone_number || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // Mutation xử lý gọi API cập nhật
  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (response) => {
      if (response.success) {
        alert("Cập nhật thông tin thành công!");
        refetchUser(); // Cập nhật lại dữ liệu user toàn hệ thống
        setIsEditing(false);
      }
    },
    onError: (error: any) => {
      alert("Có lỗi xảy ra: " + (error.message || "Không thể cập nhật"));
    }
  });

  const handleSave = () => {
    const data: UpdateProfileData = {
      fullname,
      email,
      phone_number: phoneNumber
      // avatar_file mặc định là undefined
    };
    updateMutation.mutate(data);
  };

  const handleCancel = () => {
    // Reset về dữ liệu cũ từ context và đóng form
    setFullname(user?.fullname || "");
    setPhoneNumber(user?.phone_number || "");
    setEmail(user?.email || "");
    setIsEditing(false);
  };

  return (
    <div id="tab-profile" className="tab-content active">
      <div className="section-block">
        <div className="block-header">
          <h2>Thông Tin Cá Nhân</h2>
          <span className="edit-link" onClick={isEditing ? handleCancel : () => setIsEditing(true)}>
            {isEditing ? "Hủy Chỉnh Sửa" : "Chỉnh Sửa"}{" "}
            <i className={`ph ${isEditing ? "ph-x" : "ph-pencil-simple"}`}></i>
          </span>
        </div>

        {!isEditing ? (
          <div className="info-grid" id="infoGrid">
            <div className="info-item">
              <div className="info-label">Họ và Tên</div>
              <div className="info-val">{user?.fullname || "---"}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Số Điện Thoại</div>
              <div className="info-val">{user?.phone_number || "---"}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Email</div>
              <div className="info-val">{user?.email || "---"}</div>
            </div>
            <div className="info-item">
              <div className="info-label">Ngày Sinh</div>
              <div className="info-val">15 tháng 03, 1995</div>
            </div>
            <div className="info-item">
              <div className="info-label">Giới Tính</div>
              <div className="info-val">Nữ</div>
            </div>
            <div className="info-item">
              <div className="info-label">Thành Phố</div>
              <div className="info-val">Hà Nội</div>
            </div>
          </div>
        ) : (
          <div id="editForm">
            <div className="block-header" style={{ marginTop: "40px" }}>
              <h2>Chỉnh Sửa Thông Tin</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", border: "1px solid var(--border-color)", padding: "28px" }}>
              <div>
                <label style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-gray)", display: "block", marginBottom: "8px" }}>Họ và Tên</label>
                <input 
                  type="text" 
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid #ccc", fontSize: "14px", outline: "none" }} 
                />
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-gray)", display: "block", marginBottom: "8px" }}>Số Điện Thoại</label>
                <input 
                  type="text" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid #ccc", fontSize: "14px", outline: "none" }} 
                />
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-gray)", display: "block", marginBottom: "8px" }}>Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid #ccc", fontSize: "14px", outline: "none" }} 
                />
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-gray)", display: "block", marginBottom: "8px" }}>Ngày Sinh</label>
                <input type="date" defaultValue="1995-03-15" style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid #ccc", fontSize: "14px", outline: "none", color: "#999" }} disabled />
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-gray)", display: "block", marginBottom: "8px" }}>Giới Tính</label>
                <select style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid #ccc", fontSize: "14px", outline: "none", background: "none", color: "#999" }} disabled>
                  <option>Nữ</option>
                  <option>Nam</option>
                  <option>Khác</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-gray)", display: "block", marginBottom: "8px" }}>Thành Phố</label>
                <input type="text" defaultValue="Hà Nội" style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid #ccc", fontSize: "14px", outline: "none", color: "#999" }} disabled />
              </div>
            </div>
            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <button 
                className="btn-sm btn-dark" 
                onClick={handleSave}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? "Đang lưu..." : "Lưu Thay Đổi"}
              </button>
              <button className="btn-sm btn-outline" onClick={handleCancel}>Hủy</button>
            </div>
          </div>
        )}

        <div className="section-block" style={{ marginTop: "40px" }}>
          <div className="block-header">
            <h2>Đổi Mật Khẩu</h2>
          </div>
          <div style={{ border: "1px solid var(--border-color)", padding: "28px", display: "grid", gap: "20px", maxWidth: "480px" }}>
            <div>
              <label style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-gray)", display: "block", marginBottom: "8px" }}>Mật Khẩu Hiện Tại</label>
              <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid #ccc", fontSize: "14px", outline: "none" }} />
            </div>
            <div>
              <label style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-gray)", display: "block", marginBottom: "8px" }}>Mật Khẩu Mới</label>
              <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid #ccc", fontSize: "14px", outline: "none" }} />
            </div>
            <div>
              <label style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-gray)", display: "block", marginBottom: "8px" }}>Xác Nhận Mật Khẩu</label>
              <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid #ccc", fontSize: "14px", outline: "none" }} />
            </div>
            <button className="btn-sm btn-dark" style={{ width: "fit-content" }}>Cập Nhật Mật Khẩu</button>
          </div>
        </div>
      </div>
    </div>
  );
}
// import { useState } from "react";
// import { useUser } from '../../context/UserContext'
// import { useMutation } from '@tanstack/react-query'
// import { updateProfile, type UpdateProfileData } from "../../api/profile_user";


// export default function ProfileTab() {
//   const [isEditing, setIsEditing] = useState(false);
//   const { user, refetchUser } = useUser()
//   console.log("Lấy dữ liệu user từ Context:", user)

//   // Khởi tạo state từ dữ liệu user hiện tại
//   const [fullname, setFullname] = useState(user?.data?.fullname || "");
//   const [phoneNumber, setPhoneNumber] = useState(user?.data?.phone_number || "");
//   const [email, setEmail] = useState(user?.data?.email || "");

//   // Định nghĩa mutation
//   const updateMutation = useMutation({
//     mutationFn: updateProfile,
//     onSuccess: (response) => {
//       if (response.success) {
//         alert("Cập nhật thành công!");
//         refetchUser();
//         setIsEditing(false);
//       }
//     },
//     onError: (error: any) => {
//       alert("Có lỗi xảy ra: " + error.message);
//     }
//   });

//   const handleSave = () => {
//     const data: UpdateProfileData = {
//       fullname,
//       email,
//       phone_number: phoneNumber
//     };
//     updateMutation.mutate(data);
//   };

//   return (
//     <div id="tab-profile" className="tab-content active">
//       <div className="section-block">
//         <div className="block-header">
//           <h2>Thông Tin Cá Nhân</h2>
//           <span className="edit-link" onClick={() => setIsEditing(!isEditing)}>
//             {isEditing ? "Hủy Chỉnh Sửa" : "Chỉnh Sửa"}{" "}
//             <i className={`ph ${isEditing ? "ph-x" : "ph-pencil-simple"}`}></i>
//           </span>
//         </div>

//         {!isEditing ? (
//           <div className="info-grid" id="infoGrid">
//             <div className="info-item">
//               <div className="info-label">Họ và Tên</div>
//               <div className="info-val">{user?.data.fullname}</div>
//             </div>
//             <div className="info-item">
//               <div className="info-label">Số Điện Thoại</div>
//               <div className="info-val">{user?.data.phone_number}</div>
//             </div>
//             <div className="info-item">
//               <div className="info-label">Email</div>
//               <div className="info-val">{user?.data.email}</div>
//             </div>
//             <div className="info-item">
//               <div className="info-label">Ngày Sinh</div>
//               <div className="info-val">15 tháng 03, 1995</div>
//             </div>
//             <div className="info-item">
//               <div className="info-label">Giới Tính</div>
//               <div className="info-val">Nữ</div>
//             </div>
//             <div className="info-item">
//               <div className="info-label">Thành Phố</div>
//               <div className="info-val">Hà Nội</div>
//             </div>
//           </div>
//         ) : (
//           <div id="editForm">
//             <div className="block-header" style={{ marginTop: "40px" }}>
//               <h2>Chỉnh Sửa Thông Tin</h2>
//             </div>
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", border: "1px solid var(--border-color)", padding: "28px" }}>
//               <div>
//                 <label style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-gray)", display: "block", marginBottom: "8px" }}>Họ và Tên</label>
//                 <input type="text" defaultValue="Nguyễn Minh Anh" style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid #ccc", fontSize: "14px", outline: "none" }} />
//               </div>
//               <div>
//                 <label style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-gray)", display: "block", marginBottom: "8px" }}>Số Điện Thoại</label>
//                 <input type="text" defaultValue="+84 912 345 678" style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid #ccc", fontSize: "14px", outline: "none" }} />
//               </div>
//               <div>
//                 <label style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-gray)", display: "block", marginBottom: "8px" }}>Email</label>
//                 <input type="email" defaultValue="minhanhstyle@gmail.com" style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid #ccc", fontSize: "14px", outline: "none" }} />
//               </div>
//               <div>
//                 <label style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-gray)", display: "block", marginBottom: "8px" }}>Ngày Sinh</label>
//                 <input type="date" defaultValue="1995-03-15" style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid #ccc", fontSize: "14px", outline: "none" }} />
//               </div>
//               <div>
//                 <label style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-gray)", display: "block", marginBottom: "8px" }}>Giới Tính</label>
//                 <select style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid #ccc", fontSize: "14px", outline: "none", background: "none" }}>
//                   <option>Nữ</option>
//                   <option>Nam</option>
//                   <option>Khác</option>
//                 </select>
//               </div>
//               <div>
//                 <label style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-gray)", display: "block", marginBottom: "8px" }}>Thành Phố</label>
//                 <input type="text" defaultValue="Hà Nội" style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid #ccc", fontSize: "14px", outline: "none" }} />
//               </div>
//             </div>
//             <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
//               <button className="btn-sm btn-dark" onClick={() => setIsEditing(false)}>Lưu Thay Đổi</button>
//               <button className="btn-sm btn-outline" onClick={() => setIsEditing(false)}>Hủy</button>
//             </div>
//           </div>
//         )}

//         <div className="section-block" style={{ marginTop: "40px" }}>
//           <div className="block-header">
//             <h2>Đổi Mật Khẩu</h2>
//           </div>
//           <div style={{ border: "1px solid var(--border-color)", padding: "28px", display: "grid", gap: "20px", maxWidth: "480px" }}>
//             <div>
//               <label style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-gray)", display: "block", marginBottom: "8px" }}>Mật Khẩu Hiện Tại</label>
//               <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid #ccc", fontSize: "14px", outline: "none" }} />
//             </div>
//             <div>
//               <label style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-gray)", display: "block", marginBottom: "8px" }}>Mật Khẩu Mới</label>
//               <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid #ccc", fontSize: "14px", outline: "none" }} />
//             </div>
//             <div>
//               <label style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-gray)", display: "block", marginBottom: "8px" }}>Xác Nhận Mật Khẩu</label>
//               <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "10px 0", border: "none", borderBottom: "1px solid #ccc", fontSize: "14px", outline: "none" }} />
//             </div>
//             <button className="btn-sm btn-dark" style={{ width: "fit-content" }}>Cập Nhật Mật Khẩu</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }