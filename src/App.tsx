import { useState, useEffect } from "react";
import EmirCard from "./components/EmirCard";
import Footer from "./components/Footer";
import emirlerData from "./kurandaki-emirler.json";
import "./styles/App.css";

export interface Emir {
  emir: string;
  sure: string;
}

function App() {
  const [currentEmir, setCurrentEmir] = useState<Emir | null>(null);

  const getRandomEmir = () => {
    const randomIndex = Math.floor(Math.random() * emirlerData.length);
    setCurrentEmir(emirlerData[randomIndex]);
  };
  useEffect(() => {
    getRandomEmir();
  }, []);

  return (
    <>
      <div className="App">
        <div className="container">
          <img src="/pwa-192x192.png" alt="Kuran'dan Emirler Logo" />
          <p>Kuran'daki Emir ve Yasaklar</p>
          {currentEmir && <EmirCard emir={currentEmir} />}
          <button onClick={() => getRandomEmir()} className="random-button">
            <i className="fa-solid fa-shuffle fa-xl "></i>
          </button>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
