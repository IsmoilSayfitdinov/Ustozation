import { useParams, useNavigate, Navigate } from 'react-router-dom';
import Parent from '@/pages/public/landing/Parent';
import Login from '@/pages/public/auth/Login';
import Register from '@/pages/public/auth/Register';
import CourseDetail from '@/components/landing/CourseDetail';
import { LEVELS } from '@/data/courses';
import { useLandingPage } from '@/hooks/useLanding';
import { useMemo } from 'react';

const CourseDetailRoute = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: landing } = useLandingPage();

  // Build merged levels from API + presentation config
  const levels = useMemo(() => {
    if (!landing?.levels || landing.levels.length === 0) return LEVELS;
    return landing.levels
      .sort((a, b) => a.order - b.order)
      .map((apiLevel, idx) => {
        const config = LEVELS.find(l => l.id === apiLevel.slug) || LEVELS[idx] || LEVELS[0];
        return {
          ...config,
          id: apiLevel.slug || config.id,
          code: apiLevel.name,
          title: apiLevel.name,
          desc: apiLevel.description || config.desc,
        };
      });
  }, [landing]);

  const course = levels.find((l) => l.id === id);

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
  { path: '/', element: <Parent /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/course/:id', element: <CourseDetailRoute /> },
];
