import { useState } from 'react';
import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import About from "./components/landing/About";
import Courses from "./components/landing/Courses";
import BentoGrid from "./components/landing/BentoGrid";
import Pricing from "./components/landing/Pricing";
import Testimonials from "./components/landing/Testimonials";
import CTA from "./components/landing/CTA";
import Footer from "./components/landing/Footer";
import CourseDetail from "./components/landing/CourseDetail";
import Login from "./pages/public/auth/Login";
import Register from "./pages/public/auth/Register";
import StudentHome from "./pages/private/student/Home";
import { CourseLevel } from './data/courses';

function App() {
  const [selectedCourse, setSelectedCourse] = useState<CourseLevel | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);
  const [userRole, setUserRole] = useState<'student' | 'admin' | null>(null);

  const closeAuth = () => setAuthMode(null);
  const openLogin = () => {
    setAuthMode('login');
    setSelectedCourse(null);
    window.scrollTo(0, 0);
  };
  const openRegister = () => {
    setAuthMode('register');
    setSelectedCourse(null);
    window.scrollTo(0, 0);
  };

  const handleLogin = (data: any) => {
    console.log('Login data:', data);
    setUserRole('student'); // Simulate student login
    setAuthMode(null);
  };

  const handleRegister = (data: any) => {
    console.log('Register data:', data);
    setUserRole('student'); // Simulate student register
    setAuthMode(null);
  };

  // If logged in as student, show student dashboard
  if (userRole === 'student') {
    return <StudentHome />;
  }

  return (
    <div className="bg-white min-w-full text-on-surface font-body selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      {authMode === null && <Navbar onAuth={openLogin} />}
      
      {authMode === 'login' ? (
        <Login onRegister={openRegister} onLogin={handleLogin} />
      ) : authMode === 'register' ? (
        <Register onLogin={openLogin} onRegister={handleRegister} />
      ) : selectedCourse ? (
        <CourseDetail 
          course={selectedCourse} 
          onBack={() => {
            setSelectedCourse(null);
            window.scrollTo(0, 0);
          }} 
          onSelectCourse={(course) => {
            setSelectedCourse(course);
            window.scrollTo(0, 0);
          }}
        />
      ) : (
        <>
          <Hero />
          <About />
          <Courses onSelect={(course) => {
            setSelectedCourse(course);
            window.scrollTo(0, 0);
          }} />
          <BentoGrid />
          <Pricing />
          <Testimonials />
          <CTA />
        </>
      )}
      
      {authMode === null && <Footer />}
    </div>
  );
}

export default App;
