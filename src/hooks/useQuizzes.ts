import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { quizzesApi } from "@/api/quizzes";
import type { QuizCreatePayload, QuizEditPayload, QuestionCreatePayload, QuestionEditPayload, AnswerPayload, SubmitAnswerPayload } from "@/types/api";
import { getErrorMessage } from "@/lib/getErrorMessage";

export function useQuizTypes() {
  return useQuery({
    queryKey: ["quiz-types"],
    queryFn: async () => {
      const { data } = await quizzesApi.getQuizTypes();
      return data.results;
    },
    staleTime: 0,
  });
}

export function useTemplateQuizzes(levelId?: number) {
  return useQuery({
    queryKey: ["template-quizzes", levelId ?? "all"],
    queryFn: async () => {
      const { data } = await quizzesApi.getTemplateQuizzes(levelId);
      return data.results;
    },
  });
}

export function useCreateQuizType() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; slug?: string; description?: string }) => {
      const payload = { ...data, slug: data.slug || data.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') };
      const res = await quizzesApi.createQuizType(payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz-types"] });
      toast.success("Test turi yaratildi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useQuizDetail(quizId: number) {
  return useQuery({
    queryKey: ["quiz", quizId],
    queryFn: async () => {
      const { data } = await quizzesApi.getQuiz(quizId);
      return data.data;
    },
    enabled: !!quizId,
  });
}

export function useCourseQuizzes(courseId: number) {
  return useQuery({
    queryKey: ["course-quizzes", courseId],
    queryFn: async () => {
      const { data } = await quizzesApi.getCourseQuizzes(courseId);
      return data.results;
    },
    enabled: !!courseId,
  });
}

export function useCreateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: QuizCreatePayload) => {
      const res = await quizzesApi.createQuiz(data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["template-quizzes"] });
      toast.success("Test yaratildi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUpdateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: QuizEditPayload }) => {
      const res = await quizzesApi.updateQuiz(id, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["quiz"] });
      toast.success("Test yangilandi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useDeleteQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await quizzesApi.deleteQuiz(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["quiz"] });
      toast.success("Test o'chirildi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ quizId, data }: { quizId: number; data: QuestionCreatePayload }) => {
      const res = await quizzesApi.createQuestion(quizId, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz"] });
      queryClient.invalidateQueries({ queryKey: ["course-quizzes"] });
      toast.success("Savol qo'shildi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUpdateQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ questionId, data }: { questionId: number; data: QuestionEditPayload }) => {
      const res = await quizzesApi.updateQuestion(questionId, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz"] });
      toast.success("Savol yangilandi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (questionId: number) => {
      await quizzesApi.deleteQuestion(questionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz"] });
      queryClient.invalidateQueries({ queryKey: ["course-quizzes"] });
      toast.success("Savol o'chirildi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUpdateAnswers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ questionId, answers }: { questionId: number; answers: AnswerPayload[] }) => {
      const res = await quizzesApi.updateAnswers(questionId, answers);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz"] });
      toast.success("Javoblar yangilandi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUploadMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ questionId, formData }: { questionId: number; formData: FormData }) => {
      const res = await quizzesApi.uploadMedia(questionId, formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz"] });
      toast.success("Media yuklandi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useDeleteMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (mediaId: number) => {
      await quizzesApi.deleteMedia(mediaId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz"] });
      toast.success("Media o'chirildi!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

// Student hooks
export function useStartAttempt() {
  return useMutation({
    mutationFn: async (quizId: number) => {
      const { data } = await quizzesApi.startAttempt(quizId);
      return data.data;
    },
    onError: () => {
      toast.error("Testni boshlashda xatolik");
    },
  });
}

export function useSubmitAttempt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ attemptId, answers }: { attemptId: number; answers: SubmitAnswerPayload[] }) => {
      const { data } = await quizzesApi.submitAttempt(attemptId, answers);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["streak"] });
      queryClient.invalidateQueries({ queryKey: ["points"] });
      queryClient.invalidateQueries({ queryKey: ["ranking"] });
      queryClient.invalidateQueries({ queryKey: ["insights"] });
      queryClient.invalidateQueries({ queryKey: ["grammar-mastery"] });
      queryClient.invalidateQueries({ queryKey: ["vocabulary"] });
      queryClient.invalidateQueries({ queryKey: ["attempt-history"] });
    },
    onError: () => {
      toast.error("Javoblarni topshirishda xatolik");
    },
  });
}

export function useAttemptHistory(quizId: number) {
  return useQuery({
    queryKey: ["attempt-history", quizId],
    queryFn: async () => {
      const { data } = await quizzesApi.getAttemptHistory(quizId);
      return data.results;
    },
    enabled: !!quizId,
  });
}

export function useAttemptDetail(attemptId: number) {
  return useQuery({
    queryKey: ["attempt", attemptId],
    queryFn: async () => {
      const { data } = await quizzesApi.getAttemptDetail(attemptId);
      return data.data;
    },
    enabled: !!attemptId,
  });
}
