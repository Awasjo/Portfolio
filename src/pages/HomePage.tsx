import Header from "../components/Header";
import ProjectCard from "../components/ProjectCard";
import TechnologyStack from "../components/TechnologyStack";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { useState } from "react";

function HomePage() {
  const [audioError, setAudioError] = useState("");

  const playAudio = () => {
    // Audio sources in priority order
    const sources = ["/AwasJomail.ogg", "/AwasJomail.mp3", "/AwasJomail.wav"];
    // Clear any previous error
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
      } catch (error) {
        // Try next source on failure
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
          backgroundImage: `url('https://images.unsplash.com/photo-1693255673359-9535d9a1dd65?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="text-center px-4">
          <p className="text-2xl md:text-5xl font-bold text-white leading-tight">
            Welcome to My Portfolio
          </p>
          <p className="text-l md:text-xl mt-4 text-white">Awas Jomail</p>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-container">
        <h2 className="section-heading">Projects</h2>
        <div className="grid-responsive">
          {/* Placeholder for project cards */}
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

      {/* Resume Section */}
      <section
        id="resume"
        className="bg-secondary text-amber-50 section-container shadow-lg"
      >
        <h2 className="section-heading">Resume</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="primary-card flex flex-col">
            <h3 className="font-bold text-lg mb-2">Work</h3>
            <div className="flex-grow">
              <p className="text-sm">
                Pharmacy Assistant
                <br />
                June 2021 - Present
              </p>
              <br />
              <p className="text-sm">
                Production Application Support Analyst <br />
                January 2023 - December 2023
              </p>
            </div>
          </div>
          <div className="primary-card flex flex-col">
            <h3 className="font-bold text-lg mb-2">Education</h3>
            <div className="flex-grow">
              <p className="text-sm">
                Software Engineering Technology Diploma <br /> September 2021 -
                December 2024
              </p>
              <br />
              <p className="text-sm">
                Honors Bachelor of Science <br /> September 2015 - June 2019
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="pdf-container w-full max-w-3xl mx-auto my-6 rounded-lg overflow-hidden shadow-lg">
            <object
              data="/Awas Resume May 30 2025.pdf"
              type="application/pdf"
              className="w-full"
              style={{ height: "70vh"}}
            >
              <p className="text-center p-4 bg-gray-100">
                Your browser doesn't support embedded PDFs.
                <a
                  href="/Awas Resume May 30 2025.pdf"
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
            href="/Awas Resume May 30 2025.pdf"
            className="button-primary mb-4 md:mb-0"
          >
            View PDF
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
              My journey is driven by a passion for technology, empathy, and
              making a positive impact. I thrive at the intersection of
              problem-solving and human connection, combining technical
              expertise with a compassionate approach to create meaningful
              solutions. Whether building software or supporting others, I am
              dedicated to continuous learning and collaboration to make the
              world a better place.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
              <span className="skill-tag hover-transition">Web Development</span>
              <span className="skill-tag hover-transition">Software Engineering</span>
              <span className="skill-tag hover-transition">Problem Solving</span>
              <span className="skill-tag hover-transition">Empathy</span>
              <span className="skill-tag hover-transition">Collaboration</span>
              <span className="skill-tag hover-transition">Continuous Learning</span>
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
