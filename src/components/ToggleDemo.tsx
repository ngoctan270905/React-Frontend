import { useState } from "react";

export default function ToggleDemo() {
    const [isOn, setIsOn] = useState(false);

    const toggle = () => {
        setIsOn(prev => !prev);
    };

    return (
    <div
      style={{
        border: "1px solid gray",
        padding: 20,
        marginBottom: 20,
        background: isOn ? "black" : "white",
        color: isOn ? "white" : "black"
      }}
    >
      <h2>Toggle Demo</h2>

      <p>Mode: {isOn ? "On" : "Off"}</p>

      <button onClick={toggle}>
        Toggle Mode
      </button>
    </div>
  );


    }