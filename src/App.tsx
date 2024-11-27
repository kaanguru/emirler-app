/* eslint-disable functional/no-return-void */
import { useState, useEffect } from "react";
import EmirCard from "./components/EmirCard";
import Footer from "./components/Footer";
import emirlerData from "./kurandaki-emirler.json";
import "./styles/App.css";

export interface Emir {
  emir: string;
  sure: string;
}

const App = () => {
  const [usedIndexes, setUsedIndexes] = useState<number[]>([]);
  const [currentEmir, setCurrentEmir] = useState<Emir | null>(null);
  const getRandomEmir = () => {
    // eslint-disable-next-line functional/no-let
    let randomIndex: number = 1;

    if (usedIndexes.length === emirlerData.length) {
      setUsedIndexes([]);
      localStorage.removeItem("usedIndexes");
      randomIndex = Math.floor(Math.random() * emirlerData.length);
    } else {
      const availableIndexes = emirlerData.reduce<number[]>((acc, _, index) => {
        if (!usedIndexes.includes(index)) {
          return [...acc, index];
        }
        return acc;
      }, []);
      if (availableIndexes.length > 0) {
        randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
      }
    }

    setUsedIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes, randomIndex];
      localStorage.setItem("usedIndexes", JSON.stringify(newIndexes));
      return newIndexes;
    });

    setCurrentEmir(emirlerData[randomIndex]);
  };
  useEffect(() => {
    // Load usedIndexes from local storage on component mount
    const storedIndexes = localStorage.getItem("usedIndexes");
    if (storedIndexes) {
      setUsedIndexes(JSON.parse(storedIndexes));
    }
    getRandomEmir();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
};

export default App;
