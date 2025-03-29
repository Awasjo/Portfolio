import { useState } from 'react';
import './App.css';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="p-4 flex justify-between items-center rounded-t-lg border-2">
        <div className="text-xl font-bold">Portfolio</div>
        <button
          className="md:hidden"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          ☰
        </button>
        <ul
          className={`md:flex md:gap-4 ${
            isNavOpen ? 'block' : 'hidden'
          } absolute md:static w-full md:w-auto`}
        >
          <li><a href="#hero" className="block p-2">Home</a></li>
          <li><a href="#projects" className="block p-2">Projects</a></li>
          <li><a href="#resume" className="block p-2">Resume</a></li>
          <li><a href="#technologies" className="block p-2">Technologies</a></li>
          <li><a href="#about" className="block p-2">About</a></li>
          <li><a href="#contact" className="block p-2">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="h-[50vh] bg-cover bg-center flex flex-col justify-center items-center text-center text-navy-900"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1693255673359-9535d9a1dd65?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <h1 className="text-5xl font-bold">Welcome to My Portfolio</h1>
        <p className="text-2xl mt-4">Awas Jomail</p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Placeholder for project cards */}
          <div className="border p-4 rounded shadow">
            <img src="https://images.unsplash.com/photo-1693255673359-9535d9a1dd65?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'" alt="Project 1" className="mb-2" />
            <h3 className="font-bold">Project 1</h3>
          </div>
          <div className="border p-4 rounded shadow">
            <img src="https://images.unsplash.com/photo-1693255673359-9535d9a1dd65?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'" alt="Project 2" className="mb-2" />
            <h3 className="font-bold">Project 2</h3>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="bg-purple-500 text-white p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Resume</h2>
        <div className="flex flex-col md:flex-row justify-around">
          <div>
            <h3 className="font-bold">Work</h3>
            <p>Details about work experience...</p>
          </div>
          <div>
            <h3 className="font-bold">Education</h3>
            <p>Details about education...</p>
          </div>
        </div>
        <div className="text-center mt-4">
          <a href="/resume.pdf" className="underline">View PDF</a>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Technologies</h2>
        <div className="flex justify-center gap-4">
          <div className="text-center">
            <img className="h-14" src="https://images.unsplash.com/photo-1693255673359-9535d9a1dd65?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'" alt="React" />
            <p>React</p>
          </div>
          <div className="text-center">
            <img className="h-14" src="https://images.unsplash.com/photo-1693255673359-9535d9a1dd65?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'" alt="TailwindCSS" />
            <p>TailwindCSS</p>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="p-8">
        <h2 className="text-3xl font-bold text-center mb-6">About Me</h2>
        <p className="text-center max-w-2xl mx-auto">
          I am currently exploring opportunities in web development and working on personal projects to enhance my skills.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Reach Out to Me</h2>
        <form
          action={`mailto:awasjomail@gmail.com`}
          method="POST"
          encType="text/plain"
          className="max-w-md mx-auto"
        >
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input type="text" name="name" className="w-full border p-2 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input type="email" name="email" className="w-full border p-2 rounded" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Message</label>
            <textarea name="message" className="w-full border p-2 rounded"></textarea>
          </div>
          <button type="submit" className="bg-purple-500 text-white p-2 rounded">
            Send Message
          </button>
        </form>
      </section>
    </>
  );
}

export default App;
