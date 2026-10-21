import { z } from "zod";

export const enquiryTopics = [
  { value: "property", label: "Property investment and development" },
  { value: "security", label: "Home security" },
  { value: "energy", label: "Energy saving" },
  { value: "sustainable", label: "Sustainable housing" },
  { value: "general", label: "General enquiry" },
] as const;

export type EnquiryTopic = (typeof enquiryTopics)[number]["value"];

export const enquirySchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(120, "Please keep your name under 120 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(254, "That email address is too long.")
    .email("Please enter a valid email address, for example name@example.com."),
  topic: z.enum(["property", "security", "energy", "sustainable", "general"], {
    errorMap: () => ({ message: "Please choose an enquiry topic." }),
  }),
  message: z
    .string()
    .trim()
    .min(10, "Please write a message of at least 10 characters.")
    .max(4000, "Please keep your message under 4,000 characters."),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

export function validateEnquiry(values: Record<keyof EnquiryInput, string>):
  | { ok: true; data: EnquiryInput }
  | { ok: false; errors: EnquiryErrors } {
  const result = enquirySchema.safeParse(values);
  if (result.success) return { ok: true, data: result.data };
  const errors: EnquiryErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof EnquiryInput;
    if (!errors[key]) errors[key] = issue.message;
  }
  return { ok: false, errors };
}
