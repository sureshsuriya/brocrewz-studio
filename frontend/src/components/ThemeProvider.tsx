import React, { useEffect } from 'react';
import axios from 'axios';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await axios.get('/api/public/settings/theme');
        if (res.data) {
          const { primaryColor, secondaryColor, accentColor, backgroundColor } = res.data;
          const root = document.documentElement;
          if (primaryColor) root.style.setProperty('--color-primary-gold', primaryColor);
          if (secondaryColor) root.style.setProperty('--color-secondary-gold', secondaryColor);
          if (accentColor) root.style.setProperty('--color-accent-blue', accentColor);
          if (backgroundColor) root.style.setProperty('--color-background', backgroundColor);
        }
      } catch {
        // Fallback to default theme
      }
    };
    fetchTheme();
  }, []);

  return <>{children}</>;
};
