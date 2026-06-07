import { api } from "../../api/api";
import type {
  AuthMeResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "./types";

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/Auth/login", data);
  return response.data;
}

export async function getMeApi(): Promise<AuthMeResponse> {
  const response = await api.get<AuthMeResponse>("/Auth/me");
  return response.data;
}

export async function registerApi(
  data: RegisterRequest
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/Auth/register", data);
  return response.data;
}