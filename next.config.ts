import createMDX from "@next/mdx"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /** MDX for the journal (§7.10) */
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  images: {
    /** Next 16 requirement: declare allowed formats (§6.2) */
    formats: ["image/avif", "image/webp"],
    /** Only the default quality 75 is used — declared explicitly for Next 16 */
    qualities: [75],
  },
}

const withMDX = createMDX({
  // No additional remark/rehype plugins needed for this project.
})

export default withMDX(nextConfig)
