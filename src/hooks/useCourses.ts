import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { coursesApi } from "@/api/courses";
import { getErrorMessage } from "@/lib/getErrorMessage";

export function useLevels() {
  return useQuery({
    queryKey: ["levels"],
    queryFn: async () => {
      const { data } = await coursesApi.getLevels();
      return data.results;
    },
    staleTime: 2 * 60 * 1000,
  });
}

export function useCreateLevel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; slug: string; description: string; order: number }) => {
      const res = await coursesApi.createLevel(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["levels"] });
      toast.success("Daraja yaratildi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUpdateLevel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<{ name: string; slug: string; description: string; order: number }> }) => {
      const res = await coursesApi.updateLevel(id, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["levels"] });
      queryClient.invalidateQueries({ queryKey: ["level"] });
      toast.success("Daraja yangilandi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useDeleteLevel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await coursesApi.deleteLevel(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["levels"] });
      toast.success("Daraja o'chirildi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useLevelDetail(id: number) {
  return useQuery({
    queryKey: ["level", id],
    queryFn: async () => {
      const { data } = await coursesApi.getLevelDetail(id);
      return data;
    },
    enabled: !!id,
  });
}

export function useModules(levelId: number) {
  return useQuery({
    queryKey: ["modules", levelId],
    queryFn: async () => {
      const { data } = await coursesApi.getModules(levelId);
      return data.results;
    },
    enabled: !!levelId,
  });
}

export function useModuleDetail(id: number) {
  return useQuery({
    queryKey: ["module", id],
    queryFn: async () => {
      const { data } = await coursesApi.getModule(id);
      return data;
    },
    enabled: !!id,
  });
}

export function useLessons(moduleId: number) {
  return useQuery({
    queryKey: ["lessons", moduleId],
    queryFn: async () => {
      const { data } = await coursesApi.getLessons(moduleId);
      return data.results;
    },
    enabled: !!moduleId,
  });
}

export function useLessonDetail(id: number) {
  return useQuery({
    queryKey: ["lesson", id],
    queryFn: async () => {
      const { data } = await coursesApi.getLesson(id);
      return data;
    },
    enabled: !!id,
  });
}

export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await coursesApi.getCourses();
      return data.results;
    },
  });
}

export function useCourseLessons(courseId: number) {
  return useQuery({
    queryKey: ["course-lessons", courseId],
    queryFn: async () => {
      const { data } = await coursesApi.getCourseLessons(courseId);
      return data.results;
    },
    enabled: !!courseId,
  });
}

export function useCourseStudents(courseId: number) {
  return useQuery({
    queryKey: ["course-students", courseId],
    queryFn: async () => {
      const { data } = await coursesApi.getCourseStudents(courseId);
      return data.results;
    },
    enabled: !!courseId,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { title: string; level: number; max_students?: number }) => {
      const res = await coursesApi.createCourse(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["course-quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["course-lessons"] });
      toast.success("Guruh muvaffaqiyatli yaratildi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: { title?: string; max_students?: number; is_active?: boolean } }) => {
      const res = await coursesApi.updateCourse(id, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["course-students"] });
      queryClient.invalidateQueries({ queryKey: ["course-lessons"] });
      toast.success("Guruh yangilandi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await coursesApi.deleteCourse(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["course-quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["course-lessons"] });
      queryClient.invalidateQueries({ queryKey: ["course-students"] });
      toast.success("Guruh o'chirildi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useCreateModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ levelId, data }: { levelId: number; data: { title: string; description: string; order: number, slug: string } }) => {
      const res = await coursesApi.createModule(levelId, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["levels"] });
      queryClient.invalidateQueries({ queryKey: ["level"] });
      toast.success("Modul qo'shildi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUpdateModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: { title?: string; description?: string; order?: number; slug?: string } }) => {
      const res = await coursesApi.updateModule(id, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["levels"] });
      queryClient.invalidateQueries({ queryKey: ["level"] });
      toast.success("Modul yangilandi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useDeleteModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await coursesApi.deleteModule(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["levels"] });
      queryClient.invalidateQueries({ queryKey: ["level"] });
      toast.success("Modul o'chirildi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useCreateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ moduleId, data }: { moduleId: number; data: { title: string; description: string; order: number } }) => {
      const res = await coursesApi.createLesson(moduleId, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["levels"] });
      queryClient.invalidateQueries({ queryKey: ["level"] });
      toast.success("Dars qo'shildi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUpdateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: { title?: string; description?: string; order?: number } }) => {
      const res = await coursesApi.updateLesson(id, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["levels"] });
      queryClient.invalidateQueries({ queryKey: ["level"] });
      toast.success("Dars yangilandi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useDeleteLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await coursesApi.deleteLesson(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["levels"] });
      queryClient.invalidateQueries({ queryKey: ["level"] });
      toast.success("Dars o'chirildi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useToggleLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ courseId, lessonId, unlock }: { courseId: number; lessonId: number; unlock: boolean }) => {
      const res = await coursesApi.toggleLesson(courseId, lessonId, unlock);
      return res.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["course-lessons", variables.courseId] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
