import type { ImageKey } from "@/lib/image-manifest";

/** Occasions carousel on the home page (Blueprint §7.1). */
export interface Occasion {
  name: string;
  image: ImageKey;
  description: string;
}

export const occasions: Occasion[] = [
  {
    name: "Wedding guest",
    image: "tangerine-ruffle-mini-dress-nairobi",
    description:
      "Ceremony-to-reception looks that hold up in photographs and feel like you, not the invitation.",
  },
  {
    name: "Office",
    image: "cornflower-blue-belted-pantsuit",
    description:
      "Polished tailoring for boardrooms, presentations and the days that ask for quiet authority.",
  },
  {
    name: "Date night",
    image: "berry-peplum-blazer-white-trousers",
    description:
      "A little sharper, a little softer — an outfit that makes the decision for you.",
  },
  {
    name: "Church",
    image: "pleated-floral-midi-skirts-arched-nook",
    description:
      "Considered, graceful dressing for Sunday and the family lunch that follows.",
  },
  {
    name: "Graduation",
    image: "suited-duo-black-cornflower-office",
    description:
      "A look that celebrates the milestone and still looks right in every photograph.",
  },
  {
    name: "Cocktail",
    image: "ruffled-mini-dresses-boutique-row",
    description:
      "Evening pieces with movement and colour, styled for the room you are walking into.",
  },
];
