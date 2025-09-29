import React, { useEffect, useState } from 'react';



export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    // Try to read from localStorage or default to false
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDark.toString());
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(prev => !prev);

  return { isDark, toggleDarkMode };
}

export const DarkModeToggle: React.FC = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="mb-6 px-4 py-2 rounded border font-semibold transition-colors
        bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full"
      aria-label="Toggle dark mode"
    >
      {isDark ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
};