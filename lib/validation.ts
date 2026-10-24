import { z } from "zod";

/** Kenyan phone numbers: +254 7xx/1xx, 07xx or 01xx (§9). */
const kenyanPhone = /^(?:\+254|0)(?:7|1)\d{8}$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please tell us your name.")
    .max(80, "That name is a little too long."),
  phone: z
    .string()
    .trim()
    .min(9, "Please add a phone or WhatsApp number.")
    .refine((value) => kenyanPhone.test(value.replace(/[\s-]/g, "")), {
      message: "Use a Kenyan number: +2547…, 07… or 01…",
    }),
  email: z
    .union([z.literal(""), z.string().trim().email("Please check the email address.")])
    .optional(),
  service: z.string().min(1, "Choose the service that fits best."),
  occasion: z.string().optional(),
  budget: z.string().optional(),
  sizes: z.string().trim().max(500, "Please keep this under 500 characters.").optional(),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least 10 characters.")
    .max(1500, "Please keep this under 1,500 characters."),
  consent: z.boolean().refine((value) => value === true, {
    message: "Please confirm we can contact you about this enquiry.",
  }),
  /** Honeypot — must stay empty. */
  website: z.string().max(0).optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;

export function buildWhatsAppMessage(values: ContactValues) {
  const lines = [
    `Hi Nyambura, I'd like to enquire about a styling session.`,
    ``,
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
  ];

  if (values.email) lines.push(`Email: ${values.email}`);
  lines.push(`Service: ${values.service}`);
  if (values.occasion) lines.push(`Occasion / date: ${values.occasion}`);
  if (values.budget) lines.push(`Budget: ${values.budget}`);
  if (values.sizes) lines.push(`Sizes / measurements: ${values.sizes}`);
  lines.push(``, values.message);

  return lines.join("\n");
}
