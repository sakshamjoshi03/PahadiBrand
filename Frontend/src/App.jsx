import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRouter from "./router/AppRouter";
import { NotificationProvider } from "./components/UI/NotificationProvider";
import { CartProvider } from "./context/CartContext";


function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Toggle Theme
  const toggleTheme = () => {
    setDarkMode((prev) => {
      const nextMode = !prev;
      localStorage.setItem("theme", nextMode ? "dark" : "light");
      return nextMode;
    });
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
      <CartProvider>
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
      </CartProvider>
    </NotificationProvider>
  );
}

export default App;