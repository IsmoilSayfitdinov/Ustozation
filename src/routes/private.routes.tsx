import StudentHome from '@/pages/private/student/Home';
import StudentLessons from '@/pages/private/student/Lessons';
import StudentTests from '@/pages/private/student/Tests';
import StudentRating from '@/pages/private/student/Rating';
import StudentAnalytics from '@/pages/private/student/Analytics';
import StudentProfile from '@/pages/private/student/Profile';
import StudentReview from '@/pages/private/student/Review';
import StudentLayout from '@/layouts/student/StudentLayout';

// Eventually add AdminHome here
import AdminHome from '@/pages/private/admin/Home';
import AdminLayout from '@/layouts/admin/AdminLayout';
import AdminStudents from '@/pages/private/admin/Students';
import AdminStudentDetail from '@/pages/private/admin/StudentDetail';
import AdminLessons from '@/pages/private/admin/Lessons';
import AdminTests from '@/pages/private/admin/Tests';
import AdminReports from '@/pages/private/admin/Reports';
import AdminAnalytics from '@/pages/private/admin/Analytics';
import AdminRating from '@/pages/private/admin/Rating';

export const privateRoutes = [
  {
    path: '/student',
    element: <StudentLayout />,
    children: [
      {
        path: 'dashboard',
        element: <StudentHome />,
      },
      {
        path: 'lessons',
        element: <StudentLessons />,
      },
      {
        path: 'tests',
        element: <StudentTests />,
      },
      {
        path: 'rating',
        element: <StudentRating />,
      },
      {
        path: 'analytics',
        element: <StudentAnalytics />,
      },
      {
        path: 'profile',
        element: <StudentProfile />,
      },
      {
        path: 'review',
        element: <StudentReview />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: <AdminHome />,
      },
      {
        path: 'students',
        element: <AdminStudents />,
      },
      {
        path: 'students/:id',
        element: <AdminStudentDetail />,
      },
      {
        path: 'lessons',
        element: <AdminLessons />,
      },
      {
        path: 'tests',
        element: <AdminTests />,
      },
      {
        path: 'reports',
        element: <AdminReports />,
      },
      {
        path: 'analytics',
        element: <AdminAnalytics />,
      },
      {
        path: 'rating',
        element: <AdminRating />,
      },
    ],
  },
];







