export interface UserListItem {
    id: string;
    avatar_url: string | null;
    fullname: string;
    email: string;
    phone_number: string;
    role: string;
    is_active: boolean;
    created_at: string;
}

export interface UserListData {
    total_count: number;
    page: number;
    page_size: number;
    items: UserListItem[];
}

export interface UserListResponse {
    success: boolean;
    message: string;
    data: UserListData;
}

export interface UpdateUserPayload {
    fullname?: string;
    email?: string;
    phone_number?: string;
    role?: string;
    is_active?: boolean;
    avatar_file?: File | null;
}

export interface UserDetail {
    id: string;
    fullname: string;
    email: string;
    phone_number: string;
    is_active: boolean;
    role: string;
    avatar_url: string;
}

export interface UserSingleResponse {
    success: boolean;
    message: string;
    data: UserDetail;
}

export async function getUserList(page: number = 1, pageSize: number = 10): Promise<UserListResponse> {
    const token = localStorage.getItem("token");

    const res = await fetch(
        `http://127.0.0.1:8000/api/v1/admin/users/?page=${page}&page_size=${pageSize}`,
        {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if (!res.ok) {
        throw new Error("Lấy danh sách user thất bại");
    }

    const data: UserListResponse = await res.json();

    return data;
}

export async function updateUser(userId: string, payload: UpdateUserPayload): Promise<UserSingleResponse> {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    if (payload.fullname) formData.append("fullname", payload.fullname);
    if (payload.email) formData.append("email", payload.email);
    if (payload.phone_number) formData.append("phone_number", payload.phone_number);
    if (payload.role) formData.append("role", payload.role);
    if (payload.is_active !== undefined) formData.append("is_active", String(payload.is_active));
    if (payload.avatar_file instanceof File) {
        formData.append("avatar_file", payload.avatar_file);
    }

    const res = await fetch(`http://127.0.0.1:8000/api/v1/admin/users/${userId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
      });

    if (!res.ok) {
        throw new Error("Cập nhật người dùng thất bại");
    }

    return res.json();
}