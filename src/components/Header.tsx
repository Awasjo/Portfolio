import { useState } from "react";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  
  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-amber-50 dark:bg-[#213527] z-50">
      <nav className="max-w-7xl mx-auto p-4 flex justify-between items-center shadow">
        <div className="flex-center">
          <img
            src="awas.png"
            alt="Logo"
            className="h-10 w-10 rounded-full mr-2"
          />
          <p className="text-xl font-bold">Awas' Portfolio</p>
        </div>
        <button
          className="md:hidden bg-amber-50 dark:bg-yellow-950 p-3 rounded-full shadow-ring"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <img src="/Menu.svg" alt="Menu Icon" className="h-6 w-6" />
        </button>
        <ul
          className={`${
            isNavOpen ? "block" : "hidden"
          } md:flex gap-4 flex-center`}
        >
          <li>
            <a href="#hero" className="block text-lg">
              Home
            </a>
          </li>
          <li>
            <a href="#projects" className="block text-lg">
              Projects
            </a>
          </li>
          <li>
            <a href="#resume" className="block text-lg">
              Resume
            </a>
          </li>
          <li>
            <a href="#technologies" className="block text-lg">
              Technologies
            </a>
          </li>
          <li>
            <a href="#about" className="block text-lg">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="block text-lg">
              Contact
            </a>
          </li>
          <li>
            <button
              onClick={toggleDarkMode}
              className="primary-color p-2 rounded-full shadow-ring"
            >
              {isDarkMode ? (
                <img src="/Sun.svg" alt="Light Mode" className="h-6 w-6" />
              ) : (
                <img src="/Moon.svg" alt="Dark Mode" className="h-6 w-6" />
              )}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
