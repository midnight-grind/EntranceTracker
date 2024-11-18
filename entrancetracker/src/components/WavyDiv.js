import React, { useEffect, useState } from "react";
import "./WavyDiv.css";

function WavyDiv({ text, restartDelay = 2000, color = "#FF6B6B" }) {
  const [renderKey, setRenderKey] = useState(0);

  useEffect(() => {
    if (typeof text !== "string" || text.trim() === "") return;

    // Reset the render key to trigger the animation reset
    setRenderKey((prevKey) => prevKey + 1);
  }, [text]);

  const wrapTextWithAnimation = (inputText) => {
    return inputText.split("").map((char, index) => {
      if (char === " ") {
        return <span key={index} style={{ margin: "0 5px" }}>&nbsp;</span>; // Handle spaces
      }
      return (
        <span
          key={index}
          className="wavy-letter"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div key={renderKey} className="wavy-text" style={{color: color, textShadow: '2px 20px 20px rgba(0, 0, 0, 0.5)' }}>
      {wrapTextWithAnimation(text)}
    </div>
  );
}

export default WavyDiv;
