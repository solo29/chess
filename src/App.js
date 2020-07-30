/* eslint-disable no-unused-vars */
import React from "react";
import { useStatex } from "./hooks";
import "./App.scss";
import knight from "./knight.svg";
import TravelingKnight from "./TravelingKnight";
function App() {
  const [started, setStarted] = useStatex(false);
  const [size, setSize, sizeBind] = useStatex(8);
  const [x, setX, xBind] = useStatex(3);
  const [y, setY, yBind] = useStatex(3);

  return (
    <div className="App">
      <header className="App-header">
        <img src={knight} className="App-logo" alt="logo" />
        {!started ? (
          <div>
            <p>Board Size</p>
            <input min={6} value={size} onChange={sizeBind} type="number" />
            <p>X coordinate</p>
            <input min={0} value={x} onChange={xBind} type="number" />
            <p>Y coordinate</p>
            <input min={0} value={y} onChange={yBind} type="number" />
            <br></br>
            <button onClick={() => setStarted(true)}>Start</button>
          </div>
        ) : (
          <TravelingKnight size={size} x={x} y={y} />
        )}
      </header>
    </div>
  );
}

export default App;
