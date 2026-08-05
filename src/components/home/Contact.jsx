import React, { useState, useCallback, useRef, Suspense } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { styles } from "../../styles";
import { SectionWrapper } from "../../hoc";
import { slideIn, fadeIn } from "../../utils/motion";
import DOMPurify from "dompurify";

// Lazy load EarthCanvas component with a default fallback
const EarthCanvas = React.lazy(() => import("../canvas/Earth"));

const ContactSuccessMessage = ({ onReset }) => (
  <motion.div
    variants={fadeIn("up", "tween", 0.1, 0.5)}
    initial="hidden"
    animate="show"
    className="flex-[0.75] rounded-2xl border border-[#915eff]/30 bg-black-100 p-10 text-center"
    role="status"
    aria-live="polite"
  >
    <div
      className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#915eff]/20 text-3xl"
      aria-hidden="true"
    >
      ✓
    </div>

    <h3 className="text-2xl font-bold text-white">
      Message Sent Successfully
    </h3>

    <p className="mx-auto mt-4 max-w-lg leading-7 text-secondary">
      Thank you for getting in touch.
      <br />
      <br />
      Your message has been received successfully. I'll review it and get back
      to you within <span className="font-semibold text-white">1–2 business days</span>.
    </p>

    <button
      type="button"
      onClick={onReset}
      className="mt-8 rounded-lg bg-[#915eff] px-8 py-3 font-semibold text-white transition hover:bg-[#7c4dff]"
    >
      Send Another Message
    </button>
  </motion.div>
);

const Contact = () => {
  const formRef = useRef();

const [form, setForm] = useState({
  name: "",
  email: "",
  message: "",
});

const [loading, setLoading] = useState(false);
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState("");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
  async (e) => {
    e.preventDefault();

    setError("");

    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Luvin Fernandes",
          from_email: form.email,
          to_email: "luvinfernandes26@gmail.com",
          reply_to: form.email,
          message: DOMPurify.sanitize(form.message),
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      setForm({
        name: "",
        email: "",
        message: "",
      });

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to send your message. Please try again in a few minutes."
      );
    } finally {
      setLoading(false);
    }
  },
  [form]
);

const handleReset = () => {
  setSubmitted(false);

  setForm({
    name: "",
    email: "",
    message: "",
  });

  setError("");
};
if (submitted) {
  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      <ContactSuccessMessage onReset={handleReset} />

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center text-white">
              Loading Earth...
            </div>
          }
        >
          <EarthCanvas />
        </Suspense>
      </motion.div>
    </div>
  );
}
  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden">
      {/* Contact form section */}
      <motion.div variants={slideIn("left", "tween", 0.2, 1)} className="flex-[0.75] bg-black-100 p-8 rounded-2xl">
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

         {error && (
    <div
      className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
      role="alert"
    >
      {error}
    </div>
  )}

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          {/* Name */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          {/* Email */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          {/* Message */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary transition hover:bg-[#2b1d62] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </motion.div>

      {/* Earth Canvas */}
      <motion.div variants={slideIn("right", "tween", 0.2, 1)} className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
        {/* Suspense with a more styled fallback */}
        <Suspense fallback={<div className="flex justify-center items-center h-full text-white">Loading Earth...</div>}>
          <EarthCanvas />
        </Suspense>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
