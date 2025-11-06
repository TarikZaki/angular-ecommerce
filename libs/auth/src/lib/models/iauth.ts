export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}
export interface User {
  name: string;
  email: string;
  role: string;
}
