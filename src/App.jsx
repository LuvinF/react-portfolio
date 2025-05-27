import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Navbar, Works, StarsCanvas } from "./components";
import { lazy } from "react";
const Hero = lazy(() => import('./components/Hero'))
const Tech = lazy(() => import('./components/Tech'))

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
