// Tech.js
import React, { lazy, Suspense, memo } from "react";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

// Lazy-load the BallCanvas component
const BallCanvas = lazy(() => import("./canvas/Ball"));

// Import IntersectionObserver hook
import { useInView } from "react-intersection-observer";

// Tech Component
const Tech = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => {
        // Initialize IntersectionObserver for each technology
        const { ref, inView } = useInView({ triggerOnce: true });

        return (
          <div ref={ref} className="w-28 h-28" key={technology.name}>
            {/* Render BallCanvas only when it is in view */}
            {inView && (
              <Suspense fallback={<div>Loading...</div>}>
                <BallCanvas icon={technology.icon} />
              </Suspense>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SectionWrapper(memo(Tech), "");
