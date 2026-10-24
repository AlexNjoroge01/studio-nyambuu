import type { ImageKey } from "@/lib/image-manifest";

/**
 * "The Collection" (Blueprint §7.4) — a curated lookbook, never a shop.
 * No prices, no stock, no cart. Enquiries only.
 */

export type CollectionCategory = "clothing" | "shoes" | "accessories";

export interface CollectionItem {
  id: string;
  name: string;
  image: ImageKey;
  category: CollectionCategory;
  /** Accessories sub-filter: Jewellery · Bags · Sunglasses · Watches · Hair */
  subcategory?: string;
  description: string;
  tags: string[];
}

export const collectionTabs: { value: CollectionCategory; label: string }[] = [
  { value: "clothing", label: "Clothing" },
  { value: "shoes", label: "Shoes" },
  { value: "accessories", label: "Accessories" },
];

export const accessoryFilters = [
  "Jewellery",
  "Bags",
  "Sunglasses",
  "Watches",
  "Hair",
] as const;

export const collection: CollectionItem[] = [
  {
    id: "tangerine-ruffle-dress",
    name: "The Tangerine Ruffle Dress",
    image: "tangerine-ruffle-mini-dress-nairobi",
    category: "clothing",
    description:
      "A bright ruffle-trimmed mini with a corsage shoulder — made for celebrations that call for colour.",
    tags: ["Orange", "Party", "Dress"],
  },
  {
    id: "sky-ruched-shirt",
    name: "The Sky Ruched Shirt",
    image: "sky-blue-ruched-shirt",
    category: "clothing",
    description:
      "A soft blue shirt with a drawstring waist: neat enough for the office, easy enough for the weekend.",
    tags: ["Blue", "Workwear", "Top"],
  },
  {
    id: "fuchsia-ruched-shirt",
    name: "The Fuchsia Ruched Shirt",
    image: "fuchsia-ruched-shirt",
    category: "clothing",
    description:
      "The same easy ruched shape in a confident pink — a single colour note against a neutral wardrobe.",
    tags: ["Pink", "Date night", "Top"],
  },
  {
    id: "burgundy-belted-suit",
    name: "The Burgundy Belter Suit",
    image: "burgundy-belted-pantsuit-wooden-door",
    category: "clothing",
    description:
      "A belted blazer and wide-leg trouser in deep burgundy, cut to move between meetings and dinner.",
    tags: ["Burgundy", "Suit", "Workwear"],
  },
  {
    id: "cornflower-belted-suit",
    name: "The Cornflower Belted Suit",
    image: "cornflower-blue-belted-pantsuit",
    category: "clothing",
    description:
      "Cornflower blue tailoring with a waist-defining belt — polished, but never stiff.",
    tags: ["Blue", "Suit", "Workwear"],
  },
  {
    id: "oatmeal-belted-suit",
    name: "The Oatmeal Belted Suit",
    image: "oatmeal-belted-pantsuit-entrance",
    category: "clothing",
    description:
      "A double-breasted suit in warm oatmeal, styled with a camel bag. Quiet luxury, made practical.",
    tags: ["Cream", "Suit", "Elegant"],
  },
  {
    id: "navy-gold-blazer",
    name: "The Navy Gold-Button Blazer",
    image: "navy-gold-button-blazer-white-trousers",
    category: "clothing",
    description:
      "A navy double-breasted blazer with gold buttons, paired with white wide-leg trousers.",
    tags: ["Navy", "Blazer", "Classic"],
  },
  {
    id: "berry-peplum-blazer",
    name: "The Berry Peplum Blazer",
    image: "berry-peplum-blazer-white-trousers",
    category: "clothing",
    description:
      "A peplum blazer with a crisp white lapel — a sharp little silhouette over white trousers.",
    tags: ["Berry", "Cocktail", "Office"],
  },
  {
    id: "black-cornflower-suit-set",
    name: "The Black & Cornflower Suit Set",
    image: "suited-duo-black-cornflower-office",
    category: "clothing",
    description:
      "Short-sleeved double-breasted suiting with a printed silk scarf — a modern take on the work suit.",
    tags: ["Black", "Suit", "Graduation"],
  },
  {
    id: "mustard-olive-suit-set",
    name: "The Mustard & Olive Suit Set",
    image: "suited-duo-mustard-olive-entrance",
    category: "clothing",
    description:
      "Two warm suit colours, one easy shape. Designed to be worn together or on their own.",
    tags: ["Yellow", "Green", "Suit"],
  },
  {
    id: "four-colour-suit-edit",
    name: "The Four-Colour Suit Edit",
    image: "four-suit-colours-boutique-mannequins",
    category: "clothing",
    description:
      "The same double-breasted suit in red, olive, white and black — proof that one good shape can carry a wardrobe.",
    tags: ["Red", "Green", "Office"],
  },
  {
    id: "ruffled-mini-dresses",
    name: "The Ruffle Mini Edit",
    image: "ruffled-mini-dresses-boutique-row",
    category: "clothing",
    description:
      "Ruffled slip minis in red, coral and pale blue — light, playful evening pieces.",
    tags: ["Red", "Party", "Dress"],
  },
  {
    id: "cream-floral-midi-skirt",
    name: "The Pleated Floral Midi",
    image: "pleated-floral-midi-skirts-arched-nook",
    category: "clothing",
    description:
      "Pleated floral midi skirts in cream, navy and mustard, shown beside a candle-lit arch.",
    tags: ["Print", "Church", "Skirt"],
  },
  {
    id: "poppy-floral-midi-skirt",
    name: "The Poppy Pleated Midi",
    image: "pleated-poppy-midi-skirts-arch",
    category: "clothing",
    description:
      "Bold poppy florals in burgundy, cream and black on a soft pleated midi.",
    tags: ["Print", "Occasion", "Skirt"],
  },
  {
    id: "burgundy-floral-set",
    name: "The Burgundy Floral Set",
    image: "burgundy-floral-shirt-pants-set-dipstyle",
    category: "clothing",
    description:
      "A floral shirt and matching wide-leg trouser — an easy set that works as one look or two.",
    tags: ["Burgundy", "Set", "Casual chic"],
  },
  {
    id: "leopard-two-piece",
    name: "The Leopard Two-Piece",
    image: "leopard-two-piece-white-crop-trackset",
    category: "clothing",
    description:
      "A leopard-print two-piece with a white crop — relaxed street style with a little bite.",
    tags: ["Leopard", "Casual", "Street style"],
  },
  {
    id: "black-velvet-heels",
    name: "The Black Velvet Heel",
    image: "black-velvet-heels-clutch-flat-lay",
    category: "shoes",
    description:
      "Black velvet slingbacks with a faceted clutch and tassel earrings — an evening look, finished.",
    tags: ["Black", "Evening", "Heels"],
  },
  {
    id: "gold-jewellery-edit",
    name: "The Gold Jewellery Edit",
    image: "gold-jewellery-collection-collage",
    category: "accessories",
    subcategory: "Jewellery",
    description:
      "Chains, pearls, nameplate hoops and statement earrings — the layer that makes an outfit personal.",
    tags: ["Gold", "Jewellery", "Layering"],
  },
  {
    id: "tortoiseshell-edit",
    name: "The Tortoiseshell Edit",
    image: "tortoiseshell-accessories-flat-lay",
    category: "accessories",
    subcategory: "Sunglasses",
    description:
      "Tortoiseshell sunglasses, leopard drop earrings and a tan purse — warm neutrals that work together.",
    tags: ["Tortoiseshell", "Sunglasses", "Neutral"],
  },
  {
    id: "trench-and-leather-bag",
    name: "The Trench & Leather Bag",
    image: "trench-coat-leather-bag-gold-watch",
    category: "accessories",
    subcategory: "Bags",
    description:
      "A beige trench, black leather bag and gold watch — the everyday layer that elevates a simple outfit.",
    tags: ["Bag", "Trench", "Everyday"],
  },
  {
    id: "rose-gold-watch",
    name: "The Rose Gold Watch",
    image: "rose-gold-milanese-watch-silk-scarves",
    category: "accessories",
    subcategory: "Watches",
    description:
      "A Milanese-band watch on pleated silk scarves — a quiet finishing note for work and occasion.",
    tags: ["Watch", "Gold", "Professional"],
  },
  {
    id: "earring-collection",
    name: "The Earring Collection",
    image: "earrings-collection-black-velvet",
    category: "accessories",
    subcategory: "Jewellery",
    description:
      "Hoops, pearls, crystals and tassel drops on black velvet — from everyday to fully dressed.",
    tags: ["Earrings", "Jewellery", "Evening"],
  },
  {
    id: "straw-hat-and-slides",
    name: "The Straw Hat & Slides",
    image: "summer-accessories-straw-hat-slides",
    category: "accessories",
    subcategory: "Hair",
    description:
      "A cream straw hat, gingham slides and wooden hoops — an easy sunny-day combination.",
    tags: ["Hat", "Summer", "Soft"],
  },
  {
    id: "layered-gold-styling",
    name: "The Layered Gold Look",
    image: "layered-gold-jewellery-stylist-woman",
    category: "accessories",
    subcategory: "Jewellery",
    description:
      "Layered gold necklaces, rings and a wristwatch — the finishing layer in motion.",
    tags: ["Jewellery", "Gold", "Occasion"],
  },
];

export function getCollectionItem(id: string) {
  return collection.find((item) => item.id === id);
}

export function tabItems(category: CollectionCategory) {
  return collection.filter((item) => item.category === category);
}
