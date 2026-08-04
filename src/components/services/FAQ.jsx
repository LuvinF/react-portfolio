import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { faqs } from "../../constants/faq";
import { styles } from "../../styles";
import { fadeIn, staggerContainer, textVariant } from "../../utils/motion";

const FAQItem = ({ faq, isOpen, onToggle, index }) => {
  return (
    <motion.article
      variants={fadeIn("up", "tween", index * 0.08, 0.4)}
      className="border-b border-white/10"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-lg font-semibold text-white">{faq.question}</span>

        <span
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-xl text-[#915EFF]"
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-6 leading-7 text-secondary">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <section className="bg-black-100">
      <div className={`${styles.padding} max-w-4xl mx-auto`}>
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className={styles.sectionSubText}>Answers before we begin</p>
          <h2 className={styles.sectionHeadText}>Frequently asked questions.</h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1, 0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-10"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;