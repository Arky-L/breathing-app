import { useRef } from "react";

export default function BreathingCircle({ phase, secondsRemaining }) {
  const lastScale = useRef(0.9);

  let scale = lastScale.current;

  if (phase === "Ready") {
    scale = 0.9;
  } else if (phase === "Inhale") {
    scale = 1.3;
  } else if (phase === "Exhale") {
    scale = 0.9;
  }
  // Hold = freeze (do nothing)

  lastScale.current = scale;

  return (
    <div className="circle-wrapper">
      <div
        className="circle-glow"
        style={{
          transform: `scale(${scale})`,
        }}
      />

      <div className="circle-text">
        <div>{phase} {secondsRemaining}</div>
      </div>
    </div>
  );
}