"use server";

import { contactSchema, type ContactValues } from "@/lib/validation";

/**
 * Optional secondary path (§9): email the enquiry via Resend when
 * RESEND_API_KEY exists. Silently skipped otherwise. Nothing is stored.
 */
export async function sendEnquiryEmail(values: ContactValues) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: true, skipped: true as const };

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) return { ok: false, skipped: false as const };

  const data = parsed.data;
  const html = `
    <h2>New styling enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email || "—")}</p>
    <p><strong>Service:</strong> ${escapeHtml(data.service)}</p>
    <p><strong>Occasion / date:</strong> ${escapeHtml(data.occasion || "—")}</p>
    <p><strong>Budget:</strong> ${escapeHtml(data.budget || "—")}</p>
    <p><strong>Sizes / measurements:</strong> ${escapeHtml(data.sizes || "—")}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Nyambura Mbugua Website <onboarding@resend.dev>",
        to: ["jmsnyambz@gmail.com"],
        subject: `Styling enquiry — ${data.name}`,
        html,
      }),
    });

    return { ok: response.ok, skipped: false as const };
  } catch {
    return { ok: false, skipped: false as const };
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
