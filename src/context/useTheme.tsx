import { createContext, useCallback, useEffect, useState } from "react";

export const ThemeContext = createContext(null);
export const ThemeProvider = ({ children }) => {
 const [mode, setMode] = useState<string | null>(null);
 const [render, setRender] = useState(false);
 const toggle = (override?: string) => {
  if (override) {
   setMode(override);
   return;
  }

  setMode((p) => (p == "dark" ? "light" : "dark"));
 };

 const getPrefersColorScheme = useCallback(() => {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
 }, []);

 // Gets and set theme as preferred color scheme.
 useEffect(() => {
  if (window) {
   const prefersDark = getPrefersColorScheme();
   const prefer = prefersDark ? "dark" : "light";
   toggle(prefer);
   const body = document.getElementsByTagName("body").item(0);
   if (!body.classList.contains(prefer)) {
    body.classList.add(prefer);
   } else {
    body.classList.remove(prefer);
   }
  }

  setRender(true);
 }, [getPrefersColorScheme]);

 // Add/removes theme class from body.
 useEffect(() => {
  if (document && mode !== null) {
   const body = document.getElementsByTagName("body").item(0);
   const previousMode = mode == "dark" ? "light" : "dark";
   if (body.classList.contains(previousMode)) {
    body.classList.remove(previousMode);
   }

   if (!body.classList.contains(mode)) {
    body.classList.add(mode);
   }
  }
 }, [mode]);

 return (
  <ThemeContext.Provider value={{ mode, toggle }}>{render && children}</ThemeContext.Provider>
 );
};
