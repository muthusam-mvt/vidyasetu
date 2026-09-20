export type Topic = {
  slug: string;
  navLabel: string;
  title: string;
  devanagari: string;
  tagline: string;
  summary: string;
  sections: { heading: string; body: string }[];
  accent: string; // tailwind color class suffix used for the card's ink wash
};

export const TOPICS: Topic[] = [
  {
    slug: "indian-languages",
    navLabel: "Languages",
    title: "Technology for Indian Languages",
    devanagari: "भाषा प्रौद्योगिकी",
    tagline: "NLP, speech, and translation for 22+ scheduled languages",
    summary:
      "From Pāṇini's grammar to modern transformers — how computational linguistics is being built for Indian scripts, dialects, and speech.",
    sections: [
      {
        heading: "Paninian Grammar & Computation",
        body:
          "Pāṇini's Aṣṭādhyāyī (c. 500 BCE) is often cited as one of the earliest formal grammars, using a generative rule system that has directly influenced computer science formalisms such as Backus-Naur Form. Modern IKS-aligned NLP research revisits karaka (case-role) relations for building more linguistically grounded parsers for Sanskrit and other Indic languages.",
      },
      {
        heading: "Bhashini & the National Language Mission",
        body:
          "Bhashini is India's national platform for building open datasets, models, and APIs for speech recognition, translation, and text-to-speech across Indian languages, enabling developers to plug multilingual capability into public and private applications through a common API layer.",
      },
      {
        heading: "Low-resource script challenges",
        body:
          "Many Indic scripts (Odia, Meitei Mayek, Santali/Ol Chiki) remain low-resource for OCR and speech data. Building usable tech requires community-sourced corpora, script-aware tokenization, and careful evaluation beyond Hindi/English benchmarks.",
      },
    ],
    accent: "sage",
  },
  {
    slug: "heritage-preservation",
    navLabel: "Heritage",
    title: "Heritage Preservation",
    devanagari: "विरासत संरक्षण",
    tagline: "Manuscripts, monuments, and oral traditions in the digital age",
    summary:
      "How digitization, 3D scanning, and metadata standards are being used to preserve India's tangible and intangible heritage before it is lost.",
    sections: [
      {
        heading: "Manuscript Digitization",
        body:
          "India holds an estimated several million manuscripts across palm-leaf, birch-bark, and paper media. Programs such as the National Mission for Manuscripts coordinate high-resolution imaging, cataloguing, and conservation training so fragile texts survive contact with modern hands.",
      },
      {
        heading: "3D Capture of Monuments",
        body:
          "Photogrammetry and LiDAR scanning let conservators create millimetre-accurate digital twins of temples and forts, useful both for structural monitoring and for public-facing virtual tours that reduce footfall-driven wear on the physical site.",
      },
      {
        heading: "Oral Tradition Archives",
        body:
          "Intangible heritage — folk songs, ritual recitation, regional storytelling — is captured through community-led audio/video archiving projects, paired with transcription and translation so the material remains searchable across generations.",
      },
    ],
    accent: "brass",
  },
  {
    slug: "digital-museums",
    navLabel: "Museums",
    title: "Digital Museums",
    devanagari: "डिजिटल संग्रहालय",
    tagline: "Virtual galleries, IIIF, and interactive exhibits",
    summary:
      "Turning static collections into explorable digital experiences — from zoomable high-resolution imagery to AR-guided gallery walks.",
    sections: [
      {
        heading: "IIIF & Interoperable Imaging",
        body:
          "The International Image Interoperability Framework (IIIF) lets museums publish deep-zoom images with a shared API, so a single manuscript folio can be examined pixel-by-pixel from any compliant viewer, anywhere in the world.",
      },
      {
        heading: "Virtual Galleries",
        body:
          "Platforms built on WebGL and panoramic capture let institutions host walkthrough exhibits online, extending reach to visitors who cannot travel to the physical site and enabling curated thematic tours across multiple collections at once.",
      },
      {
        heading: "AR-Guided Exhibits",
        body:
          "Augmented reality overlays — activated by scanning an artefact label — can surface contextual video, multilingual narration, or a reconstruction of a damaged object's original form, deepening engagement without altering the physical exhibit.",
      },
    ],
    accent: "maroon",
  },
  {
    slug: "public-services",
    navLabel: "Public Services",
    title: "Digital Public Services",
    devanagari: "सार्वजनिक सेवाएँ",
    tagline: "e-Governance, DPI, and citizen-facing platforms",
    summary:
      "India's Digital Public Infrastructure (DPI) stack — identity, payments, and data-sharing rails — and how it extends into everyday citizen services.",
    sections: [
      {
        heading: "The DPI Stack",
        body:
          "India's approach to Digital Public Infrastructure layers identity (Aadhaar), payments (UPI), and consent-based data-sharing (Account Aggregator/DEPA) as shared, interoperable rails that both government and private applications can build on.",
      },
      {
        heading: "Multilingual Citizen Services",
        body:
          "Public service portals increasingly integrate Bhashini-style translation and voice interfaces so that filing a grievance or accessing a welfare scheme does not require English or even text literacy.",
      },
      {
        heading: "Open Data & Transparency",
        body:
          "Platforms such as data.gov.in publish government datasets for public reuse, supporting civic-tech applications that track scheme delivery, budget allocation, and service quality at a granular level.",
      },
    ],
    accent: "walnut",
  },
];

export function getTopic(slug: string) {
  return TOPICS.find((t) => t.slug === slug);
}
