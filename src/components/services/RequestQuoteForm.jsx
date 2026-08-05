import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import DOMPurify from "dompurify";

import { pricing } from "../../constants/pricing";
import {
  ACCEPTED_FILE_TYPES,
  budgetOptions,
  MAX_FILE_SIZE_BYTES,
  timelineOptions,
} from "../../constants/quoteForm";
import { styles } from "../../styles";
import { fadeIn } from "../../utils/motion";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const INITIAL_FORM = {
  fullName: "",
  companyName: "",
  email: "",
  phone: "",
  service: "",
  projectTitle: "",
  projectDescription: "",
  projectGoals: "",
  requirements: "",
  budget: "",
  timeline: "",
  additionalNotes: "",
};

const fieldClassName =
  "bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border border-transparent font-medium transition focus:border-[#915eff]";

const fieldErrorClassName = "border-red-500 focus:border-red-500";

const sanitize = (value) => DOMPurify.sanitize(value.trim());

const getBudgetLabel = (value) =>
  budgetOptions.find((option) => option.value === value)?.label ?? value;

const getTimelineLabel = (value) =>
  timelineOptions.find((option) => option.value === value)?.label ?? value;

const FormField = ({
  id,
  label,
  required = false,
  error,
  children,
  className = "",
}) => (
  <div className={`flex flex-col ${className}`}>
    <label htmlFor={id} className="mb-4 font-medium text-white">
      {label}
      {required ? (
        <span className="ml-1 text-[#915eff]" aria-hidden="true">
          *
        </span>
      ) : (
        <span className="ml-2 text-sm font-normal text-secondary">(optional)</span>
      )}
    </label>
    {children}
    {error ? (
      <p id={`${id}-error`} className="mt-2 text-sm text-red-400" role="alert">
        {error}
      </p>
    ) : null}
  </div>
);

const SuccessMessage = ({ serviceTitle, onReset }) => (
  <motion.div
    variants={fadeIn("up", "tween", 0.1, 0.5)}
    initial="hidden"
    animate="show"
    className="rounded-2xl border border-[#915eff]/30 bg-tertiary p-10 text-center"
    role="status"
    aria-live="polite"
  >
    <div
      className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#915eff]/20 text-3xl"
      aria-hidden="true"
    >
      ✓
    </div>
    <h3 className="text-2xl font-bold text-white">Quote request received</h3>
    <p className="mx-auto mt-4 max-w-lg leading-7 text-secondary">
      Thank you for your interest in{" "}
      <span className="font-semibold text-white">{serviceTitle}</span>. I&apos;ll
      review your project details and get back to you within 1–2 business days.
    </p>
    <button
      type="button"
      onClick={onReset}
      className="mt-8 rounded-lg bg-[#915eff] px-8 py-3 font-semibold text-white transition hover:bg-[#7c4dff]"
    >
      Submit another request
    </button>
  </motion.div>
);

