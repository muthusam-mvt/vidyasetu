"use client";

import Link from "next/link";
import { useState } from "react";
import { TOPICS } from "@/lib/topics";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-40 bg-[#120a06]/85 border-b border-[#735738]/50 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-12">
        <Link
          href="/"
          className="font-gothic text-[#f6efde] text-xl tracking-wider hover:text-brass-light transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
        >
          Bhāratīya Vidyā Setu
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-display text-xs tracking-widest text-[#d8c39e] uppercase">
          <Link href="/" className="hover:text-[#ffffff] transition-colors">
            Home
          </Link>
          {TOPICS.map((t) => (
            <Link
              key={t.slug}
              href={`/topics/${t.slug}`}
              className="hover:text-[#ffffff] transition-colors"
            >
              {t.navLabel}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-parchment-light border border-brass-dark/60 rounded-sm px-2.5 py-0.5 text-xs font-display"
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          Menu
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-[#1f130b] border-t border-brass-dark/40 px-4 py-3 flex flex-col gap-2 text-[#d8c39e] font-display text-xs tracking-wider">
          <Link href="/" onClick={() => setOpen(false)} className="hover:text-white py-1">
            Home
          </Link>
          {TOPICS.map((t) => (
            <Link
              key={t.slug}
              href={`/topics/${t.slug}`}
              onClick={() => setOpen(false)}
              className="hover:text-white py-1"
            >
              {t.navLabel}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
