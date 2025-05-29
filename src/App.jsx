import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy-loaded components
const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Experience = lazy(() => import('./components/Experience'));
const Tech = lazy(() => import('./components/Tech'));
const Contact = lazy(() => import('./components/Contact'));
const Works = lazy(() => import('./components/Works'));
const Feedbacks = lazy(() => import('./components/Feedbacks'));
const Navbar = lazy(() => import('./components/Navbar'));
const StarsCanvas = lazy(() => import('./components/canvas/Stars'));

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
            <Hero />
          </Suspense>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <About />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <Experience />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <Tech />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <Works />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <Feedbacks />
        </Suspense>

        <div className="relative z-0">
          <Suspense fallback={<div>Loading...</div>}>
            <Contact />
            <StarsCanvas />
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
