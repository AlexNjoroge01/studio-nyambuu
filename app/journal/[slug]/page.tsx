import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { ComponentType } from "react";

import { PageTop } from "@/components/layout/page-top";
import { SiteImage } from "@/components/media/site-image";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPost, publishedPosts, type JournalPost } from "@/content/journal";
import { getService } from "@/content/services";
import { articleSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type ArticleRouteProps = {
  params: Promise<{ slug: string }>;
};

const articleImports: Record<
  string,
  () => Promise<{ default: ComponentType }>
> = {
  "what-to-wear-to-a-kenyan-wedding": () =>
    import("@/content/journal/what-to-wear-to-a-kenyan-wedding.mdx"),
  "edit-your-wardrobe-in-a-weekend": () =>
    import("@/content/journal/edit-your-wardrobe-in-a-weekend.mdx"),
  "capsule-wardrobe-for-nairobi-women": () =>
    import("@/content/journal/capsule-wardrobe-for-nairobi-women.mdx"),
};

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: ArticleRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post || post.draft) {
    return buildMetadata({
      title: "Article not found",
      description: "This journal article could not be found.",
      path: `/journal/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/journal/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    image: `${site.url}/journal/${post.slug}/opengraph-image`,
    keywords: [post.category, "Nairobi", "Kenya", "personal styling"],
  });
}

export default async function JournalArticlePage({ params }: ArticleRouteProps) {
  const { slug } = await params;
  const post: JournalPost | undefined = getPost(slug);

  if (!post || post.draft) notFound();

  const loadArticle = articleImports[post.slug];
  if (!loadArticle) notFound();

  const { default: Content } = await loadArticle();
  const service = getService(post.service);

  return (
    <>
      <PageTop
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Journal", href: "/journal" },
          { name: post.title, href: `/journal/${post.slug}` },
        ]}
      />

      <article className="pb-16 md:pb-24">
        <header className="container-page pt-10 md:pt-16">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="secondary" className="label font-normal text-cocoa">
                {post.category}
              </Badge>
              <span className="label text-cocoa/70">{post.readTime}</span>
            </div>
            <h1 className="mt-5 font-heading text-[clamp(2.6rem,6.5vw,5.6rem)] leading-[0.94] font-light tracking-[-0.03em] text-ink">
              {post.title}
            </h1>
            <p className="mt-6 max-w-[60ch] text-base leading-relaxed text-cocoa md:text-lg">
              {post.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-5">
              <p className="text-sm text-ink">
                By <span className="font-normal">Nyambura Mbugua</span>
              </p>
              <span className="text-cocoa/40" aria-hidden>
                ·
              </span>
              <time dateTime={post.publishedAt} className="text-sm text-cocoa">
                {format(new Date(post.publishedAt), "d MMMM yyyy")}
              </time>
              <span className="text-cocoa/40" aria-hidden>
                ·
              </span>
              <Link href="/about" className="text-sm text-cocoa underline-offset-4 hover:text-cobalt hover:underline">
                About the author
              </Link>
            </div>
          </div>
        </header>

        <div className="container-page mt-10 md:mt-14">
          <SiteImage
            name={post.cover}
            aspect="16/9"
            priority
            sizes="100vw"
          />
        </div>

        <div className="container-page mt-12">
          <div className="mx-auto max-w-[68ch]">
            <Content />

            {service && (
              <aside className="mt-14 border-t border-border pt-8">
                <p className="label mb-3 text-cocoa">Related service</p>
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <h2 className="font-heading text-3xl leading-none font-light text-ink">
                      {service.name}
                    </h2>
                    <p className="mt-2 text-sm text-cocoa">{service.tagline}</p>
                  </div>
                  <Button asChild variant="ink" size="lg">
                    <Link href={`/services/${service.slug}`}>
                      Explore the service <ArrowUpRight />
                    </Link>
                  </Button>
                </div>
              </aside>
            )}

            <div className="mt-10">
              <Link
                href="/journal"
                className="inline-flex items-center gap-2 text-sm text-cocoa underline-offset-4 hover:text-cobalt hover:underline"
              >
                <ArrowLeft className="size-4" /> Back to the journal
              </Link>
            </div>
          </div>
        </div>
      </article>

      <CtaBand
        eyebrow="Need it handled?"
        title={{ lead: "Let's build the", emphasis: "look." }}
        body="Reading is a good start. If you want the outfit planned around your body, budget and occasion, send a short brief."
      />

      <JsonLd data={articleSchema(post)} />
    </>
  );
}
