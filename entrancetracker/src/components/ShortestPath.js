import React, { useEffect, useState } from "react";
import "./ShortestPath.css";

function ShortestPath({ text, restartDelay = 2000 }) {
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

  // Return null or an empty div if text is invalid
  if (typeof text !== "string" || text.trim() === "") {
    return (
      <div key={renderKey} className="wavy-text" style={{color: '#FF6B6B', textShadow: '2px 20px 20px rgba(0, 0, 0, 0.5)' }}>
        {wrapTextWithAnimation("No paths available")}
      </div>
    );
  }

  return (
    <div key={renderKey} className="wavy-text" style={{color: '#6BCB77', textShadow: '2px 20px 20px rgba(0, 0, 0, 0.5)' }}>
      {wrapTextWithAnimation(text)}
    </div>
  );
}

export default ShortestPath;
