/** Lookbook filters (Blueprint §7.5). */
export const lookbookContent = {
  eyebrow: "The lookbook",
  title: { lead: "Every angle of the", emphasis: "wardrobe." },
  intro:
    "A full-bleed archive of pieces from the studio — clothing, shoes, accessories and the occasional flat-lay. Filter by category or occasion, then open any image for the full look.",
  filters: [
    { value: "all", label: "All" },
    { value: "clothing", label: "Clothes" },
    { value: "shoes", label: "Shoes" },
    { value: "accessories", label: "Accessories" },
    { value: "occasion", label: "Occasion" },
  ],
} as const;
