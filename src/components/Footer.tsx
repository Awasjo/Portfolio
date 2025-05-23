import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-primary p-8 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About/Logo Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Awas Jomail</h3>
            <p className="mb-4">Software Developer passionate about creating responsive, user-friendly applications with modern technologies.</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-burnt-amber transition-colors">Home</a></li>
              <li><a href="#projects" className="hover:text-burnt-amber transition-colors">Projects</a></li>
              <li><a href="#resume" className="hover:text-burnt-amber transition-colors">Resume</a></li>
              <li><a href="#contact" className="hover:text-burnt-amber transition-colors">Contact</a></li>
              <li><Link to="/journey" className="hover:text-burnt-amber transition-colors">My Journey</Link></li>
            </ul>
          </div>
          
          {/* Connect Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a href="https://github.com/Awasjo" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/awasjomail" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="mailto:awasjomail@gmail.com" className="social-icon" aria-label="Email">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                </svg>
              </a>
            </div>
            <p>Email: awasjomail@gmail.com</p>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center">
          <p>© {currentYear} Awas Jomail. All rights reserved.</p>
          <p className="text-xs mt-2 text-gray-500 hidden md:block">
            Interactive technology showcase powered by vanilla JavaScript physics. 
            <span className="italic"> Developed with AI assistance from GitHub Copilot.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer