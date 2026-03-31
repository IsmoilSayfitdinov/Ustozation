import client from "./client";
import type {
  ApiResponse,
  ChangePasswordPayload,
  LoginPayload,
  PaginatedResponse,
  ProfileUpdatePayload,
  RegisterPayload,
  TeacherCreatePayload,
  TeacherListItem,
  TokenPair,
  User,
} from "@/types/api";

export const authApi = {
  login: (data: LoginPayload) =>
    client.post<TokenPair>("/auth/login/", data),

  register: (data: RegisterPayload) =>
    client.post<ApiResponse<User>>("/auth/register/", data),

  refreshToken: (refresh: string) =>
    client.post<{ access: string; refresh?: string }>("/auth/refresh/", { refresh }),

  getMe: () =>
    client.get<User>("/auth/me/"),

  updateMe: (data: ProfileUpdatePayload) =>
    client.patch<User>("/auth/me/", data),

  changePassword: (data: ChangePasswordPayload) =>
    client.post<ApiResponse<null>>("/auth/change-password/", data),

  // --- Teacher CRUD (Admin only) ---
  getTeachers: () =>
    client.get<PaginatedResponse<TeacherListItem>>("/auth/teachers/"),

  createTeacher: (data: TeacherCreatePayload) =>
    client.post<ApiResponse<TeacherListItem>>("/auth/teachers/", data),

  deleteTeacher: (id: number) =>
    client.delete(`/auth/teachers/${id}/`),
};
