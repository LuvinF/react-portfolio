import { motion } from "framer-motion";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary overflow-hidden">
      {/* Background glow */}
      <div className="absolute h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Rotating rings */}
      <motion.div
        className="absolute h-40 w-40 rounded-full border border-cyan-400/40"
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute h-28 w-28 rounded-full border border-green-400/50"
        animate={{ rotate: -360 }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Core */}
      <motion.div
        className="h-5 w-5 rounded-full bg-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.9)]"
        animate={{
          scale: [1, 1.5, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
        }}
      />

      {/* Text */}
      <motion.p
        className="absolute bottom-32 font-mono tracking-[0.35em] text-cyan-300"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          repeat: Infinity,
          duration: 1.4,
        }}
      >
        INITIALIZING SYSTEM...
      </motion.p>
    </div>
  );
};

export default PageLoader;