const RequestQuoteForm = () => {
  const [searchParams] = useSearchParams();
  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedServiceTitle, setSubmittedServiceTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const serviceOptions = useMemo(
    () =>
      pricing.map((item) => ({
        value: item.id,
        label: item.title,
      })),
    []
  );

  const selectedServiceTitle = useMemo(() => {
    const match = pricing.find((item) => item.id === form.service);
    return match?.title ?? "your selected service";
  }, [form.service]);

  useEffect(() => {
    const serviceParam = searchParams.get("service");
    if (!serviceParam) return;

    const isValidService = pricing.some((item) => item.id === serviceParam);
    if (isValidService) {
      setForm((prev) => ({ ...prev, service: serviceParam }));
    }
  }, [searchParams]);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      setSelectedFile(null);
      setErrors((prev) => ({ ...prev, file: undefined }));
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setSelectedFile(null);
      setErrors((prev) => ({
        ...prev,
        file: "File must be 5 MB or smaller.",
      }));
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
    setErrors((prev) => ({ ...prev, file: undefined }));
  }, []);

  const validate = useCallback(() => {
    const nextErrors = {};

    if (!sanitize(form.fullName)) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!sanitize(form.email)) {
      nextErrors.email = "Email address is required.";
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.service) {
      nextErrors.service = "Please select a service.";
    }

    if (!sanitize(form.projectTitle)) {
      nextErrors.projectTitle = "Project title is required.";
    }

    if (!sanitize(form.projectDescription)) {
      nextErrors.projectDescription = "Project description is required.";
    }

    if (!sanitize(form.projectGoals)) {
      nextErrors.projectGoals = "Project goals are required.";
    }

    if (!sanitize(form.requirements)) {
      nextErrors.requirements = "Required features or requirements are needed.";
    }

    if (!form.budget) {
      nextErrors.budget = "Please select an estimated budget.";
    }

    if (!form.timeline) {
      nextErrors.timeline = "Please select a preferred timeline.";
    }

    if (form.phone.trim() && !/^[\d\s+().-]{7,20}$/.test(form.phone.trim())) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [form]);

  const buildEmailMessage = useCallback(() => {
    const lines = [
      "New Quote Request",
      "=================",
      "",
      `Service: ${selectedServiceTitle}`,
      `Full Name: ${sanitize(form.fullName)}`,
      `Company: ${sanitize(form.companyName) || "Not provided"}`,
      `Email: ${sanitize(form.email)}`,
      `Phone: ${sanitize(form.phone) || "Not provided"}`,
      "",
      `Project Title: ${sanitize(form.projectTitle)}`,
      "",
      "Project Description:",
      sanitize(form.projectDescription),
      "",
      "Project Goals:",
      sanitize(form.projectGoals),
      "",
      "Required Features / Requirements:",
      sanitize(form.requirements),
      "",
      `Estimated Budget: ${getBudgetLabel(form.budget)}`,
      `Preferred Timeline: ${getTimelineLabel(form.timeline)}`,
      "",
      "Additional Notes:",
      sanitize(form.additionalNotes) || "None",
    ];

    if (selectedFile) {
      lines.push("", `Attached File: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(1)} KB)`);
    }

    return lines.join("\n");
  }, [form, selectedFile, selectedServiceTitle]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!validate()) {
        const firstErrorField = formRef.current?.querySelector("[aria-invalid='true']");
        firstErrorField?.focus();
        return;
      }

      setLoading(true);

      try {
        const templateParams = {
          from_name: sanitize(form.fullName),
          to_name: "Luvin Fernandes",
          from_email: sanitize(form.email),
          to_email: "luvinfernandes26@gmail.com",
          message: DOMPurify.sanitize(buildEmailMessage()),
          reply_to: sanitize(form.email),
        };

        await emailjs.send(
          import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
          templateParams,
          import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
        );

        setSubmittedServiceTitle(selectedServiceTitle);
        setSubmitted(true);
        setForm(INITIAL_FORM);
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        console.error(error);
        setErrors((prev) => ({
          ...prev,
          form: "Something went wrong while sending your request. Please try again.",
        }));
      } finally {
        setLoading(false);
      }
    },
    [buildEmailMessage, form, selectedServiceTitle, validate]
  );

  const handleReset = useCallback(() => {
    setSubmitted(false);
    setSubmittedServiceTitle("");
    setForm(INITIAL_FORM);
    setErrors({});
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  if (submitted) {
    return (
      <SuccessMessage
        serviceTitle={submittedServiceTitle}
        onReset={handleReset}
      />
    );
  }

  return (
    <motion.form
      ref={formRef}
      variants={fadeIn("up", "tween", 0.1, 0.6)}
      initial="hidden"
      animate="show"
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-white/10 bg-black-100 p-8 sm:p-10"
      aria-label="Request a quote form"
    >
      <p className={styles.sectionSubText}>Project inquiry</p>
      <h2 className={`${styles.sectionHeadText} text-[30px] sm:text-[40px]`}>
        Request a Quote
      </h2>
      <p className="mt-4 max-w-2xl leading-7 text-secondary">
        Share your project details and I&apos;ll prepare a tailored quote based on
        scope, timeline, and requirements.
      </p>

      {errors.form ? (
        <p className="mt-6 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300" role="alert">
          {errors.form}
        </p>
      ) : null}

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <FormField id="fullName" label="Full Name" required error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            placeholder="John Smith"
            autoComplete="name"
            aria-required="true"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={`${fieldClassName} ${errors.fullName ? fieldErrorClassName : ""}`}
          />
        </FormField>

        <FormField id="companyName" label="Company Name" error={errors.companyName}>
          <input
            id="companyName"
            name="companyName"
            type="text"
            value={form.companyName}
            onChange={handleChange}
            placeholder="Your company"
            autoComplete="organization"
            className={fieldClassName}
          />
        </FormField>

        <FormField id="email" label="Email Address" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@company.com"
            autoComplete="email"
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`${fieldClassName} ${errors.email ? fieldErrorClassName : ""}`}
          />
        </FormField>

        <FormField id="phone" label="Phone Number" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={`${fieldClassName} ${errors.phone ? fieldErrorClassName : ""}`}
          />
        </FormField>
      </div>

      <div className="mt-8">
        <FormField id="service" label="Service Needed" required error={errors.service}>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "service-error" : undefined}
            className={`${fieldClassName} cursor-pointer ${errors.service ? fieldErrorClassName : ""}`}
          >
            <option value="" className="bg-black-100">
              Select a service
            </option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-black-100">
                {option.label}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div className="mt-8">
        <FormField id="projectTitle" label="Project Title" required error={errors.projectTitle}>
          <input
            id="projectTitle"
            name="projectTitle"
            type="text"
            value={form.projectTitle}
            onChange={handleChange}
            placeholder="e.g. Customer portal redesign"
            aria-required="true"
            aria-invalid={Boolean(errors.projectTitle)}
            aria-describedby={errors.projectTitle ? "projectTitle-error" : undefined}
            className={`${fieldClassName} ${errors.projectTitle ? fieldErrorClassName : ""}`}
          />
        </FormField>
      </div>

      <div className="mt-8 grid gap-8">
        <FormField
          id="projectDescription"
          label="Project Description"
          required
          error={errors.projectDescription}
        >
          <textarea
            id="projectDescription"
            name="projectDescription"
            rows={5}
            value={form.projectDescription}
            onChange={handleChange}
            placeholder="Describe what you want to build, who it's for, and any context I should know."
            aria-required="true"
            aria-invalid={Boolean(errors.projectDescription)}
            aria-describedby={errors.projectDescription ? "projectDescription-error" : undefined}
            className={`${fieldClassName} resize-y ${errors.projectDescription ? fieldErrorClassName : ""}`}
          />
        </FormField>

        <FormField id="projectGoals" label="Project Goals" required error={errors.projectGoals}>
          <textarea
            id="projectGoals"
            name="projectGoals"
            rows={4}
            value={form.projectGoals}
            onChange={handleChange}
            placeholder="What outcomes should this project achieve?"
            aria-required="true"
            aria-invalid={Boolean(errors.projectGoals)}
            aria-describedby={errors.projectGoals ? "projectGoals-error" : undefined}
            className={`${fieldClassName} resize-y ${errors.projectGoals ? fieldErrorClassName : ""}`}
          />
        </FormField>

        <FormField
          id="requirements"
          label="Required Features / Requirements"
          required
          error={errors.requirements}
        >
          <textarea
            id="requirements"
            name="requirements"
            rows={4}
            value={form.requirements}
            onChange={handleChange}
            placeholder="List must-have features, integrations, platforms, or technical requirements."
            aria-required="true"
            aria-invalid={Boolean(errors.requirements)}
            aria-describedby={errors.requirements ? "requirements-error" : undefined}
            className={`${fieldClassName} resize-y ${errors.requirements ? fieldErrorClassName : ""}`}
          />
        </FormField>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <FormField id="budget" label="Estimated Budget" required error={errors.budget}>
          <select
            id="budget"
            name="budget"
            value={form.budget}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={errors.budget ? "budget-error" : undefined}
            className={`${fieldClassName} cursor-pointer ${errors.budget ? fieldErrorClassName : ""}`}
          >
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-black-100">
                {option.label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField id="timeline" label="Preferred Timeline" required error={errors.timeline}>
          <select
            id="timeline"
            name="timeline"
            value={form.timeline}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={Boolean(errors.timeline)}
            aria-describedby={errors.timeline ? "timeline-error" : undefined}
            className={`${fieldClassName} cursor-pointer ${errors.timeline ? fieldErrorClassName : ""}`}
          >
            {timelineOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-black-100">
                {option.label}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div className="mt-8">
        <FormField id="additionalNotes" label="Additional Notes" error={errors.additionalNotes}>
          <textarea
            id="additionalNotes"
            name="additionalNotes"
            rows={4}
            value={form.additionalNotes}
            onChange={handleChange}
            placeholder="Anything else you'd like to share?"
            className={`${fieldClassName} resize-y`}
          />
        </FormField>
      </div>

      <div className="mt-8">
        <FormField id="attachment" label="File Upload" error={errors.file}>
          <input
            ref={fileInputRef}
            id="attachment"
            name="attachment"
            type="file"
            accept={ACCEPTED_FILE_TYPES}
            onChange={handleFileChange}
            aria-describedby="file-help"
            className="block w-full cursor-pointer rounded-lg border border-dashed border-white/20 bg-tertiary px-4 py-4 text-sm text-secondary file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#915eff] file:px-4 file:py-2 file:font-semibold file:text-white hover:border-[#915eff]/50"
          />
          <p id="file-help" className="mt-2 text-sm text-secondary">
            Optional: upload briefs, designs, or documents (PDF, DOC, images, ZIP — max 5 MB).
          </p>
          {selectedFile ? (
            <p className="mt-2 text-sm text-[#dfd9ff]">
              Selected: {selectedFile.name}
            </p>
          ) : null}
        </FormField>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-10 w-full rounded-xl bg-tertiary px-8 py-4 font-bold text-white shadow-md shadow-primary transition hover:bg-[#2b1d62] disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
      >
        {loading ? "Sending request..." : "Submit quote request"}
      </button>
    </motion.form>
  );
};

export default RequestQuoteForm;
