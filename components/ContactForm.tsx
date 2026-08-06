"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/Button";
import {
  programStages,
  servicesSummary,
  timingOptions,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  services: string[];
  programStage: string;
  timing: string;
  message: string;
  consent: boolean;
  honeypot: string;
};

function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ]) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }
  return utm;
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");

  const prefilledServices = useMemo(() => {
    if (!serviceParam) return [] as string[];
    const match = servicesSummary.find((s) => s.slug === serviceParam);
    return match ? [match.slug] : [];
  }, [serviceParam]);

  const [form, setForm] = useState<FormState>(() => ({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    jobTitle: "",
    services: prefilledServices,
    programStage: "",
    timing: "",
    message: "",
    consent: false,
    honeypot: "",
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{
    message: string;
    dev?: boolean;
  } | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const servicesForSubmit = useMemo(() => {
    if (prefilledServices.length === 0) return form.services;
    return Array.from(new Set([...form.services, ...prefilledServices]));
  }, [form.services, prefilledServices]);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleService(slug: string) {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(slug)
        ? prev.services.filter((s) => s !== slug)
        : [...prev.services, slug],
    }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setFormError(null);
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          services: servicesForSubmit,
          referrer:
            typeof document !== "undefined" ? document.referrer : undefined,
          utm: getUtmParams(),
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        errors?: Record<string, string>;
        error?: string;
        message?: string;
        dev?: boolean;
      };

      if (!response.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        setFormError(
          data.error ?? "Unable to submit right now. Please try again.",
        );
        return;
      }

      setSuccess({
        message:
          data.message ??
          "Thank you. We received your inquiry and will respond shortly.",
        dev: data.dev,
      });
    } catch {
      setFormError("Unable to submit right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div
        className="rounded-lg border border-teal/30 bg-off-white p-6 sm:p-8"
        role="status"
        aria-live="polite"
      >
        <h2 className="text-xl font-semibold tracking-tight text-navy">
          Inquiry received
        </h2>
        <p className="mt-3 text-base leading-relaxed text-slate">
          {success.message}
        </p>
        {success.dev ? (
          <p className="mt-3 text-sm text-warm">
            Development mode: email provider is not configured. Submission was
            logged safely without message contents.
          </p>
        ) : null}
        {siteConfig.schedulingUrl ? (
          <p className="mt-6">
            <Button href={siteConfig.schedulingUrl} variant="primary">
              {siteConfig.cta.schedule}
            </Button>
          </p>
        ) : null}
      </div>
    );
  }

  const fieldClass =
    "mt-1.5 w-full rounded-md border border-navy/15 bg-white px-3 py-2.5 text-sm text-body shadow-sm placeholder:text-slate/50 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30";
  const labelClass = "block text-sm font-medium text-navy";
  const errorClass = "mt-1.5 text-sm text-red-700";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div
        className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
        aria-hidden
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={(e) => updateField("honeypot", e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First name <span className="text-teal">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            required
            autoComplete="given-name"
            className={fieldClass}
            value={form.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
          {errors.firstName ? (
            <p id="firstName-error" className={errorClass}>
              {errors.firstName}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last name <span className="text-teal">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            required
            autoComplete="family-name"
            className={fieldClass}
            value={form.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
          {errors.lastName ? (
            <p id="lastName-error" className={errorClass}>
              {errors.lastName}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            Work email <span className="text-teal">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email ? (
            <p id="email-error" className={errorClass}>
              {errors.email}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            Company <span className="text-teal">*</span>
          </label>
          <input
            id="company"
            name="company"
            required
            autoComplete="organization"
            className={fieldClass}
            value={form.company}
            onChange={(e) => updateField("company", e.target.value)}
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "company-error" : undefined}
          />
          {errors.company ? (
            <p id="company-error" className={errorClass}>
              {errors.company}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="jobTitle" className={labelClass}>
          Job title
        </label>
        <input
          id="jobTitle"
          name="jobTitle"
          autoComplete="organization-title"
          className={fieldClass}
          value={form.jobTitle}
          onChange={(e) => updateField("jobTitle", e.target.value)}
        />
      </div>

      <fieldset>
        <legend className={labelClass}>
          What do you need help with? <span className="text-teal">*</span>
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {servicesSummary.map((service) => {
            const checked = servicesForSubmit.includes(service.slug);
            return (
              <label
                key={service.slug}
                className="flex cursor-pointer items-start gap-2 rounded-md border border-navy/10 bg-white px-3 py-2.5 text-sm text-body hover:border-teal/40"
              >
                <input
                  type="checkbox"
                  className="mt-0.5"
                  checked={checked}
                  onChange={() => toggleService(service.slug)}
                />
                <span>{service.title}</span>
              </label>
            );
          })}
        </div>
        {errors.services ? (
          <p className={errorClass}>{errors.services}</p>
        ) : null}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="programStage" className={labelClass}>
            Program stage <span className="text-teal">*</span>
          </label>
          <select
            id="programStage"
            name="programStage"
            required
            className={fieldClass}
            value={form.programStage}
            onChange={(e) => updateField("programStage", e.target.value)}
            aria-invalid={Boolean(errors.programStage)}
            aria-describedby={
              errors.programStage ? "programStage-error" : undefined
            }
          >
            <option value="">Select a stage</option>
            {programStages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
          {errors.programStage ? (
            <p id="programStage-error" className={errorClass}>
              {errors.programStage}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="timing" className={labelClass}>
            Desired timing <span className="text-teal">*</span>
          </label>
          <select
            id="timing"
            name="timing"
            required
            className={fieldClass}
            value={form.timing}
            onChange={(e) => updateField("timing", e.target.value)}
            aria-invalid={Boolean(errors.timing)}
            aria-describedby={errors.timing ? "timing-error" : undefined}
          >
            <option value="">Select timing</option>
            {timingOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.timing ? (
            <p id="timing-error" className={errorClass}>
              {errors.timing}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-teal">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          minLength={50}
          maxLength={2000}
          className={fieldClass}
          value={form.message}
          onChange={(e) => updateField("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? "message-error message-hint" : "message-hint"
          }
          placeholder="Tell us what you are evaluating, where the program is blocked, and what decision you need to make next. Do not include credentials, customer PII, or confidential pricing."
        />
        <p id="message-hint" className="mt-1.5 text-xs text-slate">
          {form.message.length}/2000 characters (minimum 50)
        </p>
        {errors.message ? (
          <p id="message-error" className={errorClass}>
            {errors.message}
          </p>
        ) : null}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-body">
          <input
            type="checkbox"
            className="mt-1"
            checked={form.consent}
            onChange={(e) => updateField("consent", e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <span>
            I agree to the processing of this inquiry as described in the{" "}
            <a
              href="/privacy"
              className="font-semibold text-teal underline-offset-2 hover:underline"
            >
              Privacy Notice
            </a>
            . <span className="text-teal">*</span>
          </span>
        </label>
        {errors.consent ? (
          <p id="consent-error" className={errorClass}>
            {errors.consent}
          </p>
        ) : null}
      </div>

      {formError ? (
        <p
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {formError}
        </p>
      ) : null}

      <Button type="submit" variant="primary" disabled={submitting}>
        {submitting ? "Submitting…" : siteConfig.cta.primary}
      </Button>
    </form>
  );
}
