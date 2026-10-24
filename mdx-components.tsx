import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 font-heading text-[clamp(1.9rem,3.4vw,2.8rem)] leading-[1.05] font-light tracking-[-0.01em] text-ink first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-9 mb-3 font-heading text-2xl leading-tight font-light text-ink md:text-3xl">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mb-5 text-base leading-[1.85] text-cocoa md:text-[17px]">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="mb-6 ml-5 list-disc space-y-2 text-base leading-relaxed text-cocoa marker:text-ink/40">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mb-6 ml-5 list-decimal space-y-2 text-base leading-relaxed text-cocoa marker:text-ink/40">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="pl-1">{children}</li>,
    a: ({ href = "", children }) => (
      <Link
        href={href}
        className="text-cobalt underline decoration-cobalt/30 underline-offset-4 transition-colors hover:decoration-cobalt"
      >
        {children}
      </Link>
    ),
    strong: ({ children }) => (
      <strong className="font-normal text-ink">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-sun pl-5 font-heading text-2xl leading-snug font-light text-ink italic md:text-3xl">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-10 border-border" />,
    table: ({ children }) => (
      <div className="my-8 overflow-x-auto">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-border px-3 py-2 text-left font-normal text-ink">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-border px-3 py-2 text-cocoa">{children}</td>
    ),
    ...components,
  };
}
