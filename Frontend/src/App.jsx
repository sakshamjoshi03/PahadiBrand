import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

export default App;