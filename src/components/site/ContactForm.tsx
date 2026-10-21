import { useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  enquiryTopics,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryInput,
} from "@/lib/enquiry";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";
type Values = Record<keyof EnquiryInput, string>;

const empty: Values = { name: "", email: "", topic: "", message: "" };

const fieldBase =
  "mt-2 block w-full rounded-none border-0 border-b border-input bg-transparent px-0 py-3 text-base text-charcoal placeholder:text-on-light-muted/60 transition-colors focus:border-copper focus:outline-none focus:ring-0 aria-[invalid=true]:border-destructive";

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const inFlight = useRef(false);
  const statusRef = useRef<HTMLDivElement | null>(null);

  const set = (key: keyof Values) => (e: { target: { value: string } }) => {
    const v = e.target.value;
    setValues((prev) => ({ ...prev, [key]: v }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current || status === "success") return;

    const result = validateEnquiry(values);
    if (!result.ok) {
      setErrors(result.errors);
      const first = (Object.keys(result.errors) as (keyof Values)[])[0];
      document.getElementById(`enquiry-${first}`)?.focus();
      return;
    }

    inFlight.current = true;
    setStatus("submitting");
    let failed = false;
    try {
      // Loaded on demand so the database client never weighs down page loads.
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.from("enquiries").insert(result.data);
      failed = Boolean(error);
    } catch {
      failed = true;
    }
    inFlight.current = false;

    if (failed) {
      setStatus("error");
    } else {
      setStatus("success");
      setValues(empty);
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="border-t border-copper pt-10 focus:outline-none"
      >
        <p className="eyebrow text-copper-deep">Message received</p>
        <h2 className="display-3 mt-4">Thank you — your enquiry has been saved.</h2>
        <p className="body-copy mt-4 max-w-md text-on-light-muted">
          It has been recorded securely and will be read by the MDR Rent-Path team. Replies are sent
          to the email address you provided.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="link-quiet mt-8">
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form noValidate onSubmit={onSubmit} aria-describedby="enquiry-note" className="grid gap-9">
      <div className="grid gap-9 md:grid-cols-2 md:gap-8">
        <Field id="name" label="Name" error={errors.name}>
          <input
            id="enquiry-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={set("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "enquiry-name-error" : undefined}
            className={fieldBase}
          />
        </Field>
        <Field id="email" label="Email address" error={errors.email}>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={set("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "enquiry-email-error" : undefined}
            className={fieldBase}
          />
        </Field>
      </div>

      <Field id="topic" label="Enquiry topic" error={errors.topic}>
        <div className="relative">
          <select
            id="enquiry-topic"
            name="topic"
            required
            value={values.topic}
            onChange={set("topic")}
            aria-invalid={!!errors.topic}
            aria-describedby={errors.topic ? "enquiry-topic-error" : undefined}
            className={cn(
              fieldBase,
              "cursor-pointer appearance-none pr-8",
              !values.topic && "text-on-light-muted",
            )}
          >
            <option value="" disabled>
              Choose a topic
            </option>
            {enquiryTopics.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-copper-deep"
          >
            ↓
          </span>
        </div>
      </Field>

      <Field id="message" label="Message" error={errors.message}>
        <textarea
          id="enquiry-message"
          name="message"
          required
          rows={6}
          value={values.message}
          onChange={set("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "enquiry-message-error" : undefined}
          className={cn(fieldBase, "resize-y")}
        />
      </Field>

      {status === "error" && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="border-l-2 border-destructive pl-4 focus:outline-none"
        >
          <p className="font-semibold text-destructive">Your message could not be sent.</p>
          <p className="body-copy text-on-light-muted">
            Nothing was saved. Please check your connection and try again in a moment.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-6 border-t border-rule-light pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p id="enquiry-note" className="max-w-sm text-sm text-on-light-muted">
          All fields are required. Your details are only used to reply to your enquiry.
        </p>
        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className="inline-flex min-h-12 items-center justify-center gap-3 bg-forest px-8 py-3 text-[0.75rem] font-semibold tracking-[0.22em] text-on-dark uppercase transition-colors duration-300 hover:bg-copper-deep disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? (
            <>
              <span
                className="h-3 w-3 animate-spin rounded-full border border-on-dark border-t-transparent"
                aria-hidden="true"
              />
              Sending…
            </>
          ) : (
            <>
              Send enquiry <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`enquiry-${id}`} className="eyebrow text-on-light-muted">
        {label}
      </label>
      {children}
      {error && (
        <p id={`enquiry-${id}-error`} className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
