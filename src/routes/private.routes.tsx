import { lazy, Suspense } from 'react';
import StudentLayout from '@/layouts/student/StudentLayout';
import AdminLayout from '@/layouts/admin/AdminLayout';
import AuthGuard from './AuthGuard';

// Lazy load all pages for code splitting
const StudentHome = lazy(() => import('@/pages/private/student/Home'));
const StudentLessons = lazy(() => import('@/pages/private/student/Lessons'));
const StudentTests = lazy(() => import('@/pages/private/student/Tests'));
const StudentRating = lazy(() => import('@/pages/private/student/Rating'));
const StudentAnalytics = lazy(() => import('@/pages/private/student/Analytics'));
const StudentProfile = lazy(() => import('@/pages/private/student/Profile'));
const StudentReview = lazy(() => import('@/pages/private/student/Review'));

const AdminHome = lazy(() => import('@/pages/private/admin/Home'));
const AdminStudents = lazy(() => import('@/pages/private/admin/Students'));
const AdminStudentDetail = lazy(() => import('@/pages/private/admin/StudentDetail'));
const AdminLessons = lazy(() => import('@/pages/private/admin/Lessons'));
const AdminTests = lazy(() => import('@/pages/private/admin/Tests'));
const AdminReports = lazy(() => import('@/pages/private/admin/Reports'));
const AdminAnalytics = lazy(() => import('@/pages/private/admin/Analytics'));
const AdminRating = lazy(() => import('@/pages/private/admin/Rating'));
const AdminGroups = lazy(() => import('@/pages/private/admin/Groups'));
const AdminLanding = lazy(() => import('@/pages/private/admin/Landing'));
const AdminTeachers = lazy(() => import('@/pages/private/admin/Teachers'));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const S = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageLoader />}>{children}</Suspense>
);

export const privateRoutes = [
  {
    element: <AuthGuard allowedRoles={["student"]} />,
    children: [
      {
        path: '/student',
        element: <StudentLayout />,
        children: [
          { path: 'dashboard', element: <S><StudentHome /></S> },
          { path: 'lessons', element: <S><StudentLessons /></S> },
          { path: 'tests', element: <S><StudentTests /></S> },
          { path: 'rating', element: <S><StudentRating /></S> },
          { path: 'analytics', element: <S><StudentAnalytics /></S> },
          { path: 'profile', element: <S><StudentProfile /></S> },
          { path: 'review', element: <S><StudentReview /></S> },
        ],
      },
    ],
  },
  {
    element: <AuthGuard allowedRoles={["teacher", "admin"]} />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          { path: 'dashboard', element: <S><AdminHome /></S> },
          { path: 'students', element: <S><AdminStudents /></S> },
          { path: 'students/:id', element: <S><AdminStudentDetail /></S> },
          { path: 'groups', element: <S><AdminGroups /></S> },
          { path: 'lessons', element: <S><AdminLessons /></S> },
          { path: 'tests', element: <S><AdminTests /></S> },
          { path: 'reports', element: <S><AdminReports /></S> },
          { path: 'analytics', element: <S><AdminAnalytics /></S> },
          { path: 'rating', element: <S><AdminRating /></S> },
        ],
      },
    ],
  },
  {
    element: <AuthGuard allowedRoles={["admin"]} />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          { path: 'landing', element: <S><AdminLanding /></S> },
          { path: 'teachers', element: <S><AdminTeachers /></S> },
        ],
      },
    ],
  },
];
