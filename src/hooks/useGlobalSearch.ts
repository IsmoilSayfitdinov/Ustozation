import { useMemo } from 'react';
import { useCourses } from './useCourses';
import { useTeachers } from './useAuth';

export interface SearchResult {
  id: string;
  type: 'page' | 'student' | 'group' | 'teacher' | 'action';
  title: string;
  subtitle?: string;
  path: string;
  icon: string;
}

const PAGES: SearchResult[] = [
  { id: 'p-dashboard', type: 'page', title: 'Bosh sahifa', subtitle: 'Dashboard', path: '/admin/dashboard', icon: 'LayoutGrid' },
  { id: 'p-students', type: 'page', title: 'Talabalar', subtitle: "Talabalar ro'yxati", path: '/admin/students', icon: 'Users' },
  { id: 'p-groups', type: 'page', title: 'Guruhlar', subtitle: 'Guruhlar boshqaruvi', path: '/admin/groups', icon: 'Layers' },
  { id: 'p-lessons', type: 'page', title: "O'quv dasturi", subtitle: 'Daraja, modul, darslar', path: '/admin/lessons', icon: 'Book' },
  { id: 'p-tests', type: 'page', title: 'Testlar', subtitle: 'Test yaratish va boshqarish', path: '/admin/tests', icon: 'CheckSquare' },
  { id: 'p-rating', type: 'page', title: 'Reyting', subtitle: 'Talabalar reytingi', path: '/admin/rating', icon: 'Award' },
  { id: 'p-analytics', type: 'page', title: 'Analitika', subtitle: 'Kurs statistikasi', path: '/admin/analytics', icon: 'PieChart' },
  { id: 'p-reports', type: 'page', title: 'Hisobotlar', subtitle: 'PDF eksport', path: '/admin/reports', icon: 'FileText' },
  { id: 'p-teachers', type: 'page', title: "O'qituvchilar", subtitle: "O'qituvchi qo'shish", path: '/admin/teachers', icon: 'GraduationCap' },
  { id: 'p-landing', type: 'page', title: 'Landing sahifa', subtitle: 'Sayt boshqaruvi', path: '/admin/landing', icon: 'Globe' },
];

export function useGlobalSearch(query: string) {
  const { data: courses } = useCourses();
  const { data: teachers } = useTeachers();

  const results = useMemo<SearchResult[]>(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    const items: SearchResult[] = [];

    // 1. Pages
    for (const page of PAGES) {
      if (page.title.toLowerCase().includes(q) || page.subtitle?.toLowerCase().includes(q)) {
        items.push(page);
      }
    }

    // 2. Groups/Courses
    if (courses) {
      for (const course of courses) {
        if (
          course.title.toLowerCase().includes(q) ||
          (course.teacher?.full_name || course.teacher?.username || '').toLowerCase().includes(q) ||
          course.level.name.toLowerCase().includes(q)
        ) {
          items.push({
            id: `g-${course.id}`,
            type: 'group',
            title: course.title,
            subtitle: `${course.level.name} · ${course.teacher?.full_name || course.teacher?.username} · ${course.student_count} talaba`,
            path: '/admin/groups',
            icon: 'Layers',
          });
        }
      }
    }

    // 3. Teachers
    if (teachers) {
      for (const t of teachers) {
        const name = t.profile?.full_name || t.username;
        if (name.toLowerCase().includes(q) || t.username.toLowerCase().includes(q)) {
          items.push({
            id: `t-${t.id}`,
            type: 'teacher',
            title: name,
            subtitle: `@${t.username} · ${t.is_active ? 'Aktiv' : 'Nofaol'}`,
            path: '/admin/teachers',
            icon: 'GraduationCap',
          });
        }
      }
    }

    return items.slice(0, 12);
  }, [query, courses, teachers]);

  const grouped = useMemo(() => {
    const map: Record<string, SearchResult[]> = {};
    for (const r of results) {
      const key = r.type;
      if (!map[key]) map[key] = [];
      map[key].push(r);
    }
    return map;
  }, [results]);

  const TYPE_LABELS: Record<string, string> = {
    page: 'Sahifalar',
    group: 'Guruhlar',
    teacher: "O'qituvchilar",
    student: 'Talabalar',
    action: 'Amallar',
  };

  return { results, grouped, typeLabels: TYPE_LABELS, isEmpty: results.length === 0 };
}
