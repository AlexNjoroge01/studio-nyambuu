import type { ImageKey } from "@/lib/image-manifest";

/** Contact page copy and form options (Blueprint §7.9). */
export const contactContent = {
  eyebrow: "Enquire",
  title: { lead: "Let's talk about what you", emphasis: "want to wear." },
  intro:
    "Tell us what is coming up, what is not working or what you wish you could wear. Send the form and we will continue the conversation on WhatsApp.",
  image: "earrings-collection-black-velvet" as ImageKey,
  directTitle: "Prefer to talk directly?",
  locationNote: "Serving Nairobi & across Kenya",
  responseNote:
    "Every enquiry is read personally. If WhatsApp is easier, message us there — it is usually the fastest way to reach the studio.",
  form: {
    name: "Your name",
    phone: "Phone / WhatsApp",
    email: "Email (optional)",
    service: "What do you need?",
    occasion: "Occasion or date (optional)",
    budget: "Budget range (optional)",
    sizes: "Sizes / measurements (optional)",
    message: "Tell us a little more",
    consent:
      "I agree to be contacted about this enquiry. My details are not stored on this website.",
    submit: "Send enquiry",
    submitting: "Sending…",
    success: "Thank you — opening WhatsApp so we can continue.",
    error: "Something went wrong. Please message us on WhatsApp instead.",
  },
  services: [
    { value: "wardrobe-edit", label: "The Wardrobe Edit" },
    { value: "personal-shop", label: "The Personal Shop" },
    { value: "occasion-styling", label: "Occasion Styling" },
    { value: "express-look", label: "The Express Look" },
    { value: "collection", label: "A piece from The Collection" },
    { value: "not-sure", label: "Not sure yet" },
  ],
  budgets: [
    { value: "Under KES 10,000", label: "Under KES 10,000" },
    { value: "KES 10,000 – 25,000", label: "KES 10,000 – 25,000" },
    { value: "KES 25,000 – 50,000", label: "KES 25,000 – 50,000" },
    { value: "KES 50,000+", label: "KES 50,000+" },
    { value: "Prefer not to say", label: "Prefer not to say" },
  ],
  /** TODO(client): confirm exact service area / delivery reach before launch */
} as const;
