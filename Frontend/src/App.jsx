import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRouter from "./router/AppRouter";
import { NotificationProvider } from "./components/UI/NotificationProvider";


function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle Theme
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // Apply theme to body
  useEffect(() => {
    document.body.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  return (
    <NotificationProvider>
      <div className={darkMode ? "dark-theme" : "light-theme"}>
        <Navbar
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />

        <main id="main-content" className="app-main">
          <AppRouter />
        </main>

        <Footer />
      </div>
    </NotificationProvider>
  );
}

export default App;