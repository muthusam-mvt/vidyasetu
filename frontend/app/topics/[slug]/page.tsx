import { notFound } from "next/navigation";
import Link from "next/link";
import OrnateFrame from "@/components/OrnateFrame";
import { TOPICS, getTopic } from "@/lib/topics";

export function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const topic = getTopic(params.slug);
  return { title: topic ? `${topic.title} — Vidya Setu` : "Vidya Setu" };
}

export default function SubtopicPage({ params }: { params: { slug: string } }) {
  const topic = getTopic(params.slug);
  if (!topic) return notFound();

  return (
    <section className="px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="vintage-btn vintage-btn-arrow-left text-xs py-1 px-4">
            Back to Sanctum
          </Link>
        </div>

        <OrnateFrame showNav={false} className="hero-reveal">
          <p className="font-deva text-brass-dark text-base mb-1 font-semibold">{topic.devanagari}</p>
          <h1 className="font-display text-2xl md:text-4xl text-maroon-deep mb-3 tracking-wide font-bold">
            {topic.title}
          </h1>
          <p className="font-body text-ink/70 italic mb-6 text-sm md:text-base">{topic.tagline}</p>
          <div className="manuscript-divider mb-6" />
          <p className="font-body text-ink-deep leading-relaxed text-base md:text-lg mb-8">{topic.summary}</p>

          <div className="space-y-8">
            {topic.sections.map((s) => (
              <article key={s.heading} className="p-4 bg-[#e8d7b3]/40 border-l-2 border-brass-dark rounded-r-sm">
                <h2 className="font-display text-lg text-maroon-deep font-bold mb-2">{s.heading}</h2>
                <p className="font-body text-ink-deep text-sm md:text-base leading-relaxed">{s.body}</p>
              </article>
            ))}
          </div>
        </OrnateFrame>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TOPICS.filter((t) => t.slug !== topic.slug).map((t) => (
            <Link
              key={t.slug}
              href={`/topics/${t.slug}`}
              className="vintage-topic-card p-4 rounded-[2px] hover:-translate-y-1 transition-transform"
            >
              <span className="text-[10px] uppercase tracking-widest text-brass-dark font-display font-semibold">Related Scroll</span>
              <p className="font-display text-sm font-bold text-maroon-deep mt-1">{t.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
