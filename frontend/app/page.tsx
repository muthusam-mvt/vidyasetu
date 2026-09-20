"use client";

import { useState } from "react";
import Chatbot from "@/components/Chatbot";
import OrnateFrame from "@/components/OrnateFrame";
import TopicCard from "@/components/TopicCard";
import { TOPICS } from "@/lib/topics";

export default function Home() {
  const [activeNav, setActiveNav] = useState("home");

  function handleNavClick(navId: string) {
    setActiveNav(navId);
    if (navId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const archiveSection = document.getElementById("archive-section");
      if (archiveSection) {
        archiveSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  return (
    <div className="relative w-full overflow-hidden">
      {/* --- Top Hero Container with Vertical Velvet Banner --- */}
      <section className="relative pt-6 sm:pt-10 pb-16 md:pb-24 px-2 sm:px-4">
        {/* --- The Vertical Crimson Velvet Banner (Directly matches reference) --- */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[480px] md:w-[620px] lg:w-[720px] h-[820px] sm:h-[860px] md:h-[900px] crimson-banner rounded-b-[4px] pointer-events-none z-0"
          aria-hidden="true"
        >
          {/* Top Gold Trim Bar */}
          <div className="w-full h-2 bg-gradient-to-r from-brass-dark via-brass-light to-brass-dark border-b border-[#2b0808]" />
          {/* Subtle Inner Gold Filament */}
          <div className="absolute inset-x-3 inset-y-3 border border-brass/35 pointer-events-none" />
        </div>

        {/* --- Site Title in Google Gothic Font (UnifrakturMaguntia) --- */}
        <div className="relative z-10 text-center pt-2 pb-6 max-w-4xl mx-auto">
          <h1 className="gothic-title text-4xl sm:text-6xl md:text-7xl font-normal leading-tight">
            Bhāratīya Vidyā Setu
          </h1>
          <p className="font-deva text-brass-light text-xs sm:text-sm md:text-base tracking-widest mt-1 opacity-90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
            भारतीय ज्ञान परम्परा सेतु · A Bridge to Indian Knowledge Systems
          </p>
        </div>

        {/* --- The Master Ornate Frame with Suspended Nav & Two-Column Parchment Canvas --- */}
        <div className="relative z-10">
          <OrnateFrame
            activeNav={activeNav}
            onNavClick={handleNavClick}
            showNav={true}
          >
            <Chatbot />
          </OrnateFrame>
        </div>

        {/* --- Lower Velvet Banner Extension with Copyright Note --- */}
        <div className="relative z-10 max-w-[320px] sm:max-w-[480px] md:max-w-[620px] lg:max-w-[720px] mx-auto text-center -mt-6">
          <div className="py-2.5 px-4 bg-[#300808]/95 border-x-2 border-b-2 border-brass/80 shadow-[0_12px_28px_rgba(0,0,0,0.85)] rounded-b-sm">
            <p className="font-display text-[10px] sm:text-xs text-brass-light/85 tracking-widest uppercase">
              Design by Muthusam V Thevar
            </p>
          </div>
        </div>
      </section>

      {/* --- Archive Section (Subtopics with Parchment Double-Border Cards) --- */}
      <section id="archive-section" className="relative z-10 px-4 pb-24 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="manuscript-divider flex-1" />
          <div className="text-center">
            <span className="font-deva text-xs text-brass-light tracking-widest uppercase block mb-1">
              ज्ञान भण्डार
            </span>
            <h2 className="gothic-title text-2xl md:text-4xl text-[#fff7e6]">
              Explore the Archive
            </h2>
          </div>
          <div className="manuscript-divider flex-1" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOPICS.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} />
          ))}
        </div>
      </section>
    </div>
  );
}
