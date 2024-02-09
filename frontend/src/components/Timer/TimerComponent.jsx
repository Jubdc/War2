import { CountdownCircleTimer } from "react-countdown-circle-timer";

// TimerComponent.jsx

function TimerComponent({ isPlaying, duration, onComplete }) {
  return (
    <CountdownCircleTimer
      isPlaying={false}
      duration={duration}
      colors={["#DF2A52", "#DF2A52", "#B30508", "#B30508"]}
      colorsTime={[7, 5, 2, 0]}
      strokeWidth={7}
      trailColor="#151932"
      isSmoothColorTransition={true}
      size={180}
      onComplete={onComplete}
    >
      {({ remainingTime }) => {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        return (
          <div className="text-3xl text-white font-light font-avant-garde">
            {minutes}:{seconds.toString().padStart(2, "0")}
          </div>
        );
      }}
    </CountdownCircleTimer>
  );
}

export default TimerComponent;
