export const budgetOptions = [
  { value: "", label: "Select a budget range" },
  { value: "under-500", label: "Under $500" },
  { value: "500-1000", label: "$500 – $1,000" },
  { value: "1000-2000", label: "$1,000 – $2,000" },
  { value: "2000-5000", label: "$2,000 – $5,000" },
  { value: "5000-plus", label: "$5,000+" },
  { value: "not-sure", label: "Not sure yet" },
];

export const timelineOptions = [
  { value: "", label: "Select a timeline" },
  { value: "asap", label: "ASAP (under 2 weeks)" },
  { value: "2-4-weeks", label: "2 – 4 weeks" },
  { value: "1-2-months", label: "1 – 2 months" },
  { value: "2-3-months", label: "2 – 3 months" },
  { value: "flexible", label: "Flexible / Not sure" },
];

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export const ACCEPTED_FILE_TYPES =
  ".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.webp,.zip,.fig,.sketch";
