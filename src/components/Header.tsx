import { useState, useEffect } from "react";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check user's preferred color scheme on component mount
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };
  
  // Navigation items to avoid duplication
  const navItems = [
    { href: "#hero", label: "Home" },
    { href: "#projects", label: "Projects" },
    { href: "#resume", label: "Resume" },
    { href: "#technologies", label: "Technologies" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];
  
  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-primary z-50">
      <nav className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <div className="flex-center">
          <a href="#hero" className="flex items-center">
            <img
              src="awas.png"
              alt="Logo"
              className="h-10 w-10 rounded-full mr-2"
            />
            <p className="text-xl font-bold">Awas' Portfolio</p>
          </a>
        </div>
        
        {/* Menu Button - Mobile Only */}
        <button
          className="md:hidden bg-amber-50 dark:bg-yellow-950 p-3 rounded-full shadow-ring z-50"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label={isNavOpen ? "Close menu" : "Open menu"}
        >
          <img src={isNavOpen ? "/Close.svg" : "/Menu.svg"} alt="Menu Icon" className="h-6 w-6" />
        </button>
        
        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex gap-4 flex-center">
          {navItems.map((item, index) => (
            <li key={index}>
              <a href={item.href} className="nav-link">
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={toggleDarkMode}
              className="bg-primary p-2 rounded-full shadow-ring"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <img src="/Sun.svg" alt="Light Mode" className="h-6 w-6" />
              ) : (
                <img src="/Moon.svg" alt="Dark Mode" className="h-6 w-6" />
              )}
            </button>
          </li>
        </ul>
        
        {/* Mobile Menu Popup */}
        {isNavOpen && (
          <div className="absolute top-16 right-4 md:hidden bg-primary rounded-lg shadow-2xl p-6 z-40">
            <ul className="flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.href} 
                    className="nav-link" 
                    onClick={() => setIsNavOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2 border-t">
                <button
                  onClick={() => {
                    toggleDarkMode();
                    setIsNavOpen(false);
                  }}
                  className="bg-primary p-2 rounded-full shadow-ring flex items-center gap-2 mt-2"
                >
                  {isDarkMode ? (
                    <>
                      <img src="/Sun.svg" alt="Light Mode" className="h-6 w-6" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <img src="/Moon.svg" alt="Dark Mode" className="h-6 w-6" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
