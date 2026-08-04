import { motion } from "framer-motion";

import { reasonsToChooseMe } from "../../constants/services";
import { styles } from "../../styles";
import { fadeIn, staggerContainer, textVariant } from "../../utils/motion";

const WhyChooseMe = () => {
  return (
    <section className="bg-black-100">
      <div className={`${styles.padding} max-w-7xl mx-auto`}>
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className={styles.sectionSubText}>A reliable technical partner</p>
          <h2 className={styles.sectionHeadText}>Why work with me?</h2>
        </motion.div>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.p
            variants={fadeIn("right", "tween", 0.15, 0.7)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-xl text-lg leading-8 text-secondary"
          >
            You need more than someone who can write code. You need a partner
            who understands the product, communicates clearly, and builds with
            the next stage of your business in mind.
          </motion.p>

          <motion.div
            variants={staggerContainer(0.15, 0.2)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-4"
          >
            {reasonsToChooseMe.map((reason, index) => (
              <motion.article
                key={reason.number}
                variants={fadeIn("up", "tween", index * 0.1, 0.5)}
                className="flex gap-5 rounded-2xl border border-white/10 bg-tertiary/40 p-6 sm:p-7"
              >
                <span className="text-lg font-black text-[#915EFF]">
                  {reason.number}
                </span>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    {reason.title}
                  </h3>

                  <p className="mt-3 leading-7 text-secondary">
                    {reason.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMe;