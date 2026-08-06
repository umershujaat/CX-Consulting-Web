import {
  programStages,
  servicesSummary,
  timingOptions,
  type ProgramStage,
  type TimingOption,
} from "@/lib/content";

export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle?: string;
  services: string[];
  programStage: ProgramStage;
  timing: TimingOption;
  message: string;
  consent: boolean;
  honeypot?: string;
  referrer?: string;
  utm?: Record<string, string>;
};

export type ContactValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; errors: Record<string, string> };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const serviceSlugs = new Set(servicesSummary.map((s) => s.slug));

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((v) => asString(v)).filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) {
    return value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  }
  return [];
}

/** Strip control characters and normalize whitespace for safe email/log use. */
export function sanitizeText(
  input: string,
  maxLength: number,
  options?: { preserveNewlines?: boolean },
): string {
  const withoutControls = input.replace(
    /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,
    "",
  );
  const normalized = options?.preserveNewlines
    ? withoutControls
        .replace(/[^\S\n]+/g, " ")
        .replace(/\n{3,}/g, "\n\n")
        .trim()
    : withoutControls.replace(/\s+/g, " ").trim();
  return normalized.slice(0, maxLength);
}

export function validateContactPayload(
  body: unknown,
): ContactValidationResult {
  const errors: Record<string, string> = {};
  const raw =
    body && typeof body === "object" ? (body as Record<string, unknown>) : {};

  const honeypot = asString(raw.honeypot ?? raw.website);
  if (honeypot) {
    return {
      ok: true,
      data: {
        firstName: "honeypot",
        lastName: "honeypot",
        email: "honeypot@example.com",
        company: "honeypot",
        services: [],
        programStage: "Exploring",
        timing: "Later / researching",
        message: "honeypot",
        consent: true,
        honeypot,
      },
    };
  }

  const firstName = sanitizeText(asString(raw.firstName), 100);
  const lastName = sanitizeText(asString(raw.lastName), 100);
  const email = sanitizeText(asString(raw.email).toLowerCase(), 254);
  const company = sanitizeText(asString(raw.company), 200);
  const jobTitle = sanitizeText(asString(raw.jobTitle), 150);
  const rawMessage = asString(raw.message);
  const message = sanitizeText(rawMessage, 2000, { preserveNewlines: true });
  const services = asStringArray(raw.services).filter((s) =>
    serviceSlugs.has(s),
  );
  const programStage = asString(raw.programStage) as ProgramStage;
  const timing = asString(raw.timing) as TimingOption;
  const consent = raw.consent === true || raw.consent === "true";

  if (!firstName) errors.firstName = "First name is required.";
  if (!lastName) errors.lastName = "Last name is required.";
  if (!email) errors.email = "Work email is required.";
  else if (!emailPattern.test(email))
    errors.email = "Enter a valid work email address.";
  if (!company) errors.company = "Company is required.";
  if (services.length === 0)
    errors.services = "Select at least one service area.";
  if (!programStages.includes(programStage))
    errors.programStage = "Select a program stage.";
  if (!timingOptions.includes(timing))
    errors.timing = "Select desired timing.";
  if (!rawMessage) errors.message = "Message is required.";
  else if (rawMessage.length < 50)
    errors.message = "Message must be at least 50 characters.";
  else if (rawMessage.length > 2000)
    errors.message = "Message must be 2,000 characters or fewer.";
  if (!consent) errors.consent = "Consent is required to submit.";

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const utm: Record<string, string> = {};
  if (raw.utm && typeof raw.utm === "object") {
    for (const [key, value] of Object.entries(
      raw.utm as Record<string, unknown>,
    )) {
      const cleaned = sanitizeText(asString(value), 200);
      if (cleaned) utm[sanitizeText(key, 50)] = cleaned;
    }
  }

  return {
    ok: true,
    data: {
      firstName,
      lastName,
      email,
      company,
      jobTitle: jobTitle || undefined,
      services,
      programStage,
      timing,
      message,
      consent,
      referrer: sanitizeText(asString(raw.referrer), 500) || undefined,
      utm: Object.keys(utm).length ? utm : undefined,
    },
  };
}

type RateBucket = { count: number; resetAt: number };

const rateBuckets = new Map<string, RateBucket>();

/** Simple in-memory rate limit: max requests per window per key. */
export function checkRateLimit(
  key: string,
  limit = 5,
  windowMs = 15 * 60 * 1000,
): { allowed: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const existing = rateBuckets.get(key);

  if (!existing || existing.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return { allowed: true };
}

export type EmailProvider = {
  sendContactInquiry: (payload: ContactPayload & { to: string; from: string }) => Promise<void>;
};

/** Stub ready for a Resend-like provider when EMAIL_PROVIDER_API_KEY is set. */
export function createEmailProvider(apiKey: string): EmailProvider {
  return {
    async sendContactInquiry(payload) {
      // Provider adapter stub — wire to Resend (or similar) in a later phase.
      // Intentionally does not send until a real provider is configured beyond the key check.
      if (!apiKey) {
        throw new Error("EMAIL_PROVIDER_API_KEY is required");
      }
      // Placeholder: log metadata only (no message body).
      console.info("[email-provider] would send contact inquiry", {
        to: payload.to,
        from: payload.from,
        company: payload.company,
        services: payload.services,
        programStage: payload.programStage,
      });
    },
  };
}
