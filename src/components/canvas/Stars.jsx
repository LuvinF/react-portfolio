import { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

// Optimized Stars component
const Stars = (props) => {
  const ref = useRef();

  // Memoize the sphere points to avoid re-calculation on every render
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }), []);

  useFrame((state, delta) => {
    // Rotate the stars only when necessary
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// Optimized StarsCanvas component
const StarsCanvas = () => {
  return (
    <div className="w-full h-auto absolute inset-0 z-[-1]">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        shadows
        dpr={[1, 2]} // Set device pixel ratio for better quality
        gl={{ antialias: true }} // Antialiasing for smoother rendering
        frameloop="demand" // Optimize by reducing the number of frames per second
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
