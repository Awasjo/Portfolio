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
        setAudioError(
          "Your browser doesn't support this now, please use an updated browser"
        );
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

      {/* Hero Section */}
      <section
        id="hero"
        className="h-[50vh] bg-cover bg-center flex-center flex-col"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?fm=jpg&q=80&w=3000&auto=format&fit=crop')`,
        }}
      >
        <div
          className="text-center px-4 py-8 rounded-xl"
          style={{ background: "rgba(30,20,10,0.52)", backdropFilter: "blur(2px)" }}
        >
          <p className="text-2xl md:text-5xl font-bold text-amber-50 leading-tight">
            Educator. Technologist.
          </p>
          <p className="text-xl md:text-3xl font-semibold text-amber-200 mt-2">
            Someone who genuinely loves helping people grow.
          </p>
          <p className="text-base md:text-lg mt-4 text-amber-100 tracking-wide">
            Awas Jomail — Toronto, ON
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-container">
        <h2 className="section-heading">Projects</h2>
        <div className="grid-responsive">
          <ProjectCard
            image="/astravita-logo-alt.svg"
            link="https://astravitademo.netlify.app/"
            title="AstraVita"
            description="AstraVita is a web application designed to provide users with personalized health and wellness recommendations based on genomic testing."
          />
          <ProjectCard
            image="/Expo.svg"
            link="https://github.com/Awasjo/Personal-Finance-Management-App/tree/main#"
            title="Personal Financial Management App"
            description="A mobile application designed to help users manage their finances effectively. This is a work in progress."
          />
          <ProjectCard
            image="/RestoreHolisticallyLogo.svg"
            link="https://www.restoreholistically.ca/"
            title="Restore Holistically"
            description="A web application created through Wix.com for a relative to sell holistic nutrition dietary services and advice."
          />
        </div>
      </section>

      {/* Experience & Background Section */}
      <section
        id="resume"
        className="bg-secondary text-amber-50 section-container shadow-lg"
      >
        <h2 className="section-heading">Experience &amp; Background</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="primary-card flex flex-col">
            <h3 className="font-bold text-lg mb-3">Work Experience</h3>
            <div className="flex-grow space-y-3">
              <div>
                <p className="text-sm font-semibold">🏫 Vice Principal</p>
                <p className="text-xs opacity-80">Spirit of Math Schools (Willowdale) · Aug 2025 – Present</p>
              </div>
              <div>
                <p className="text-sm font-semibold">🏫 Remedial Teacher</p>
                <p className="text-xs opacity-80">YAAACE · Apr 2026 – Jun 2026</p>
              </div>
              <div>
                <p className="text-sm font-semibold">💊 Pharmacy Assistant</p>
                <p className="text-xs opacity-80">Loblaws · Jun 2021 – Present</p>
              </div>
              <div>
                <p className="text-sm font-semibold">💻 Production App Support Analyst</p>
                <p className="text-xs opacity-80">CIBC · Sep 2023 – Dec 2023</p>
              </div>
            </div>
          </div>
          <div className="primary-card flex flex-col">
            <h3 className="font-bold text-lg mb-3">Education</h3>
            <div className="flex-grow space-y-3">
              <div>
                <p className="text-sm font-semibold">Software Engineering Technology Diploma</p>
                <p className="text-xs opacity-80">Centennial College · Sep 2021 – Dec 2024</p>
              </div>
              <div>
                <p className="text-sm font-semibold">Honours Bachelor of Science</p>
                <p className="text-xs opacity-80">Sep 2015 – Jun 2019</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="pdf-container w-full max-w-3xl mx-auto my-6 rounded-lg overflow-hidden shadow-lg">
            <object
              data="/Awas_Jomail_Resume_June2026.pdf"
              type="application/pdf"
              className="w-full"
              style={{ height: "70vh" }}
            >
              <p className="text-center p-4 bg-gray-100">
                Your browser doesn't support embedded PDFs.
                <a
                  href="/Awas_Jomail_Resume_June2026.pdf"
                  className="text-blue-600 underline ml-1"
                >
                  Click here to download the PDF.
                </a>
              </p>
            </object>
          </div>
        </div>
        <div className="text-center mt-6 flex flex-col md:flex-row md:justify-around">
          <a
            href="/Awas_Jomail_Resume_June2026.pdf"
            className="button-primary mb-4 md:mb-0"
          >
            View / Download Resume
          </a>
        </div>
      </section>

      {/* Technologies Section */}
      <TechnologyStack />

      {/* About Me Section */}
      <section id="about" className="section-container-alt">
        <h2 className="section-heading">About Me</h2>
        <div className="flex-responsive container-max-width gap-8 px-4">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="avatar-container w-64 h-64 md:w-72 md:h-72">
              <img src="/awas.png" alt="Awas Jomail" className="avatar-image" />
            </div>
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <h3 className="section-subtitle">Hello, I'm Awas Jomail</h3>
              <>
                <button
                  className="ml-2 mb-3 hover:opacity-80 cursor-pointer"
                  onClick={playAudio}
                  aria-label="Play name pronunciation"
                >
                  <img
                    src="/Speaker.svg"
                    alt="Speaker Icon"
                    className="w-6 h-6 hover:opacity-80"
                  />
                </button>
                {audioError && (
                  <p className="text-red-500 text-xs mt-1">{audioError}</p>
                )}
              </>
            </div>
            <p className="text-paragraph mt-4">
              I'm an educator and technologist who leads with people first. As Vice Principal
              at Spirit of Math Schools (Willowdale), I get to do what I love every day:
              helping students build confidence, supporting teachers in their practice, and
              making sure no one falls through the cracks.
            </p>
            <p className="text-paragraph mt-3">
              I came up through software engineering at Centennial and spent time in production
              support at CIBC and pharmacy care at Loblaws — and what I found in every single
              one of those roles is that the technical part is rarely the hardest part. The hard
              part is communication: listening well, explaining clearly, staying calm when things
              go sideways, and following through until the problem is actually solved.
            </p>
            <p className="text-paragraph mt-3">
              I show up, I follow through, and I make sure no one gets left behind.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-5">
              <span className="skill-tag hover-transition">Educational Leadership</span>
              <span className="skill-tag hover-transition">Curriculum Delivery</span>
              <span className="skill-tag hover-transition">Mentoring &amp; Coaching</span>
              <span className="skill-tag hover-transition">People-First Communication</span>
              <span className="skill-tag hover-transition">Technical Problem Solving</span>
              <span className="skill-tag hover-transition">Web Development</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      <Footer />
    </div>
  );
}

export default HomePage;
