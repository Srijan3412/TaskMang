import api from "./api";
import type { StoredUser } from "@/utils/token";

export interface AuthResponse {
  token: string;
  user: StoredUser;
}

interface RawAuthResponse {
  token?: string;
  accessToken?: string;
  // Our backend: { statusCode, success, message, data: { token, user } }
  data?: { token?: string; accessToken?: string; user?: StoredUser };
  user?: StoredUser;
}

const normalize = (raw: RawAuthResponse): AuthResponse => {
  // Our backend wraps in data.data — axios gives us res.data which is the outer object
  // so raw = { statusCode, success, message, data: { token, user } }
  const token =
    raw.data?.token ??
    raw.data?.accessToken ??
    raw.token ??
    raw.accessToken ??
    "";
  const user = raw.data?.user ?? raw.user ?? ({} as StoredUser);
  return { token, user };
};

export const registerUser = async (payload: { name: string; email: string; password: string }) => {
  const { data } = await api.post<RawAuthResponse>("/auth/register", payload);
  return normalize(data);
};

export const loginUser = async (payload: { email: string; password: string }) => {
  const { data } = await api.post<RawAuthResponse>("/auth/login", payload);
  return normalize(data);
};
