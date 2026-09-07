import { NextResponse } from "next/server";
import { Resend } from "resend";
import { profile } from "@/lib/data";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(payload: Partial<ContactPayload>): string | null {
  if (!payload.name || payload.name.trim().length < 2) {
    return "Name must be at least 2 characters.";
  }
  if (!payload.email || !EMAIL_PATTERN.test(payload.email)) {
    return "Please provide a valid email address.";
  }
  if (!payload.message || payload.message.trim().length < 10) {
    return "Message must be at least 10 characters.";
  }
  return null;
}

export async function POST(request: Request) {
  let payload: Partial<ContactPayload>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const validationError = validate(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const { name, email, message } = payload as ContactPayload;

  console.info("[contact] new submission", { name, email, message });

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // "onboarding@resend.dev" is Resend's shared sending address — it works
    // without verifying a custom domain, which is all a personal site
    // needs. Swap it for something like "portfolio@yourdomain.com" once
    // you've verified a domain in the Resend dashboard.
    const { error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: profile.email,
      replyTo: email,
      subject: `New portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return NextResponse.json({ error: "Failed to send message." }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true });
}
