import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authApi } from "@/api/auth";
import { coursesApi } from "@/api/courses";
import { useAuthStore } from "@/store/useAuthStore";
import type { LoginPayload, ProfileUpdatePayload, RegisterPayload } from "@/types/api";
import { getErrorMessage } from "@/lib/getErrorMessage";

export function useLogin() {
  const { setTokens, setUser } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const res = await authApi.login(data);
      return res.data;
    },
    onSuccess: async (tokens) => {
      setTokens(tokens.access, tokens.refresh);

      try {
        const { data: user } = await authApi.getMe();
        setUser(user);
        toast.success("Muvaffaqiyatli kirdingiz!");

        if (user.role === "admin" || user.role === "teacher") {
          navigate("/admin/dashboard");
        } else {
          navigate("/student/dashboard");
        }
      } catch {
        // Token set but getMe failed — still navigate, AuthGuard will handle
        navigate("/student/dashboard");
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useTeachers() {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const { data } = await authApi.getTeachers();
      return data.results;
    },
    staleTime: 30 * 60 * 1000,
  });
}

export function useCreateTeacher() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { username: string; password: string; telegram_username?: string }) => {
      const res = await authApi.createTeacher(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.success("O'qituvchi qo'shildi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useDeleteTeacher() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await authApi.deleteTeacher(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      toast.success("O'qituvchi o'chirildi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: RegisterPayload) => {
      const res = await authApi.register(data);

      // Agar course tanlangan bo'lsa — ro'yxatdan o'tgandan keyin login qilib enroll qilish
      // Backend register dan keyin token bermaydi, shuning uchun faqat register + redirect
      return { user: res.data, courseId: data.course };
    },
    onSuccess: (_result) => {
      toast.success("Ro'yxatdan o'tdingiz! Endi tizimga kiring.");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useMe() {
  const { isAuthenticated, setUser } = useAuthStore();

  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const { data } = await authApi.getMe();
      setUser(data);
      return data;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProfileUpdatePayload) => {
      const res = await authApi.updateMe(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      toast.success("Profil yangilandi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (data: { old_password: string; new_password: string; new_password_confirm: string }) => {
      const res = await authApi.changePassword(data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Parol muvaffaqiyatli o'zgartirildi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useLogout() {
  const { logout } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return () => {
    logout();
    queryClient.clear();
    navigate("/login");
    toast.success("Tizimdan chiqdingiz");
  };
}

export function useEnroll() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (courseId: number) => {
      const res = await coursesApi.enroll(courseId);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Guruhga muvaffaqiyatli qo'shildingiz!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
