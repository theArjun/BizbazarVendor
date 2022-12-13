import React, { createContext, useState } from "react"

const DarkModeContext = createContext();

function DarkModeProvider(props) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = (dark) => {
    setDarkMode(!darkMode);
  };
  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={darkMode ? "container dark" : "container light"}>
        <div className="app">{props.children}</div>
      </div>
    </DarkModeContext.Provider>
  );
}

export { DarkModeContext, DarkModeProvider };
