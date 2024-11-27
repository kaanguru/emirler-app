/* eslint-disable functional/no-return-void */
import { useState, useEffect, useCallback } from "react";
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
  const [usedIndexes, setUsedIndexes] = useState<number[]>([]);
  const getRandomEmir = useCallback(() => {
    // eslint-disable-next-line functional/no-let
    let randomIndex: number;

    if (usedIndexes.length === emirlerData.length) {
      // Reset used indexes if all have been used
      setUsedIndexes([]);
      localStorage.removeItem("usedIndexes");
      randomIndex = Math.floor(Math.random() * emirlerData.length);
    } else {
      const availableIndexes = emirlerData.map((_, index) => index).filter((index) => !usedIndexes.includes(index));

      if (availableIndexes.length > 0) {
        randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
      } else {
        // Fallback, should not happen due to the check above
        randomIndex = Math.floor(Math.random() * emirlerData.length);
      }
    }

    setUsedIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes, randomIndex];
      localStorage.setItem("usedIndexes", JSON.stringify(newIndexes));
      return newIndexes;
    });

    setCurrentEmir(emirlerData[randomIndex]);
  }, [usedIndexes, setUsedIndexes, setCurrentEmir]);

  useEffect(() => {
    const storedUsedIndexes = localStorage.getItem("usedIndexes");
    if (storedUsedIndexes) {
      setUsedIndexes(JSON.parse(storedUsedIndexes));
    }
    getRandomEmir();
  }, [getRandomEmir]);

  return (
    <div className="App">
      <div className="container">
        <img src="/pwa-192x192.png" alt="Kuran'dan Emirler Logo" />
        <div onClick={() => getRandomEmir()}>
          {currentEmir && <EmirCard emir={currentEmir} />}
          <button className="random-button">
            <i className="fa-solid fa-shuffle fa-xl"></i>
          </button>
        </div>
        <p>Kuran'daki Emir ve Yasaklar</p>
        <Footer />
      </div>
    </div>
  );
}

export default App;
