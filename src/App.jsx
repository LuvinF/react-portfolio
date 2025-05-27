import { BrowserRouter } from "react-router-dom";

import { About, Experience, Feedbacks, Navbar, StarsCanvas } from "./components";
import { lazy } from "react";
const Hero = lazy(() => import('./components/Hero'))
const Tech = lazy(() => import('./components/Tech'))
const Contact = lazy(() => import('./components/Contact'))
const Works = lazy(() => import('./components/Works'))

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
