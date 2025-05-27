import { motion } from "framer-motion";
import { styles } from "../styles";
import { ReactTyped } from "react-typed";
import { lazy, useEffect, useState, Suspense } from "react";

// Lazy load ComputersCanvas
const ComputersCanvas = lazy(() => import('./canvas/Computers'));

const Hero = () => {
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    // Delay 3D component loading by 500ms
    const timeout = setTimeout(() => setShowCanvas(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        {/* Left Marker */}
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>

        {/* Hero Text */}
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#915EFF]'>Luvin</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I am a{" "}
            <span className="text-[#915EFF]">
              <ReactTyped
                strings={[
                  "React Developer",
                  "Web Application Developer",
                  "React Native Developer",
                  "Project Manager"
                ]}
                typeSpeed={60}
                backSpeed={40}
                loop
                cursorChar="_"
                showCursor={true}
              />
            </span>
          </p>
        </div>
      </div>

      {/* Load 3D Canvas only after text is shown */}
      {showCanvas && (
        <Suspense fallback={<div className="text-white text-center mt-10">Loading Canvas...</div>}>
          <ComputersCanvas />
        </Suspense>
      )}

      {/* Scroll Down Indicator */}
      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
