import React from "react";

function UnexploredCheckmarks({ numUnavailable, numAvailable }) {
  let ret = [];

  if (numUnavailable > 0) {
    ret.push(
      <div
        style={{
          display: "inline-block",
          border: "dotted",
          borderWidth: "1px", // Thinner border
          fontSize: "20px", // Adjust font size
          padding: "2px 5px", // Adjust padding
          color: "#FF6B6B", // Softer red
          borderColor: "#FF6B6B", // Softer red border
          boxShadow: "2px 2px 5px rgba(255, 107, 107, 0.5)", // Red drop shadow
        }}
      >
        {numUnavailable} &#10005;
      </div>
    );
  }

  if (numAvailable > 0) {
    ret.push(
      <div
        style={{
          display: "inline-block",
          border: "dotted",
          borderWidth: "1px", // Thinner border
          fontSize: "20px", // Adjust font size
          padding: "2px 5px", // Adjust padding
          marginLeft: "10px", // Adjust margin
          color: "#6BCB77", // Softer green
          borderColor: "#6BCB77", // Softer green border
          boxShadow: "2px 2px 5px rgba(107, 203, 119, 0.5)", // Green drop shadow
        }}
      >
        {numAvailable} &#10003;
      </div>
    );
  }

  return ret;
}

export default UnexploredCheckmarks;
