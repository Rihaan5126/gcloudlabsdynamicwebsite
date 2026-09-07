import { NextResponse } from "next/server";

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

  // TODO: wire up a real email provider, e.g. Resend:
  //
  //   import { Resend } from "resend";
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "portfolio@yourdomain.com",
  //     to: profile.email,
  //     replyTo: email,
  //     subject: `New portfolio message from ${name}`,
  //     text: message,
  //   });
  //
  // Requires a RESEND_API_KEY env var (see .env.local.example) and a
  // verified sending domain in the Resend dashboard. Until that's wired
  // up, submissions are only logged server-side so the form is fully
  // testable end to end.
  console.info("[contact] new submission", { name, email, message });

  return NextResponse.json({ ok: true });
}
