import nodemailer from "nodemailer";

export const runtime = "nodejs";

// Sends the contact form to my inbox over SMTP. Credentials come from .env.local (see
// .env.example); with none set the route answers 503 and the form falls back to mailto.
const { SMTP_HOST = "smtp.gmail.com", SMTP_PORT = "465", SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;

const LIMITS = { name: 100, email: 200, company: 150, message: 5000 } as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// at most 5 messages per address every 10 minutes; per server instance, which is enough to
// stop someone leaning on the send button
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

// header values must stay on one line
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function POST(req: Request) {
  if (!SMTP_USER || !SMTP_PASS) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (limited(ip)) return Response.json({ error: "rate_limited" }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  // honeypot: real visitors never see this field, bots fill it in
  if (body.website) return Response.json({ ok: true });

  const field = (key: keyof typeof LIMITS) => (typeof body[key] === "string" ? (body[key] as string).trim() : "");
  const name = oneLine(field("name"));
  const email = oneLine(field("email"));
  const company = oneLine(field("company"));
  const message = field("message");

  const tooLong = (Object.keys(LIMITS) as (keyof typeof LIMITS)[]).some((k) => field(k).length > LIMITS[k]);
  if (!name || !message || !EMAIL.test(email) || tooLong) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const port = Number(SMTP_PORT);
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    // Gmail shows app passwords in groups of four; the spaces are not part of it
    auth: { user: SMTP_USER, pass: SMTP_PASS.replace(/\s+/g, "") },
  });

  try {
    await transport.sendMail({
      // sent from my own account (SMTP servers reject other senders); replies go to the visitor
      from: `"Portfolio contact" <${SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo: { name, address: email },
      subject: `Portfolio enquiry from ${name}${company ? ` (${company})` : ""}`,
      text: `${message}\n\n— ${name}\n${email}${company ? `\n${company}` : ""}`,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("contact form: send failed", err);
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
}
