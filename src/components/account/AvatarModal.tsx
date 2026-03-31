import { useRef, useState } from "react";
import { useUser } from "../../context/UserContext";
import { updateProfile } from "../../api/profile_user";
import { useMutation } from "@tanstack/react-query";

export default function AvatarModal({ onClose }: { onClose: () => void }) {
    const { user, refetchUser } = useUser()
    const [preview, setPreview] = useState(user?.avatar_url || "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");

    // Hàm xử lý khi chọn file
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Tạo link tạm thời để hiển thị lên thẻ img
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    };

    const avatarMutation = useMutation({
        mutationFn: (file: File) => updateProfile({ avatar_file: file }),
        onSuccess: () => {
            refetchUser(); // cập nhật avatar mới trong context
            onClose();
        },
        onError: (err) => {
            console.error(err);
            setError("Cập nhật avatar thất bại!");
        },
    });

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        setError("");

        const file = fileInputRef.current?.files?.[0];
        if (!file) {
            setError("Vui lòng chọn ảnh trước khi lưu!");
            return;
        }

        avatarMutation.mutate(file);
    };
    return (
        <div id="avatarModal" className="modal-overlay" style={{ display: "flex" }} onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Cập nhật ảnh đại diện</h3>
                    <i className="ph ph-x" onClick={onClose} style={{ cursor: "pointer", fontSize: "20px" }}></i>
                </div>

                <div className="modal-body">
                    <div className="modal-avatar-preview">
                        <img
                            id="previewImg"
                            src={preview}
                            alt="Preview"
                        />
                    </div>

                    <div className="modal-actions-list">
                        <button className="modal-btn" onClick={() => fileInputRef.current?.click()}>
                            <i className="ph ph-upload-simple"></i> Tải ảnh mới lên
                        </button>
                        <button className="modal-btn btn-danger" onClick={() => setPreview('')}>
                            <i className="ph ph-trash"></i> Gỡ ảnh hiện tại
                        </button>
                    </div>

                    <input type="file" ref={fileInputRef} onChange={handleFileChange} id="fileInput" hidden accept="image/*" />
                    {error && <div className="field-error server-error-main">{error}</div>}
                </div>

                <div className="modal-footer">
                    <button className="btn-sm btn-dark" style={{ width: "100%", padding: "12px" }}
                        onClick={handleSubmit}
                        disabled={avatarMutation.isPending}>
                        {avatarMutation.isPending ? "Đang cập nhật..." : "Lưu thay đổi"}
                    </button>
                </div>


            </div>
        </div>
    );
}