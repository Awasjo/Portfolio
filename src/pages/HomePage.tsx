import Header from "../components/Header";
import ProjectCard from "../components/ProjectCard";
import TechnologyStack from "../components/TechnologyStack";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { useState } from "react";

function HomePage() {
  const [audioError, setAudioError] = useState("");

  const playAudio = () => {
    const sources = ["/AwasJomail.ogg", "/AwasJomail.mp3", "/AwasJomail.wav"];
    setAudioError("");
    const tryPlay = async (index: number) => {
      if (index >= sources.length) {
        setAudioError("Your browser doesn't support this now, please use an updated browser");
        return;
      }
      const audio = new Audio(sources[index]);
      try {
        await audio.play();
      } catch {
        tryPlay(index + 1);
      }
    };
    tryPlay(0);
  };

  return (
    <div className="pt-[72px]">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative flex items-center justify-center"
        style={{ minHeight: "88vh" }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?fm=jpg&q=80&w=3000&auto=format&fit=crop')`,
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: "rgba(20,12,4,0.58)", backdropFilter: "blur(1px)" }} />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-3xl md:text-6xl font-bold text-amber-50 leading-tight tracking-tight">
            Educator. Technologist.
          </p>
          <p className="text-xl md:text-4xl font-semibold text-amber-200 mt-3 leading-snug">
            Someone who genuinely loves helping people grow.
          </p>
          <div className="mt-6 h-px w-20 mx-auto bg-amber-400 rounded opacity-60" />
          <p className="text-base md:text-xl mt-5 text-amber-100 tracking-widest uppercase font-medium">
            Awas Jomail &nbsp;&middot;&nbsp; Toronto, ON
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#about"
              className="px-8 py-3 rounded-xl font-semibold text-base bg-amber-600 hover:bg-amber-500 text-white transition-all duration-200 shadow-lg"
            >
              About Me
            </a>
            <a
              href="#contact"
              className="px-8 py-3 rounded-xl font-semibold text-base border border-amber-200 text-amber-100 hover:bg-amber-100/10 transition-all duration-200"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50">
          <span className="text-amber-100 text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-5 h-5 text-amber-100 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Projects ─────────────────────────────────────────────────────── */}
      <section id="projects" className="px-6 md:px-16 py-20 md:py-28 max-w-5xl mx-auto">
        <h2 className="section-heading">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4 max-w-2xl mx-auto">
          <ProjectCard
            image="/astravita-logo-alt.svg"
            link="https://astravitademo.netlify.app/"
            title="AstraVita"
            description="A web application designed to provide users with personalized health and wellness recommendations based on genomic testing."
          />
          <ProjectCard
            image="/RestoreHolisticallyLogo.svg"
            link="https://www.restoreholistically.ca/"
            title="Restore Holistically"
            description="A web application created for a relative to sell holistic nutrition dietary services and advice."
          />
        </div>
      </section>

      {/* ── Experience & Background ───────────────────────────────────────── */}
      <section id="resume" className="bg-secondary text-amber-50 px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-heading">Experience &amp; Background</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Work Experience */}
            <div className="primary-card flex flex-col gap-5 p-7">
              <h3 className="font-bold text-lg border-b border-sandstone/20 pb-3">Work Experience</h3>
              {[
                { icon: "🏫", title: "Vice Principal", org: "Spirit of Math Schools (Willowdale)", period: "Aug 2025 – Present" },
                { icon: "🏫", title: "Remedial Teacher", org: "YAAACE", period: "Apr 2026 – Jun 2026" },
                { icon: "💊", title: "Pharmacy Assistant", org: "Loblaws", period: "Jun 2021 – Present" },
                { icon: "💻", title: "Production App Support Analyst", org: "CIBC", period: "Sep 2023 – Dec 2023" },
              ].map((r) => (
                <div key={r.title} className="flex gap-3 items-start">
                  <span className="text-xl mt-0.5 leading-none">{r.icon}</span>
                  <div>
                    <p className="font-semibold text-sm leading-snug">{r.title}</p>
                    <p className="text-xs opacity-70 mt-0.5">{r.org}</p>
                    <p className="text-xs opacity-50 mt-0.5">{r.period}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="primary-card flex flex-col gap-5 p-7">
              <h3 className="font-bold text-lg border-b border-sandstone/20 pb-3">Education</h3>
              {[
                { icon: "🎓", title: "Software Engineering Technology Diploma", org: "Centennial College", period: "Sep 2021 – Dec 2024" },
                { icon: "🎓", title: "Honours Bachelor of Science", org: "", period: "Sep 2015 – Jun 2019" },
              ].map((e) => (
                <div key={e.title} className="flex gap-3 items-start">
                  <span className="text-xl mt-0.5 leading-none">{e.icon}</span>
                  <div>
                    <p className="font-semibold text-sm leading-snug">{e.title}</p>
                    {e.org && <p className="text-xs opacity-70 mt-0.5">{e.org}</p>}
                    <p className="text-xs opacity-50 mt-0.5">{e.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PDF Embed */}
          <div className="rounded-xl overflow-hidden shadow-xl ring-1 ring-sandstone/20 mb-8" style={{ height: "60vh" }}>
            <object
              data="/Awas_Jomail_Resume_June2026.pdf"
              type="application/pdf"
              className="w-full h-full"
            >
              <p className="text-center p-6 bg-amber-50 text-gray-700">
                Your browser does not support embedded PDFs.{" "}
                <a href="/Awas_Jomail_Resume_June2026.pdf" className="text-clay underline">
                  Click here to download.
                </a>
              </p>
            </object>
          </div>

          <div className="text-center">
            <a href="/Awas_Jomail_Resume_June2026.pdf" className="button-primary">
              View / Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* ── Technologies ─────────────────────────────────────────────────── */}
      <div className="border-t border-sandstone/30">
        <TechnologyStack />
      </div>

      {/* ── About Me ─────────────────────────────────────────────────────── */}
      <section id="about" className="bg-secondary text-amber-50 px-6 md:px-16 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-heading">About Me</h2>
          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">

            {/* Photo */}
            <div className="flex-shrink-0">
              <div className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-amber-700/40 ring-4 ring-amber-400/20">
                <img src="/awas.png" alt="Awas Jomail" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-5">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">Hello, I am Awas Jomail</h3>
                <button
                  className="hover:opacity-80 cursor-pointer transition-opacity"
                  onClick={playAudio}
                  aria-label="Play name pronunciation"
                >
                  <img src="/Speaker.svg" alt="Speaker" className="w-6 h-6" />
                </button>
              </div>
              {audioError && <p className="text-red-400 text-xs mb-3">{audioError}</p>}

              <p className="text-lg leading-relaxed opacity-90 mb-4">
                I am an educator and technologist who leads with people first. As Vice Principal
                at Spirit of Math Schools (Willowdale), I get to do what I love every day:
                helping students build confidence, supporting teachers in their practice, and
                making sure no one falls through the cracks.
              </p>
              <p className="text-lg leading-relaxed opacity-90 mb-4">
                I came up through software engineering at Centennial and spent time in production
                support at CIBC and pharmacy care at Loblaws — and what I found in every single
                one of those roles is that the technical part is rarely the hardest part. The hard
                part is communication: listening well, explaining clearly, staying calm when things
                go sideways, and following through until the problem is actually solved.
              </p>
              <p className="text-lg leading-relaxed opacity-80 italic mb-7">
                "I show up, I follow through, and I make sure no one gets left behind."
              </p>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {[
                  "Educational Leadership",
                  "Curriculum Delivery",
                  "Mentoring & Coaching",
                  "People-First Communication",
                  "Technical Problem Solving",
                  "Web Development",
                ].map((tag) => (
                  <span key={tag} className="skill-tag hover-transition">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <Contact />

      <Footer />
    </div>
  );
}

export default HomePage;
