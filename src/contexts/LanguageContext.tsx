import React, { createContext, useContext, useState, ReactNode } from "react";

interface LanguageContextType {
  language: "en" | "lv";
  setLanguage: (lang: "en" | "lv") => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<"en" | "lv">(
    (localStorage.getItem("language") as "en" | "lv") || "en"
  );

  const changeLanguage = (lang: "en" | "lv") => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}; 