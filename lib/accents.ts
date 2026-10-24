import type { Accent } from "@/content/services";

/** Static Tailwind class maps for the per-service accents (§5.2). */
export const accentStyles: Record<
  Accent,
  {
    text: string;
    bg: string;
    border: string;
    soft: string;
    groupHover: string;
  }
> = {
  cobalt: {
    text: "text-cobalt",
    bg: "bg-cobalt",
    border: "border-cobalt",
    soft: "bg-cobalt/10",
    groupHover: "group-hover:bg-cobalt/10",
  },
  tangerine: {
    text: "text-tangerine",
    bg: "bg-tangerine",
    border: "border-tangerine",
    soft: "bg-tangerine/10",
    groupHover: "group-hover:bg-tangerine/10",
  },
  vermilion: {
    text: "text-vermilion",
    bg: "bg-vermilion",
    border: "border-vermilion",
    soft: "bg-vermilion/10",
    groupHover: "group-hover:bg-vermilion/10",
  },
  sun: {
    text: "text-ink",
    bg: "bg-sun",
    border: "border-sun",
    soft: "bg-sun/20",
    groupHover: "group-hover:bg-sun/20",
  },
  cocoa: {
    text: "text-cocoa",
    bg: "bg-cocoa",
    border: "border-cocoa",
    soft: "bg-cocoa/10",
    groupHover: "group-hover:bg-cocoa/10",
  },
};
