import { motion } from "framer-motion";

import { styles } from "../../styles";
import { fadeIn, textVariant } from "../../utils/motion";

const ServicesHero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_rgba(145,94,255,0.18),_transparent_38%)]" />

      <div className={`${styles.paddingX} max-w-7xl mx-auto`}>
        <motion.div variants={textVariant()} initial="hidden" animate="show">
          <p className={styles.sectionSubText}>AI & software development</p>

          <h1 className={`${styles.heroHeadText} max-w-4xl`}>
            Build digital products that move your business forward.
          </h1>
        </motion.div>

        <motion.div
          variants={fadeIn("up", "tween", 0.2, 0.8)}
          initial="hidden"
          animate="show"
          className="mt-8 max-w-2xl"
        >
          <p className={`${styles.heroSubText} text-secondary`}>
            I help startups and businesses turn ideas into fast, scalable,
            user-focused web applications and AI-powered solutions.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-lg bg-tertiary px-7 py-4 font-semibold text-white transition hover:bg-[#2b1d62]"
            >
              Start a project
            </a>

            <a
              href="#services"
              className="rounded-lg border border-white/20 px-7 py-4 font-semibold text-white transition hover:border-white/50"
            >
              Explore services
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesHero;