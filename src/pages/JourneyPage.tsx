import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { milestones } from "../data/journeyData";

// Types
interface Milestone {
  year: string;
  title: string;
  description: string;
  position: number;
}

// Category helper
function getCategory(m: Milestone): "education" | "work" | "teaching" | "future" {
  const t = m.title.toLowerCase();
  if (t.includes("principal") || t.includes("teacher") || t.includes("educator")) return "teaching";
  if (t.includes("university") || t.includes("software engineering") || t.includes("college")) return "education";
  if (t.includes("onward") || t.includes("present & onward")) return "future";
  return "work";
}

const CATEGORY_COLORS: Record<string, string> = {
  education: "#7c5c2e",
  work:      "#3a5c3a",
  teaching:  "#b45309",
  future:    "#1e3a5f",
};

const CATEGORY_LABELS: Record<string, string> = {
  education: "Education",
  work:      "Work",
  teaching:  "Teaching",
  future:    "What's Next",
};

const CATEGORY_ICONS: Record<string, string> = {
  education: "\u{1F393}",
  work:      "\u{1F4BC}",
  teaching:  "\u{1F3EB}",
  future:    "\u{1F31F}",
};

// Milestone Card
function MilestoneCard({
  milestone,
  index,
  isActive,
  onClick,
}: {
  milestone: Milestone;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const cat = getCategory(milestone);
  const color = CATEGORY_COLORS[cat];
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`flex w-full items-center gap-4 cursor-pointer select-none ${isLeft ? "flex-row" : "flex-row-reverse"}`}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`Milestone: ${milestone.title}`}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      {/* Card */}
      <div
        className={`w-[calc(50%-2rem)] rounded-2xl border-2 p-4 transition-all duration-300 ${isActive ? "shadow-2xl scale-[1.03] border-amber-400 bg-[#2a1f0e]" : "border-transparent bg-[#1e1709] hover:border-amber-700 hover:scale-[1.01]"}`}
        style={{ borderLeftColor: isActive ? color : undefined }}
      >
        <div
          className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold mb-2 text-amber-50"
          style={{ backgroundColor: color }}
        >
          <span>{CATEGORY_ICONS[cat]}</span>
          <span>{CATEGORY_LABELS[cat]}</span>
        </div>
        <p className="text-amber-400 text-xs font-mono mb-1">{milestone.year}</p>
        <h3 className={`font-bold leading-snug mb-2 ${isActive ? "text-amber-100 text-base" : "text-amber-200 text-sm"}`}>
          {milestone.title}
        </h3>
        <div className={`overflow-hidden transition-all duration-500 ${isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
          <p className="text-amber-100/80 text-xs leading-relaxed">{milestone.description}</p>
        </div>
      </div>

      {/* Centre dot */}
      <div className="flex flex-col items-center w-16 flex-shrink-0">
        <div
          className={`w-5 h-5 rounded-full border-4 border-amber-900 transition-all duration-300 z-10 ${isActive ? "scale-150 border-amber-400" : "scale-100"}`}
          style={{ backgroundColor: isActive ? color : "#4a3218" }}
        />
      </div>

      {/* Spacer */}
      <div className="w-[calc(50%-2rem)]" />
    </div>
  );
}

// Main Page
export default function JourneyPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState<string>("all");
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const categories = ["all", "education", "teaching", "work", "future"];

  const filtered = filter === "all"
    ? milestones
    : milestones.filter((m) => getCategory(m) === filter);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
    },
    [filtered.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    const el = cardRefs.current[activeIndex];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

  const progress = filtered.length > 1 ? activeIndex / (filtered.length - 1) : 1;

  return (
    <div className="min-h-screen bg-[#120d06] text-amber-50" ref={containerRef}>
      {/* Sticky header */}
      <div className="sticky top-0 z-50 bg-[#120d06]/95 backdrop-blur border-b border-amber-900/40 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <Link to="/" className="flex items-center gap-2 text-amber-300 hover:text-amber-100 transition-colors text-sm font-medium">
            <span>&#8592;</span> Back to Portfolio
          </Link>
          <div className="text-center flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold text-amber-100 truncate">My Journey</h1>
            <p className="text-amber-400/70 text-xs hidden md:block">
              &#8593; &#8595; keys or click to explore &middot; {activeIndex + 1} / {filtered.length}
            </p>
          </div>
          <div className="w-28 flex-shrink-0">
            <div className="h-1.5 bg-amber-900/40 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-2 flex gap-2 flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`text-xs px-3 py-1 rounded-full border transition-all duration-200 capitalize ${filter === cat ? "bg-amber-700 border-amber-500 text-amber-50 font-semibold" : "border-amber-800 text-amber-400 hover:border-amber-500 hover:text-amber-200"}`}
            >
              {cat === "all" ? "All Milestones" : `${CATEGORY_ICONS[cat]} ${CATEGORY_LABELS[cat]}`}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline body */}
      <div className="max-w-4xl mx-auto px-4 py-10 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-amber-900/50 -translate-x-1/2 pointer-events-none" />
        <div
          className="absolute left-1/2 top-0 w-px bg-amber-500/60 -translate-x-1/2 pointer-events-none transition-all duration-500"
          style={{ height: `${progress * 100}%` }}
        />
        <div className="flex flex-col gap-6">
          {filtered.map((milestone, index) => (
            <div
              key={`${milestone.title}-${index}`}
              ref={(el) => { cardRefs.current[index] = el; }}
            >
              <MilestoneCard
                milestone={milestone}
                index={index}
                isActive={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <div className="text-center">
            <div className="w-8 h-8 rounded-full bg-amber-700 border-4 border-amber-400 mx-auto mb-3" />
            <p className="text-amber-300 font-semibold text-sm">The road continues&#8230;</p>
            <Link to="/" className="mt-4 inline-block text-xs text-amber-500 hover:text-amber-300 underline underline-offset-4 transition-colors">
              Return to Portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile hint */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 bg-amber-900/80 backdrop-blur text-amber-100 text-xs px-4 py-2 rounded-full pointer-events-none">
        Tap a milestone to expand it
      </div>
    </div>
  );
}
