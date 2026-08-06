import { NextResponse } from "next/server";
import {
  checkRateLimit,
  createEmailProvider,
  validateContactPayload,
} from "@/lib/contact";
import { servicesSummary } from "@/lib/content";

export async function POST(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const rate = checkRateLimit(`contact:${ip}`);

  if (!rate.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many requests. Please try again later.",
      },
      {
        status: 429,
        headers: rate.retryAfterSec
          ? { "Retry-After": String(rate.retryAfterSec) }
          : undefined,
      },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const validated = validateContactPayload(body);

  if (!validated.ok) {
    return NextResponse.json(
      { ok: false, errors: validated.errors },
      { status: 400 },
    );
  }

  // Honeypot: pretend success without processing.
  if (validated.data.honeypot) {
    return NextResponse.json({
      ok: true,
      message: "Thank you. We received your inquiry and will respond shortly.",
    });
  }

  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;
  const to =
    process.env.CONTACT_TO_EMAIL ||
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
    "hello@example.com";
  const from = process.env.CONTACT_FROM_EMAIL || to;

  if (!apiKey) {
    console.info("[contact] mock submission (no EMAIL_PROVIDER_API_KEY)", {
      company: validated.data.company,
      services: validated.data.services,
      programStage: validated.data.programStage,
      timing: validated.data.timing,
      serviceTitles: validated.data.services.map(
        (slug) =>
          servicesSummary.find((s) => s.slug === slug)?.title ?? slug,
      ),
      referrer: validated.data.referrer,
      // Intentionally omit message body and email PII from logs.
    });

    return NextResponse.json({
      ok: true,
      dev: true,
      message:
        "Thank you. We received your inquiry and will respond shortly.",
    });
  }

  try {
    const provider = createEmailProvider(apiKey);
    await provider.sendContactInquiry({
      ...validated.data,
      to,
      from,
    });
  } catch (error) {
    console.error("[contact] email provider failure", {
      name: error instanceof Error ? error.name : "Error",
    });
    return NextResponse.json(
      {
        ok: false,
        error: "Unable to deliver your inquiry right now. Please try again.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Thank you. We received your inquiry and will respond shortly.",
  });
}
