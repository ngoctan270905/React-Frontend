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

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export async function register(data: RegisterData): Promise<RegisterResponse> {
  const response = await fetch('http://127.0.0.1:8000/api/v1/auth/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  console.log('Response status:', response.status);
  return response.json();
}

export async function login(data: LoginData): Promise<LoginResponse> {

  const formData = new URLSearchParams()
  formData.append("username", data.username)
  formData.append("password", data.password)

  const response = await fetch(
    "http://127.0.0.1:8000/api/v1/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData
    }
  )

  if (!response.ok) {
    throw new Error("Login failed")
  }

  return response.json()
}