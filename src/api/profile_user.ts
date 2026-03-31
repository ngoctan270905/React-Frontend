export interface UpdateProfileData {
    fullname?: string;
    email?: string;
    phone_number?: string;
    avatar_file?: File;
}

export interface UpdateProfileResponse {
    success: boolean;
    message: string;
    data: any; 
}

export async function updateProfile(data: UpdateProfileData): Promise<UpdateProfileResponse> {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    if (data.fullname) formData.append("fullname", data.fullname);
    if (data.email) formData.append("email", data.email);
    if (data.phone_number) formData.append("phone_number", data.phone_number);
    if (data.avatar_file) formData.append("avatar_file", data.avatar_file);

    const response = await fetch('http://127.0.0.1:8000/api/v1/users/me',
        {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        if (!response.ok) {
        throw new Error('Update profile failed');
    }
    return response.json();
}