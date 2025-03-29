import { useState } from 'react';
import './App.css';

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className='border-2 border-navy-900 rounded-xl'>
      <button
        className="md:hidden fixed bottom-8.5 right-8.5 bg-purple-500 text-white p-3 rounded-full shadow-lg z-50"
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        <img src="/vite.svg" alt="Menu Icon" className="h-6 w-6" />
      </button>
      {/* Navigation Bar */}
      {/* Hamburger Icon for Mobile */}
      <div
        className={`md:hidden fixed bottom-8.5 right-8.5 w-3/4 max-w-sm bg-white rounded-xl ${
          isNavOpen ? '' : 'hidden'
        } shadow-lg md:static md:transform-none md:bg-transparent md:flex md:gap-4`}
      >
        <nav>
        <ul className="flex flex-col items-start p-4 gap-4 md:flex-row md:items-center md:p-0">
          <li><a href="#hero" className="block text-lg" onClick={() => setIsNavOpen(false)}>Home</a></li>
          <li><a href="#projects" className="block text-lg" onClick={() => setIsNavOpen(false)}>Projects</a></li>
          <li><a href="#resume" className="block text-lg" onClick={() => setIsNavOpen(false)}>Resume</a></li>
          <li><a href="#technologies" className="block text-lg" onClick={() => setIsNavOpen(false)}>Technologies</a></li>
          <li><a href="#about" className="block text-lg" onClick={() => setIsNavOpen(false)}>About</a></li>
          <li><a href="#contact" className="block text-lg" onClick={() => setIsNavOpen(false)}>Contact</a></li>
        </ul>
        </nav>
      </div>
      <nav className="p-4 flex justify-between items-center">
        <div className='flex items-center'>
          <img
            src="https://images.unsplash.com/photo-1693255673359-9535d9a1dd65?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
            alt="Logo"
            className="h-10 w-10 rounded-full mr-2"
          />
        <p className="text-xl font-bold">
          Portfolio
          </p>
          </div>
        <ul className="hidden md:flex gap-4">
          <li><a href="#hero" className="block text-lg">Home</a></li>
          <li><a href="#projects" className="block text-lg">Projects</a></li>
          <li><a href="#resume" className="block text-lg">Resume</a></li>
          <li><a href="#technologies" className="block text-lg">Technologies</a></li>
          <li><a href="#about" className="block text-lg">About</a></li>
          <li><a href="#contact" className="block text-lg">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="h-[50vh] bg-cover bg-center flex flex-col justify-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1693255673359-9535d9a1dd65?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="text-center px-4">
          <p className="text-2xl md:text-5xl font-bold text-white leading-tight">
            Welcome to My Portfolio
          </p>
          <p className="text-l md:text-xl mt-4 text-white">
            Awas Jomail
          </p>
        </div>
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
    </div>
  );
}

export default App;
