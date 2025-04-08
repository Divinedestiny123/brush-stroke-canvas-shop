
import React, { createContext, useContext, useEffect, useState } from "react";

// Define types for TypeScript compatibility but write in a more JSX-like style
const ThemeTypes = {
  LIGHT: "light",
  DARK: "dark", 
  INK: "ink",
  PARCHMENT: "parchment",
  CHERRY: "cherry"
};

const ThemeProviderContext = createContext({
  theme: ThemeTypes.LIGHT,
  setTheme: (theme) => {},
});

export function ThemeProvider({
  children,
  defaultTheme = ThemeTypes.LIGHT,
  storageKey = "calligraphy-theme",
  ...props
}) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(storageKey) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove(
      ThemeTypes.LIGHT, 
      ThemeTypes.DARK, 
      ThemeTypes.INK, 
      ThemeTypes.PARCHMENT, 
      ThemeTypes.CHERRY
    );
    
    // Add the current theme class
    root.classList.add(theme);
    
    // Store the theme preference
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  return (
    <ThemeProviderContext.Provider
      {...props}
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
