import { motion } from "framer-motion";

import { fadeIn } from "../../utils/motion";

const CTA = () => {
  return (
    <section className="px-6 py-16 sm:px-16 sm:py-24">
      <motion.div
        variants={fadeIn("up", "tween", 0.1, 0.6)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-tertiary px-8 py-14 text-center sm:px-14 sm:py-20"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(145,94,255,0.45),_transparent_42%)]" />

        <p className="text-sm font-semibold uppercase tracking-wider text-[#bca7ff]">
          Have a project in mind?
        </p>

        <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">
          Let’s turn your idea into a product people want to use.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl leading-7 text-[#dfd9ff]">
          Tell me what you are building, where you need support, and what
          success looks like. I’ll help you identify a practical next step.
        </p>

        <a
          href="#contact"
          className="mt-10 inline-flex rounded-lg bg-white px-7 py-4 font-bold text-tertiary transition hover:bg-[#dfd9ff]"
        >
          Start a conversation
        </a>
      </motion.div>
    </section>
  );
};

export default CTA;