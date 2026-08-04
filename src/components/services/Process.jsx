import { motion } from "framer-motion";

import { developmentProcess } from "../../constants/services";
import { styles } from "../../styles";
import { fadeIn, staggerContainer, textVariant } from "../../utils/motion";

const Process = () => {
  return (
    <section className={`${styles.padding} max-w-7xl mx-auto`}>
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <p className={styles.sectionSubText}>A simple, collaborative workflow</p>
        <h2 className={styles.sectionHeadText}>Development process.</h2>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.15, 0.15)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="relative mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {developmentProcess.map((item, index) => (
          <motion.article
            key={item.step}
            variants={fadeIn("up", "tween", index * 0.1, 0.5)}
            className="relative rounded-2xl border border-white/10 bg-black-100 p-7"
          >
            <span className="text-sm font-bold tracking-widest text-[#915EFF]">
              STEP {item.step}
            </span>

            <h3 className="mt-5 text-2xl font-bold text-white">
              {item.title}
            </h3>

            <p className="mt-4 leading-7 text-secondary">{item.description}</p>

            {index < developmentProcess.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -right-4 top-1/2 hidden h-px w-8 bg-white/20 xl:block"
              />
            )}
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Process;