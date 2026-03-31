import Navbar from "./components/landing/Navbar";
import Hero from "./components/landing/Hero";
import About from "./components/landing/About";
import Courses from "./components/landing/Courses";
import BentoGrid from "./components/landing/BentoGrid";
import Pricing from "./components/landing/Pricing";
import Testimonials from "./components/landing/Testimonials";
import CTA from "./components/landing/CTA";
import Footer from "./components/landing/Footer";

function App() {
  return (
    <div className="bg-white min-w-full text-on-surface font-body selection:bg-primary/20 selection:text-primary overflow-x-hidden">
      <Navbar onAuth={() => { window.location.href = '/login'; }} />
      <Hero />
      <About />
      <Courses onSelect={(course) => {
        window.location.href = `/course/${course.id}`;
      }} />
      <BentoGrid />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
