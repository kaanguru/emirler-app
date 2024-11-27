import { useState, useEffect } from "react";
import "../styles/Footer.css";

const Toggle = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const storedTheme = localStorage.getItem("theme");

    let currentTheme = "light";
    if (storedTheme) {
      currentTheme = storedTheme;
    } else if (mediaQuery.matches) {
      currentTheme = "dark";
    }

    document.documentElement.setAttribute("data-theme", currentTheme);
    setEnabled(currentTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = enabled ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setEnabled(!enabled);
  };

  return (
    <div className="toggle-button" onClick={toggleTheme}>
      {enabled ? <i className="fa fa-moon fa-lg"></i> : <i className="fa fa-sun  fa-lg"></i>}
    </div>
  );
};

export default Toggle;
