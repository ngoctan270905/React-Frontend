# Kế hoạch triển khai Logic Update Người dùng (Multipart/Form-Data)

Tài liệu này hướng dẫn chi tiết cách triển khai tính năng cập nhật thông tin người dùng hỗ trợ tải lên ảnh đại diện.

## 1. Cập nhật API (`src/api/users_management.ts`)

Sử dụng `FormData` để gửi cả text và file.

```typescript
export interface UpdateUserPayload {
  fullname?: string;
  email?: string;
  phone_number?: string;
  role?: string;
  is_active?: boolean;
  avatar_url?: File | null; // Chấp nhận File để upload
}

export async function updateUser(userId: string, payload: UpdateUserPayload): Promise<UserListResponse> {
  const token = localStorage.getItem("token");
  const formData = new FormData();

  // Append các trường dữ liệu vào FormData
  if (payload.fullname) formData.append("fullname", payload.fullname);
  if (payload.email) formData.append("email", payload.email);
  if (payload.phone_number) formData.append("phone_number", payload.phone_number);
  if (payload.role) formData.append("role", payload.role);
  if (payload.is_active !== undefined) formData.append("is_active", String(payload.is_active));
  if (payload.avatar_url instanceof File) {
    formData.append("avatar_url", payload.avatar_url);
  }

  const res = await fetch(`http://127.0.0.1:8000/api/v1/admin/users/${userId}`, {
    method: "PATCH",
    headers: {
      // Lưu ý: Không set Content-Type khi gửi FormData, trình duyệt sẽ tự set kèm boundary
      "Authorization": `Bearer ${token}`
    },
    body: formData
  });

  if (!res.ok) throw new Error("Cập nhật người dùng thất bại");
  return res.json();
}
```

## 2. Triển khai trong `EditUserModal.tsx`

### A. Xử lý File Input
Thêm state để quản lý file ảnh được chọn.

```typescript
const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [previewUrl, setPreviewUrl] = useState<string | null>(user?.avatar_url || null);

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }
};
```

### B. Submit Form
Gộp dữ liệu từ `react-hook-form` và `selectedFile`.

```typescript
const onSubmit = (data: UpdateUserPayload) => {
  const finalData = {
    ...data,
    avatar_url: selectedFile // Gửi file thực tế thay vì URL string
  };
  mutation.mutate(finalData);
};
```

## 3. Các điểm cần lưu ý

1.  **Content-Type**: Tuyệt đối không set `"Content-Type": "application/json"` trong header khi dùng `FormData`.
2.  **Cleanup**: Sử dụng `URL.revokeObjectURL(previewUrl)` trong `useEffect` cleanup để tránh rò rỉ bộ nhớ khi preview ảnh.
3.  **Boolean**: Khi dùng `FormData`, các giá trị boolean sẽ được gửi dưới dạng string (`"true"`/`"false"`). Backend cần handle việc convert này.
