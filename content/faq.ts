/**
 * FAQ content (Blueprint §7.8). Answers are worded safely where the client has
 * not confirmed an operational detail — no invented turnaround, payment or
 * delivery promises. Add confirmed specifics here when the client supplies them.
 */

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
    title: "Services",
    items: [
      {
        question: "What services do you offer?",
        answer:
          "Four styling services — The Wardrobe Edit, The Personal Shop, Occasion Styling and The Express Look — alongside The Collection, a curated selection of clothing, shoes and accessories.",
      },
      {
        question: "What is the difference between a personal stylist and a personal shopper?",
        answer:
          "A personal stylist works on the whole picture: how you dress, what suits you and how your wardrobe fits your life. A personal shopper sources specific pieces. Nyambura offers both, which is why the services can be booked separately or together.",
      },
      {
        question: "Can I book just one service?",
        answer:
          "Yes. Every service is designed to stand alone. If you are unsure where to start, tell us what is not working and we will point you to the right one.",
      },
      {
        question: "Do you style women only?",
        answer:
          "The studio is focused on women, per the brief — busy professionals, brides and their parties, event-goers, women rebuilding a wardrobe and younger women who love fashion.",
      },
    ],
  },
  {
    title: "Booking",
    items: [
      {
        question: "How do I book a styling session?",
        answer:
          "Send an enquiry through the contact form or message Nyambura on WhatsApp. Share the service you are interested in, the occasion and your preferred timing; she will confirm availability and next steps.",
      },
      {
        question: "What happens after I enquire?",
        answer:
          "You will get a reply to confirm the scope, the format and what information is needed. Nothing is confirmed until you have agreed the details together.",
      },
      {
        question: "Can I reschedule?",
        answer:
          "Life happens. Message as early as you can and we will find another time that works, subject to availability.",
      },
      {
        question: "Do you offer virtual sessions?",
        answer:
          "Some parts of the process can work remotely, depending on the service and your location. Tell us where you are and we will confirm what is possible.",
      },
    ],
  },
  {
    title: "Shopping & budget",
    items: [
      {
        question: "Do I set the budget?",
        answer:
          "Yes. You set the budget and we work within it. The right wardrobe is not about spending the most; it is about spending on the pieces that will actually be worn.",
      },
      {
        question: "Will you buy pieces without my approval?",
        answer:
          "No. Sourcing is a conversation. You approve the direction — and the pieces — before anything is purchased.",
      },
      {
        question: "Why are there no prices on The Collection?",
        answer:
          "The Collection is a curated lookbook, not an online shop. Enquire about a piece and we will confirm availability and details directly.",
      },
      {
        question: "Do I need to buy new clothes to work with you?",
        answer:
          "No. The Wardrobe Edit starts with what you own. Shopping is only suggested where it solves a real gap.",
      },
    ],
  },
  {
    title: "Delivery",
    items: [
      {
        question: "How do I receive pieces?",
        answer:
          "Collection, delivery or courier is arranged when you book. Share your location and we will confirm the simplest option.",
      },
      {
        question: "Do you deliver outside Nairobi?",
        answer:
          "Nyambura serves women across Kenya. Delivery outside Nairobi depends on the piece and the destination — ask when you enquire.",
      },
      {
        question: "Can I collect my order?",
        answer:
          "Collection can usually be arranged in Nairobi. Confirm the details with us before you travel.",
      },
    ],
  },
  {
    title: "Kenya-specific",
    items: [
      {
        question: "What should I wear to a Kenyan wedding as a guest?",
        answer:
          "It depends on the ceremony, the venue and the family. Our journal guide covers colours, fabrics, shoes and the things worth avoiding — or send us the invitation details and we will style the look.",
      },
      {
        question: "Do you style for ruracio, kitchen parties and send-offs?",
        answer:
          "Yes. These are some of the most photographed family occasions in Kenya, and they deserve a look that feels considered rather than last-minute.",
      },
      {
        question: "Which payment methods do you accept?",
        answer:
          "Payment details are confirmed when you book. Message us on WhatsApp and we will share the current options.",
      },
      {
        question: "Do you work in English and Swahili?",
        answer:
          "Yes — English and Swahili. Karibu.",
      },
    ],
  },
];

/** Flat list for FAQ schema — only rendered questions are marked up. */
export const allFaqs: FaqItem[] = faqGroups.flatMap((group) => group.items);

/** Home page shows a preview of the first four (§7.1). */
export const faqPreview = allFaqs.slice(0, 4);
