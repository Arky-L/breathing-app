import { useState, useEffect, useMemo } from "react";
import BreathingCircle from "./components/BreathingCircle";

function App() {
  const stars = useMemo(() => {
    return Array.from({ length: 100 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 1,
      twinkle: Math.random() < 0.25,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 4,
    }));
  }, []);

  const PHASE_DURATION = 4000;
  const cycle = ["Inhale", "Hold", "Exhale", "Hold"];

  const [isRunning, setIsRunning] = useState(false);
  const [sessionStart, setSessionStart] = useState(null);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  const phase = isRunning ? cycle[phaseIndex] : "Ready";

  useEffect(() => {
    if (!isRunning || !sessionStart) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - sessionStart;

      const newPhaseIndex = Math.floor(elapsed / PHASE_DURATION);

      setPhaseIndex(newPhaseIndex % cycle.length);

      const phaseElapsed = elapsed % PHASE_DURATION;

      setSecondsRemaining(
        Math.ceil((PHASE_DURATION - phaseElapsed) / 1000)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, sessionStart]);

  return (
    <>
      <div className="background-stars">
        {stars.map((s, i) => (
          <div
            key={i}
            className={`star ${s.twinkle ? "twinkle" : ""}`}
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="app-content">
        <div className="circle-container">
          <BreathingCircle
            phase={phase}
            secondsRemaining={secondsRemaining}
          />
        </div>

        <button
          onClick={() => {
            setIsRunning(true);
            setSessionStart(Date.now());
            setPhaseIndex(0);
            setSecondsRemaining(4);
          }}
        >
          Start
        </button>
      </div>
    </>
  );
}

export default App;