"use client";

import { type FormEvent, useState } from "react";
import { profile, socialLinks } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SocialIcon } from "@/components/ui/SocialIcon";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;
type SubmitStatus = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters.";
  }
  return errors;
}

export function Contact() {
  const [values, setValues] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="border-border bg-surface/50 border-t py-24">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <p className="text-accent font-mono text-sm">{"04 / contact"}</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Let&rsquo;s talk
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-muted mt-4 max-w-xl">
            Have a project, an opportunity, or just want to say hi? My inbox is open.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-5">
          <Reveal delay={160} className="md:col-span-3">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <Field
                id="name"
                label="Name"
                value={values.name}
                onChange={handleChange("name")}
                error={errors.name}
              />
              <Field
                id="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                error={errors.email}
              />
              <Field
                id="message"
                label="Message"
                as="textarea"
                rows={5}
                value={values.message}
                onChange={handleChange("message")}
                error={errors.message}
              />

              <button
                type="submit"
                disabled={status === "submitting"}
                className="focus-ring bg-accent text-accent-foreground inline-flex items-center justify-center rounded-full px-6 py-3 font-mono text-sm font-medium transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {status === "submitting" ? "Sending…" : "Send message"}
              </button>

              <p role="status" aria-live="polite" className="font-mono text-sm">
                {status === "success" && (
                  <span className="text-accent">
                    Thanks, I&rsquo;ll get back to you soon.
                  </span>
                )}
                {status === "error" && (
                  <span className="text-warm">
                    Something went wrong. Please email me directly instead.
                  </span>
                )}
              </p>
            </form>
          </Reveal>

          <Reveal delay={220} className="md:col-span-2">
            <div className="border-border bg-surface rounded-2xl border p-6">
              <h3 className="text-muted font-mono text-sm">Prefer email or socials?</h3>
              <a
                href={`mailto:${profile.email}`}
                className="focus-ring text-foreground hover:text-accent mt-3 block text-lg break-all"
              >
                {profile.email}
              </a>
              <ul className="mt-6 flex items-center gap-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.icon === "email" ? undefined : "_blank"}
                      rel={link.icon === "email" ? undefined : "noreferrer noopener"}
                      aria-label={link.label}
                      className="focus-ring border-border text-muted hover:border-accent hover:text-accent inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
                    >
                      <SocialIcon icon={link.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

type FieldProps = {
  id: keyof FormState;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  type?: string;
  as?: "input" | "textarea";
  rows?: number;
};

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  as = "input",
  rows,
}: FieldProps) {
  const describedBy = error ? `${id}-error` : undefined;
  const sharedClassName = `focus-ring w-full rounded-lg border bg-background px-4 py-2.5 text-foreground placeholder:text-muted/60 ${
    error ? "border-warm" : "border-border"
  }`;

  return (
    <div>
      <label htmlFor={id} className="text-muted mb-1.5 block font-mono text-xs">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          rows={rows}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={sharedClassName}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={sharedClassName}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="text-warm mt-1.5 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
