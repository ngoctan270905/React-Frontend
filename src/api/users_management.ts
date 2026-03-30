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