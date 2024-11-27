import { useState, useEffect } from "react";
import { Emir } from "./types"; // Assuming you have a types file
import EmirCard from "./components/EmirCard";
import Footer from "./components/Footer";
import emirlerData from "./kurandaki-emirler.json";
import "./styles/App.css";

const App = () => {
  const [usedIndexes, setUsedIndexes] = useState<number[]>([]);
  const [currentEmir, setCurrentEmir] = useState<Emir | null>(null);

  const STORAGE_KEY = "usedIndexes";
  useEffect(() => {
    const storedIndexes = localStorage.getItem(STORAGE_KEY);
    if (storedIndexes) {
      setUsedIndexes(JSON.parse(storedIndexes));
    }
    getRandomEmir();
  }, []);

  const getRandomIndex = (usedIndexes: number[], totalIndexes: number): number => {
    if (usedIndexes.length === totalIndexes) {
      return Math.floor(Math.random() * totalIndexes);
    }

    const availableIndexes = Array.from({ length: totalIndexes }, (_, index) => index).filter((index) => !usedIndexes.includes(index));
    return availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
  };

  const updateUsedIndexes = (newIndex: number) => {
    const newIndexes = [...usedIndexes, newIndex];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newIndexes));
    setUsedIndexes(newIndexes);
  };

  const getRandomEmir = () => {
    const randomIndex = getRandomIndex(usedIndexes, emirlerData.length);
    updateUsedIndexes(randomIndex);
    setCurrentEmir(emirlerData[randomIndex]);
  };

  return (
    <div className="App">
      <div className="container">
        <img src="/pwa-192x192.png" alt="Kuran'dan Emirler Logo" />
        <div onClick={getRandomEmir}>
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
};

export default App;
