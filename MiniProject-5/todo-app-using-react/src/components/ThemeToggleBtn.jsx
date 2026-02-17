import { useState, useEffect } from 'react';

const ThemeToggleBtn = () => {
  // Initialize state based on localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (localStorage.getItem('theme') === 'dark') {
      return true;
    } else if (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    } else {
      return false;
    }
  });

  // Effect to apply the theme class to the HTML element
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    // 1. Main Background Container
    // We change the background color of the whole section to show off the effect
    <div 
      className={`flex items-center justify-center transition-colors duration-500`}
    >
      <div className="flex flex-col items-center gap-8">
        
        {/* 2. The Toggle Label/Wrapper */}
        <label 
          className="relative inline-flex items-center cursor-pointer group scale-75 md:scale-90 origin-right" // Adjusted scale to fit header better
          aria-label="Toggle Dark Mode"
        >
          <input 
            type="checkbox" 
            className="sr-only peer" 
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
          />

          {/* 3. The Track (The "Neumorphic" Background) */}
          <div 
            className={`
              w-24 h-12 rounded-full overflow-hidden relative shadow-inner transition-colors duration-500
              ${isDarkMode 
                // Dark Mode Track: Dark Blue with inner shadows
                ? 'bg-slate-800 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.5),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] border border-slate-700' 
                // Light Mode Track: Sky Blue with inner shadows
                : 'bg-cyan-300 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.5)] border border-gray-100'
              }
            `}
          >
            
            {/* Background Decor: Clouds (Visible in Light Mode) */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}>
               <div className="absolute top-3 right-5 w-5 h-2 bg-white rounded-full opacity-80" />
               <div className="absolute top-6 right-3 w-3 h-1.5 bg-white rounded-full opacity-60" />
               <div className="absolute top-2 right-8 w-4 h-2 bg-white rounded-full opacity-50" />
            </div>

            {/* Background Decor: Stars (Visible in Dark Mode) */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}>
              <div className="absolute top-3 right-6 w-0.5 h-0.5 bg-white rounded-full animate-pulse" />
              <div className="absolute top-6 right-8 w-0.5 h-0.5 bg-white rounded-full opacity-70" />
              <div className="absolute top-4 right-3 w-1 h-1 bg-white rounded-full opacity-80" />
              <div className="absolute bottom-3 right-5 w-0.5 h-0.5 bg-white rounded-full opacity-50" />
            </div>
            
          </div>

          {/* 4. The Moving Ball (Sun/Moon Container) */}
          <div 
            className={`
              absolute left-1 top-1 w-10 h-10 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]
              ${isDarkMode ? 'translate-x-12' : 'translate-x-0'}
            `}
          >
            {/* SUN (Visible in Light Mode) */}
            <div 
              className={`
                absolute inset-0 rounded-full bg-yellow-400 shadow-[0_0_10px_2px_rgba(255,200,0,0.4)]
                flex items-center justify-center transition-all duration-500
                ${isDarkMode ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}
              `}
            >
            </div>

            {/* MOON (Visible in Dark Mode) */}
            <div 
              className={`
                absolute inset-0 rounded-full bg-slate-200 shadow-[0_0_8px_2px_rgba(255,255,255,0.2)] overflow-hidden
                transition-all duration-500 border border-slate-300
                ${isDarkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}
              `}
            >
              {/* Craters */}
              <div className="absolute top-2 left-3 w-2 h-2 bg-slate-300 rounded-full shadow-inner" />
              <div className="absolute bottom-3 left-2 w-1.5 h-1.5 bg-slate-300 rounded-full shadow-inner" />
              <div className="absolute top-4 right-2 w-2.5 h-2.5 bg-slate-300 rounded-full shadow-inner" />
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default ThemeToggleBtn;