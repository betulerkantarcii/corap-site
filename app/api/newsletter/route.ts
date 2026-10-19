import { NextResponse } from "next/server";
import { isValidEmail, newsletterProvider } from "@/lib/newsletter";

type Body = { email?: unknown; consent?: unknown; locale?: unknown; website?: unknown };

/** POST /api/newsletter — { email, consent, locale } → { ok } | { ok: false, error } */
export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot: real people never see or fill the "website" field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!isValidEmail(email))
    return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  if (body.consent !== true)
    return NextResponse.json({ ok: false, error: "consent" }, { status: 400 });
  const locale = body.locale === "tr" ? "tr" : "en";

  try {
    await newsletterProvider().subscribe(email, locale);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] provider error", err);
    return NextResponse.json({ ok: false, error: "provider" }, { status: 502 });
  }
}
