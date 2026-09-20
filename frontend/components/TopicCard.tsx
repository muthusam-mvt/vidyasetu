import Link from "next/link";
import { Topic } from "@/lib/topics";

export default function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Link
      href={`/topics/${topic.slug}`}
      className="vintage-topic-card group relative block p-5 rounded-[2px]"
    >
      <span className="absolute top-3 right-3 font-deva text-brass-dark text-xs font-semibold px-1.5 py-0.5 border border-brass-dark/30 bg-[#ebd9b4]/60">
        {topic.devanagari}
      </span>
      <h3 className="font-display font-bold text-base md:text-lg text-maroon-deep pr-16 mb-2 tracking-wide group-hover:text-maroon transition-colors">
        {topic.title}
      </h3>
      <div className="manuscript-divider mb-3" />
      <p className="font-body text-xs sm:text-sm text-ink-deep leading-relaxed mb-4">
        {topic.tagline}
      </p>
      <div className="flex justify-end">
        <span className="vintage-btn text-[9px] py-1 px-3">
          Explore &rarr;
        </span>
      </div>
    </Link>
  );
}
