export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  email?: string;
  fullName?: string;
  roles?: string[];
}

export interface AuthMeResponse {
  userId?: string;
  id?: string;
  email?: string;
  fullName?: string;
  roles?: string[];
}

export type RegisterRequest = {
  fullName: string;
  email: string;
  phone: string | null;
  address: string | null;
  description: string | null;
  password: string;
};

export type RegisterResponse = {
  userId: string;
  customerId: string;
  fullName: string;
  email: string;
  phone: string | null;
  address: string | null;
  description: string | null;
  customerStatus: string;
  role: string;
};