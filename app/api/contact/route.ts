import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(5000),
});

// Rate limiting: simple in-memory store (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 5;

  const current = rateLimitMap.get(ip);

  if (!current || now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate body
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to owner
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL || "aaromalrm@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0a0a0a; border-bottom: 1px solid #e5e5e5; padding-bottom: 12px;">
            New Contact Form Submission
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 100px; font-weight: 600;">From:</td>
              <td style="padding: 8px 0;">${name} &lt;${email}&gt;</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; font-weight: 600;">Subject:</td>
              <td style="padding: 8px 0;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 20px; background: #f5f5f5; border-radius: 8px;">
            <p style="color: #666; font-size: 12px; margin: 0 0 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
            <p style="margin: 0; color: #0a0a0a; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 24px; color: #999; font-size: 12px;">
            Sent from your portfolio contact form · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
          </p>
        </div>
      `,
    });

    // Auto-reply to sender
    await transporter.sendMail({
      from: `"Aromal Ramesh" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Got your message, ${name.split(" ")[0]}!`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0a0a0a;">Thanks for reaching out!</h2>
          <p style="color: #444; line-height: 1.6;">
            Hi ${name.split(" ")[0]},<br/><br/>
            Thanks for your message. I've received it and will get back to you within 24 hours.
          </p>
          <div style="margin: 24px 0; padding: 20px; background: #f5f5f5; border-radius: 8px; border-left: 4px solid #0a0a0a;">
            <p style="margin: 0; color: #666; font-size: 13px; font-style: italic; white-space: pre-wrap;">"${message.slice(0, 200)}${message.length > 200 ? "…" : ""}"</p>
          </div>
          <p style="color: #444; line-height: 1.6;">
            Talk soon,<br/>
            <strong>Aromal Ramesh</strong><br/>
            <a href="mailto:aaromalrm@gmail.com" style="color: #0a0a0a;">aaromalrm@gmail.com</a>
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Message sent!" });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
