import { useState, useEffect } from "react";
import emirlerData from "./kurandaki-emirler.json";
import "./App.css";

interface Emir {
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
    <div className="App">
      <div className="container">
        <img src="/pwa-192x192.png" alt="Kuran Logo" className="kuran-logo" />
        <h1>Kuran'daki Emirler ve Yasaklar</h1>
        {currentEmir && (
          <div className="emir-card" data-testid="emir-card">
            <p className="emir-text" data-testid="emir-text">{currentEmir["emir"]}</p>
            <p className="sure-text" data-testid="sure-text">{currentEmir["sure"]}</p>
          </div>
        )}
        <button onClick={getRandomEmir} className="random-button">
          Yeni Göster
        </button>
      </div>
    </div>
  );
}

export default App;
