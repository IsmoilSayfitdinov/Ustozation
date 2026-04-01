import client from "./client";
import type {
  AnswerPayload,
  ApiResponse,
  AttemptListItem,
  AttemptResult,
  PaginatedResponse,
  Question,
  QuestionCreatePayload,
  QuestionEditPayload,
  QuestionMedia,
  QuizCreatePayload,
  QuizDetail,
  QuizEditPayload,
  QuizListItem,
  QuizType,
  StartAttemptResponse,
  SubmitAnswerPayload,
} from "@/types/api";

export const quizzesApi = {
  // Quiz types
  getQuizTypes: () =>
    client.get<PaginatedResponse<QuizType>>("/quizzes/types/"),

  createQuizType: (data: { name: string; slug: string; description?: string }) =>
    client.post<ApiResponse<QuizType>>("/quizzes/types/", data),

  // Quiz detail
  getQuiz: (id: number) =>
    client.get<ApiResponse<QuizDetail>>(`/quizzes/${id}/`),

  // Quiz CRUD (teacher)
  createQuiz: (data: QuizCreatePayload) =>
    client.post<ApiResponse<QuizDetail>>("/quizzes/create/", data),

  updateQuiz: (id: number, data: QuizEditPayload) =>
    client.put<ApiResponse<QuizDetail>>(`/quizzes/${id}/edit/`, data),

  deleteQuiz: (id: number) =>
    client.delete(`/quizzes/${id}/delete/`),

  // Course quizzes (teacher)
  getCourseQuizzes: (courseId: number) =>
    client.get<PaginatedResponse<QuizListItem>>(`/quizzes/course/${courseId}/`),

  // Question CRUD (teacher)
  createQuestion: (quizId: number, data: QuestionCreatePayload) =>
    client.post<ApiResponse<Question>>(`/quizzes/${quizId}/questions/`, data),

  updateQuestion: (questionId: number, data: QuestionEditPayload) =>
    client.put<ApiResponse<Question>>(`/quizzes/questions/${questionId}/edit/`, data),

  deleteQuestion: (questionId: number) =>
    client.delete(`/quizzes/questions/${questionId}/delete/`),

  // Answer bulk update (teacher)
  updateAnswers: (questionId: number, answers: AnswerPayload[]) =>
    client.put<ApiResponse<AnswerPayload[]>>(`/quizzes/questions/${questionId}/answers/`, answers),

  // Question media (teacher)
  uploadMedia: (questionId: number, formData: FormData) =>
    client.post<ApiResponse<QuestionMedia>>(`/quizzes/questions/${questionId}/media/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  deleteMedia: (mediaId: number) =>
    client.delete(`/quizzes/media/${mediaId}/delete/`),

  // Start attempt
  startAttempt: (quizId: number) =>
    client.post<ApiResponse<StartAttemptResponse>>(`/quizzes/${quizId}/start/`),

  // Submit attempt
  submitAttempt: (attemptId: number, answers: SubmitAnswerPayload[]) =>
    client.post<ApiResponse<AttemptResult>>(`/quizzes/attempts/${attemptId}/submit/`, { answers }),

  // Attempt history
  getAttemptHistory: (quizId: number) =>
    client.get<PaginatedResponse<AttemptListItem>>(`/quizzes/${quizId}/attempts/`),

  // Attempt detail
  getAttemptDetail: (attemptId: number) =>
    client.get<ApiResponse<AttemptResult>>(`/quizzes/attempts/${attemptId}/`),
};
