import client from "./client";
import type {
  ApiResponse,
  Course,
  CourseLesson,
  CourseStudent,
  Lesson,
  LessonCreatePayload,
  Level,
  LevelDetail,
  Module,
  ModuleCreatePayload,
  PaginatedResponse,
} from "@/types/api";

export const coursesApi = {
  // Levels
  getLevels: () =>
    client.get<PaginatedResponse<Level>>("/courses/levels/"),

  getLevelDetail: (id: number) =>
    client.get<LevelDetail>(`/courses/levels/${id}/`),

  createLevel: (data: { name: string; slug: string; description: string; order: number }) =>
    client.post<ApiResponse<Level>>("/courses/levels/", data),

  updateLevel: (id: number, data: Partial<{ name: string; slug: string; description: string; order: number }>) =>
    client.put<Level>(`/courses/levels/${id}/`, data),

  deleteLevel: (id: number) =>
    client.delete(`/courses/levels/${id}/`),

  // Modules
  getModules: (levelId: number) =>
    client.get<PaginatedResponse<Module>>(`/courses/levels/${levelId}/modules/`),

  createModule: (levelId: number, data: ModuleCreatePayload) =>
    client.post<ApiResponse<Module>>(`/courses/levels/${levelId}/modules/`, data),

  getModule: (id: number) =>
    client.get<Module>(`/courses/modules/${id}/`),

  updateModule: (id: number, data: Partial<ModuleCreatePayload>) =>
    client.put<Module>(`/courses/modules/${id}/`, data),

  deleteModule: (id: number) =>
    client.delete(`/courses/modules/${id}/`),

  // Lessons
  getLessons: (moduleId: number) =>
    client.get<PaginatedResponse<Lesson>>(`/courses/modules/${moduleId}/lessons/`),

  createLesson: (moduleId: number, data: LessonCreatePayload) =>
    client.post<ApiResponse<Lesson>>(`/courses/modules/${moduleId}/lessons/`, data),

  getLesson: (id: number) =>
    client.get<Lesson>(`/courses/lessons/${id}/`),

  updateLesson: (id: number, data: Partial<LessonCreatePayload>) =>
    client.put<Lesson>(`/courses/lessons/${id}/`, data),

  deleteLesson: (id: number) =>
    client.delete(`/courses/lessons/${id}/`),

  // Courses
  getCourses: () =>
    client.get<PaginatedResponse<Course>>("/courses/"),

  createCourse: (data: { title: string; level: number; max_students?: number }) =>
    client.post<ApiResponse<Course>>("/courses/create/", data),

  updateCourse: (id: number, data: { title?: string; max_students?: number; is_active?: boolean }) =>
    client.put<Course>(`/courses/${id}/edit/`, data),

  deleteCourse: (id: number) =>
    client.delete(`/courses/${id}/delete/`),

  // Enrollment
  enroll: (courseId: number) =>
    client.post<ApiResponse<null>>("/courses/enroll/", { course_id: courseId }),

  unenroll: (courseId: number) =>
    client.post<ApiResponse<null>>(`/courses/${courseId}/unenroll/`),

  // Course lessons
  getCourseLessons: (courseId: number) =>
    client.get<PaginatedResponse<CourseLesson>>(`/courses/${courseId}/lessons/`),

  toggleLesson: (courseId: number, lessonId: number, unlock: boolean) =>
    client.post<ApiResponse<null>>(`/courses/${courseId}/lessons/toggle/`, {
      lesson_id: lessonId,
      unlock,
    }),

  // Course students
  getCourseStudents: (courseId: number) =>
    client.get<PaginatedResponse<CourseStudent>>(`/courses/${courseId}/students/`),
};
