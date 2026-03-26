export interface RegisterData {
  fullname: string;
  email: string;
  phone_number: string;
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
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface LogoutResponse {
  success: boolean
  message: string
  data: any
}

export interface UserData {
  fullname: string;
  email: string;
  phone_number: string;
  id: string;
  is_active: boolean;
  role: string;
  avatar_url: string | null;
}

export interface MeResponse {
  success: boolean;
  message: string;
  data: UserData;
}

// Gọi API đăng ký
export async function register(data: RegisterData): Promise<RegisterResponse> {
  const response = await fetch('http://127.0.0.1:8000/api/v1/auth/register',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  if (!response.ok) {
    throw new Error('Registration failed');
  }
  return response.json();
}

// Gọi API đăng nhập
export async function login(data: LoginData): Promise<LoginResponse> {

  const formData = new URLSearchParams()
  formData.append("username", data.email)
  formData.append("password", data.password)

  const response = await fetch(
    "http://127.0.0.1:8000/api/v1/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formData,
      credentials: 'include'
    }
  )

  if (!response.ok) {
    throw new Error("Login failed")
  }

  return response.json()
}

// Gọi API đăng xuất
export async function logout(): Promise<LogoutResponse> {
  const token = localStorage.getItem("token");
  const response = await fetch(
    "http://127.0.0.1:8000/api/v1/auth/logout",
    {
      method: "POST",
      credentials: 'include',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  )

  if (!response.ok) {
    throw new Error("Logout failed")
  }

  return response.json()
}

// Gọi API lấy thông tin user hiện tại
export async function fetchMe(): Promise<MeResponse> {
  const token = localStorage.getItem("token");
  const response = await fetch(
    "http://127.0.0.1:8000/api/v1/users/me",
    {
      method: "GET",
      credentials: 'include',
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch user data")
  }

  return response.json()
}