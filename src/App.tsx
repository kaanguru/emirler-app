import { useState, useEffect } from 'react';
import emirlerData from './kurandaki-emirler.json';
import './App.css';

interface Emir {
  "Emir ve Yasak": string;
  "Süre": string;
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
        <h1>Kuran'daki Emirler ve Yasaklar</h1>
        {currentEmir && (
          <div className="emir-card">
            <p className="emir-text">{currentEmir["Emir ve Yasak"]}</p>
            <p className="sure-text">{currentEmir["Süre"]}</p>
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
