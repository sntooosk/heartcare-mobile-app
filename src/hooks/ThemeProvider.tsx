import React, { useState, useEffect, ReactNode } from "react";
import { Theme, themes } from "../utils/styles";
import { ThemeContext } from "../context/ThemeContext";
import { asyncGetTheme, asyncSetTheme } from "../utils/storage/ThemeStorage";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(themes.light);

  useEffect(() => {
    loadThemeFromStorage();
  }, []);

  const loadThemeFromStorage = async () => {
    try {
      const storedTheme = await asyncGetTheme();
      if (storedTheme !== null) {
        setTheme(storedTheme === "dark" ? themes.dark : themes.light);
      } else {
        setTheme(themes.light);
      }
    } catch (error) {
      console.error("Error loading theme from storage:", error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === themes.light ? themes.dark : themes.light;
    setTheme(newTheme);
    asyncSetTheme(newTheme === themes.dark ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
