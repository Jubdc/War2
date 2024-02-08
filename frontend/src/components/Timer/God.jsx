import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

function TimerComponent() {
  const duration = 10; // Durée de 10 secondes pour le timer
  const [isPlaying, setIsPlaying] = useState(true); // Commence automatiquement

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPlaying(false); // Arrête le timer après 10 secondes
    }, duration * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="App flex justify-center items-center h-screen">
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={duration}
        colors={[["#FE6F6B", 1.0]]}
        size={220}
        strokeWidth={6}
        trailColor="#151932"
        onComplete={() => {
          // Faire quelque chose à la fin du timer
        }}
      >
        {({ remainingTime }) => {
          const minutes = Math.floor(remainingTime / 60);
          const seconds = remainingTime % 60;

          return (
            <span className="text-4xl text-red-500">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          );
        }}
      </CountdownCircleTimer>
    </div>
  );
}

export default TimerComponent;
