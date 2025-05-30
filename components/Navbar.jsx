import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Contact, FileAxis3D, ServerIcon, User } from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(false);
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} ${scrolled ? 'shadow-lg border-b border-gray-200 dark:border-gray-800' : ''}`}>
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <a 
            className="font-bold text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-600 transition-all duration-300 whitespace-nowrap flex items-center" 
            href="#"
          >
            <span className="mr-1">👋</span>
            {isMobile ? 'RMA' : 'RAJAOHERISOA Maminiaina Ando'}
          </a>
          
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              <div className={`w-6 flex flex-col gap-1.5 transition-all duration-300 ${isOpen ? 'transform rotate-180' : ''}`}>
                <span className={`h-0.5 w-full ${theme === 'dark' ? 'bg-white' : 'bg-gray-900'} transition-all duration-300 ${isOpen ? 'transform rotate-45 translate-y-2' : ''}`}></span>
                <span className={`h-0.5 w-full ${theme === 'dark' ? 'bg-white' : 'bg-gray-900'} transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                <span className={`h-0.5 w-full ${theme === 'dark' ? 'bg-white' : 'bg-gray-900'} transition-all duration-300 ${isOpen ? 'transform -rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
            
            <button
              onClick={toggleTheme}
              className="hidden md:flex items-center justify-center p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 hover:rotate-12 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 w-10 h-10"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <i className="fas fa-moon text-sm"></i> : <i className="fas fa-sun text-sm"></i>}
            </button>
          </div>
          
          <div className={`md:flex md:items-center md:gap-6 ${isOpen ? 'block absolute top-full left-0 w-full px-6 py-4 shadow-xl animate-fadeIn' : 'hidden'} md:relative md:top-auto md:left-auto md:w-auto md:p-0 md:shadow-none ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} md:bg-transparent rounded-lg md:rounded-none transition-all duration-300 ease-out`}>
            <ul className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
              {[
                { href: "#about", text: "About", highlight: "ME", icon: <User size={18} className="transition-all group-hover:scale-110" /> },
                { href: "#service", text: "Service", icon: <ServerIcon size={18} className="transition-all group-hover:scale-110" />},
                { href: "#project", text: "Project", icon: <FileAxis3D size={18} className="transition-all group-hover:scale-110" /> },
                { href: "#contact", text: "Contact", highlight: "ME", icon: <Contact size={18} className="transition-all group-hover:scale-110" /> }
              ].map((item, index) => (
                <li key={index}>
                  <a
                    className="flex items-center gap-2 group relative py-2 px-1 rounded-lg md:rounded-none md:px-0 transition-all duration-300"
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className={`text-base md:text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'} group-hover:text-blue-600 transition-colors duration-300 flex items-center gap-1.5`}>
                      <span className="transition-all duration-300 group-hover:translate-x-0.5">
                        {item.icon}
                      </span> 
                      {item.text} 
                      {item.highlight && <span className="text-blue-600">{item.highlight}</span>}
                    </span>
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-4/5 transition-all duration-500 rounded-full"></span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 mt-4 md:mt-0 pl-1 md:pl-0">
              <a
                href="https://www.canva.com/design/DAGgC_zjAfw/dAkifTQ84zgcUiR9dFaRXA/edit?utm_content=DAGgC_zjAfw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-2 bg-blue-600 text-white rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95 text-sm md:text-base hover:bg-blue-700"
              >
                <span className="font-medium">Download CV</span> 
                <i className="fas fa-download text-xs md:text-sm transition-transform duration-300 group-hover:translate-y-0.5"></i>
              </a>
              <button
                onClick={toggleTheme}
                className="md:hidden flex items-center justify-center p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 hover:rotate-12 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95 w-10 h-10"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <i className="fas fa-moon text-sm"></i> : <i className="fas fa-sun text-sm"></i>}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}