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
  const [usedIndexes, setUsedIndexes] = useState<number[]>([]);

  useEffect(() => {
    const storedUsedIndexes = localStorage.getItem("usedIndexes");
    if (storedUsedIndexes) {
      setUsedIndexes(JSON.parse(storedUsedIndexes));
    }
    getRandomEmir();
  }, []);

  const getRandomEmir = () => {
    let randomIndex: number;

    if (usedIndexes.length === emirlerData.length) {
      // Reset used indexes if all have been used
      setUsedIndexes([]);
      localStorage.removeItem("usedIndexes");
      randomIndex = Math.floor(Math.random() * emirlerData.length);
    } else {
      do {
        randomIndex = Math.floor(Math.random() * emirlerData.length);
      } while (usedIndexes.includes(randomIndex));
    }

    setUsedIndexes((prevIndexes) => {
      const newIndexes = [...prevIndexes, randomIndex];
      localStorage.setItem("usedIndexes", JSON.stringify(newIndexes));
      return newIndexes;
    });

    setCurrentEmir(emirlerData[randomIndex]);
  };

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
