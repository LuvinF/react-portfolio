import { motion } from "framer-motion";

import { services } from "../../constants/services";
import { styles } from "../../styles";
import { staggerContainer, textVariant } from "../../utils/motion";
import ServicesCard from "./ServicesCard";

const ServicesGrid = () => {
  return (
    <section id="services" className={`${styles.padding} max-w-7xl mx-auto`}>
      <motion.div
        variants={textVariant()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <p className={styles.sectionSubText}>What I can help you build</p>
        <h2 className={styles.sectionHeadText}>Services.</h2>

        <p className="mt-5 max-w-3xl leading-7 text-secondary">
          From an early product idea to a polished and scalable digital
          experience, I work across the technical pieces needed to move your
          business forward.
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="mt-12 grid gap-6 md:grid-cols-2"
      >
        {services.map((service, index) => (
          <ServicesCard key={service.title} service={service} index={index} />
        ))}
      </motion.div>
    </section>
  );
};

export default ServicesGrid;