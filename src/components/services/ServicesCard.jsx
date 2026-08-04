import { motion } from "framer-motion";

import { fadeIn } from "../../utils/motion";

const ServicesCard = ({ service, index }) => {
  const { title, description, icon, outcomes = [] } = service;

  return (
    <motion.article
      variants={fadeIn("up", "tween", index * 0.1, 0.5)}
      className="group rounded-2xl border border-white/10 bg-black-100 p-8 transition duration-300 hover:-translate-y-1 hover:border-white/25"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-tertiary">
        <img src={icon} alt="" className="h-8 w-8 object-contain" />
      </div>

      <h3 className="mt-7 text-xl font-bold text-white">{title}</h3>

      {description && <p className="mt-4 leading-7 text-secondary">{description}</p>}

      {outcomes.length > 0 && (
        <ul className="mt-6 space-y-3">
          {outcomes.map((outcome) => (
            <li
              key={outcome}
              className="flex items-center gap-3 text-sm text-white/80"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#915EFF]"
              />
              {outcome}
            </li>
          ))}
        </ul>
      )}
    </motion.article>
  );
};

export default ServicesCard;
