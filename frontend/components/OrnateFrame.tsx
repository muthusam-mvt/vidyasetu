"use client";

import React from "react";

export interface OrnateFrameProps {
  children: React.ReactNode;
  className?: string;
  activeNav?: string;
  onNavClick?: (nav: string) => void;
  showNav?: boolean;
}

const NAV_ITEMS = [
  { id: "home", label: "HOME" },
  { id: "manuscripts", label: "MANUSCRIPTS" },
  { id: "languages", label: "LANGUAGES" },
  { id: "museums", label: "MUSEUMS" },
  { id: "public-services", label: "SERVICES" },
  { id: "settings", label: "SETTINGS" },
];

export default function OrnateFrame({
  children,
  className = "",
  activeNav = "home",
  onNavClick,
  showNav = true,
}: OrnateFrameProps) {
  return (
    <div className={`relative max-w-5xl mx-auto my-8 ${className}`}>
      {/* --- Suspension Wires (hanging from top of page) --- */}
      <div className="absolute -top-32 left-10 h-32 suspension-wire hidden md:block" />
      <div className="absolute -top-32 right-10 h-32 suspension-wire hidden md:block" />
      <div className="absolute -top-32 left-32 h-32 suspension-wire hidden lg:block opacity-60" />
      <div className="absolute -top-32 right-32 h-32 suspension-wire hidden lg:block opacity-60" />

      {/* --- Outer Left Ornate Scroll Bracket & Hanging Pennant --- */}
      <div className="absolute -left-12 md:-left-16 top-10 z-30 hidden sm:flex flex-col items-center pointer-events-none">
        {/* Curved Iron Scroll Bracket */}
        <svg
          className="w-16 h-28 text-[#c0a273] drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
          viewBox="0 0 64 112"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M58 20 C30 20, 10 35, 12 60 C14 80, 36 82, 38 72 C40 60, 26 58, 24 68 C22 76, 32 86, 44 86 C56 86, 62 70, 60 52 C58 36, 46 28, 30 30"
            stroke="url(#ironGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M60 40 C45 38, 28 50, 30 70"
            stroke="url(#ironGradLight)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="58" cy="20" r="4.5" fill="#d8bd82" stroke="#2a1f14" strokeWidth="1.5" />
          <circle cx="38" cy="72" r="3.5" fill="#a8854d" stroke="#1c140c" strokeWidth="1.2" />
          <defs>
            <linearGradient id="ironGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e2c892" />
              <stop offset="40%" stopColor="#7a6240" />
              <stop offset="80%" stopColor="#3d2e1c" />
              <stop offset="100%" stopColor="#9c8052" />
            </linearGradient>
            <linearGradient id="ironGradLight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#55412a" />
            </linearGradient>
          </defs>
        </svg>

        {/* Hanging Crimson Pennant */}
        <div className="w-7 h-48 swallowtail-pennant -mt-6 relative flex flex-col items-center">
          <div className="w-[1px] h-full bg-gradient-to-b from-brass-light/80 via-transparent to-brass-dark/60" />
          <div className="absolute top-2 w-3 h-3 rounded-full bg-brass/40 border border-brass/70" />
        </div>
      </div>

      {/* --- Outer Right Ornate Scroll Bracket & Hanging Pennant --- */}
      <div className="absolute -right-12 md:-right-16 top-10 z-30 hidden sm:flex flex-col items-center pointer-events-none">
        {/* Curved Iron Scroll Bracket (Mirrored) */}
        <svg
          className="w-16 h-28 text-[#c0a273] scale-x-[-1] drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
          viewBox="0 0 64 112"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M58 20 C30 20, 10 35, 12 60 C14 80, 36 82, 38 72 C40 60, 26 58, 24 68 C22 76, 32 86, 44 86 C56 86, 62 70, 60 52 C58 36, 46 28, 30 30"
            stroke="url(#ironGradRight)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M60 40 C45 38, 28 50, 30 70"
            stroke="url(#ironGradRightLight)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="58" cy="20" r="4.5" fill="#d8bd82" stroke="#2a1f14" strokeWidth="1.5" />
          <circle cx="38" cy="72" r="3.5" fill="#a8854d" stroke="#1c140c" strokeWidth="1.2" />
          <defs>
            <linearGradient id="ironGradRight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e2c892" />
              <stop offset="40%" stopColor="#7a6240" />
              <stop offset="80%" stopColor="#3d2e1c" />
              <stop offset="100%" stopColor="#9c8052" />
            </linearGradient>
            <linearGradient id="ironGradRightLight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#55412a" />
            </linearGradient>
          </defs>
        </svg>

        {/* Hanging Crimson Pennant */}
        <div className="w-7 h-48 swallowtail-pennant -mt-6 relative flex flex-col items-center">
          <div className="w-[1px] h-full bg-gradient-to-b from-brass-light/80 via-transparent to-brass-dark/60" />
          <div className="absolute top-2 w-3 h-3 rounded-full bg-brass/40 border border-brass/70" />
        </div>
      </div>

      {/* --- Top Filigree Arch Ornament --- */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex items-center justify-center">
        <svg
          className="w-56 h-10 text-[#d8bd82] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
          viewBox="0 0 240 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M120 4 C140 18, 170 8, 195 24 C210 32, 230 32, 238 34"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M120 4 C100 18, 70 8, 45 24 C30 32, 10 32, 2 34"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M120 4 C128 14, 145 22, 160 22 C175 22, 185 14, 195 24"
            stroke="#a6844b"
            strokeWidth="1.5"
          />
          <path
            d="M120 4 C112 14, 95 22, 80 22 C65 22, 55 14, 45 24"
            stroke="#a6844b"
            strokeWidth="1.5"
          />
          <circle cx="120" cy="6" r="4.5" fill="#f7efda" stroke="#5a4225" strokeWidth="1.5" />
          <circle cx="65" cy="18" r="3" fill="#b8945a" />
          <circle cx="175" cy="18" r="3" fill="#b8945a" />
        </svg>
      </div>

      {/* --- The Heavy Metallic Beveled Frame --- */}
      <div className="metallic-frame-wrap p-4 sm:p-6 md:p-8 rounded-[4px]">
        {/* Bottom Left Fleur-de-lis Finial */}
        <div className="absolute -bottom-5 -left-5 z-30 pointer-events-none">
          <FleurDeLis className="w-12 h-12 text-[#d8bd82] drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]" />
        </div>

        {/* Bottom Right Fleur-de-lis Finial */}
        <div className="absolute -bottom-5 -right-5 z-30 pointer-events-none scale-x-[-1]">
          <FleurDeLis className="w-12 h-12 text-[#d8bd82] drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]" />
        </div>

        {/* Top Left Metal Finial */}
        <div className="absolute -top-3 -left-3 z-30 pointer-events-none">
          <CornerRosette className="w-8 h-8 text-[#d8bd82] drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]" />
        </div>

        {/* Top Right Metal Finial */}
        <div className="absolute -top-3 -right-3 z-30 pointer-events-none scale-x-[-1]">
          <CornerRosette className="w-8 h-8 text-[#d8bd82] drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]" />
        </div>

        {/* --- Inner Parchment Canvas --- */}
        <div className="parchment-canvas rounded-[2px] p-4 sm:p-6 md:p-8">
          {/* --- Suspended Navigation Bar Inside Top of Frame --- */}
          {showNav && (
            <div className="relative mb-6 -mt-2 -mx-2 sm:-mx-4">
              <nav className="suspended-nav flex items-center justify-center gap-1 sm:gap-3 md:gap-6 py-2 px-3 text-xs md:text-sm font-display tracking-wider text-parchment-light shadow-md overflow-x-auto">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeNav === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onNavClick && onNavClick(item.id)}
                      className={`relative px-2 sm:px-3 py-1 transition-colors uppercase font-bold tracking-widest whitespace-nowrap ${
                        isActive
                          ? "text-[#ffffff] text-shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                          : "text-parchment-dark/75 hover:text-brass-light"
                      }`}
                    >
                      {isActive && <div className="nav-spotlight" aria-hidden="true" />}
                      <span>{item.label}</span>
                      {isActive && (
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-brass-light shadow-[0_0_6px_#fff]" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          )}

          {/* Children Content */}
          {children}
        </div>
      </div>
    </div>
  );
}

function FleurDeLis({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M24 4 C20 14, 16 18, 16 28 C16 34, 21 36, 24 38 C27 36, 32 34, 32 28 C32 18, 28 14, 24 4 Z"
        fill="url(#fleurGold)"
        stroke="#2b1f13"
        strokeWidth="1.2"
      />
      <path
        d="M16 26 C10 20, 4 22, 4 28 C4 35, 12 37, 18 34 C16 31, 15 28, 16 26 Z"
        fill="url(#fleurGoldDark)"
        stroke="#2b1f13"
        strokeWidth="1.2"
      />
      <path
        d="M32 26 C38 20, 44 22, 44 28 C44 35, 36 37, 30 34 C32 31, 33 28, 32 26 Z"
        fill="url(#fleurGoldDark)"
        stroke="#2b1f13"
        strokeWidth="1.2"
      />
      <rect x="14" y="36" width="20" height="4" rx="1.5" fill="#e8cf97" stroke="#332415" strokeWidth="1" />
      <path d="M20 40 L24 46 L28 40 Z" fill="#9c7a45" stroke="#251a0f" strokeWidth="1" />
      <defs>
        <linearGradient id="fleurGold" x1="24" y1="4" x2="24" y2="46">
          <stop offset="0%" stopColor="#fff2d6" />
          <stop offset="35%" stopColor="#d4b26f" />
          <stop offset="70%" stopColor="#876632" />
          <stop offset="100%" stopColor="#4d3718" />
        </linearGradient>
        <linearGradient id="fleurGoldDark" x1="0" y1="20" x2="48" y2="40">
          <stop offset="0%" stopColor="#bfa063" />
          <stop offset="100%" stopColor="#574020" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CornerRosette({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="13" fill="url(#rosetteGrad)" stroke="#1a120b" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="8" stroke="#f6ecdb" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="16" cy="16" r="4.5" fill="#f6ecdb" />
      <path d="M16 3 L16 29 M3 16 L29 16" stroke="#4a3621" strokeWidth="1" />
      <defs>
        <radialGradient id="rosetteGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#faebcc" />
          <stop offset="60%" stopColor="#a3824b" />
          <stop offset="100%" stopColor="#3d2c18" />
        </radialGradient>
      </defs>
    </svg>
  );
}
