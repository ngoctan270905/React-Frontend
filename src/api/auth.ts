export interface RegisterData {
  username: string;
  password: string;
}

export interface UserData {
  username: string;
  id: string;
  is_active: boolean;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: UserData;
}

export async function register(data:RegisterData): Promise<RegisterResponse> {
    const response = await fetch('http://127.0.0.1:8000/api/v1/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    console.log('Response status:', response.status);
    return response.json();
}