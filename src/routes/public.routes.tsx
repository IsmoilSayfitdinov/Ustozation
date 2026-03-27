import { Navigate, useParams, useNavigate } from 'react-router-dom';
import Parent from '@/pages/public/landing/Parent';
import Login from '@/pages/public/auth/Login';
import Register from '@/pages/public/auth/Register';
import CourseDetail from '@/components/landing/CourseDetail';
import { LEVELS } from '@/data/courses';

const CourseDetailRoute = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = LEVELS.find((l) => l.id === id);

  if (!course) return <Navigate to="/" replace />;

  return (
    <CourseDetail 
      course={course}
      onBack={() => navigate('/')}
      onSelectCourse={(newCourse) => navigate(`/course/${newCourse.id}`)}
    />
  );
};

export const publicRoutes = [
  {
    path: '/',
    element: <Parent />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/course/:id',
    element: <CourseDetailRoute />,
  },
];
