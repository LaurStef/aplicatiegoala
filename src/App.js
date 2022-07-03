import React, { useState, useEffect } from "react";
import "./style.css";

function App() {
  const [dices, setDices] = useState([Math.round(Math.random() * 6), Math.round(Math.random() * 6),Math.round(Math.random() * 6),Math.round(Math.random() * 6),Math.round(Math.random() * 6),Math.round(Math.random() * 6),Math.round(Math.random() * 6),Math.round(Math.random() * 6),Math.round(Math.random() * 6),Math.round(Math.random() * 6),]);
  const [trues, setTrues] = useState([true,true,true,true,true,true,true,true, true,true,]);
  const [winner, setWinner] = useState([false]);
 
  function checkwinner() {
    let x = dices[0];
    for (let i = 0; i <= 9; i++)
      if (dices[i] !== x && trues[i] !== false) return false;
    return true;
  }

  useEffect(() => {
    if (checkwinner()) 
    setWinner(!winner);
  }, [trues]);

  function freezeDice(index) {
    const newTrues = [...trues];
    newTrues[index] = !newTrues[index];
    setTrues(newTrues);
  }
  function handleRandom() {
    let newDices = [];
    for (let i = 0; i <= 9; i++) {
      if (trues[i]) newDices.push(Math.round(Math.random() * 6));
      else newDices.push(dices[i]);
    }
    setDices(newDices);
  }
  function resetRandom() {
    let newDices = [];
    let newTrues = [true, true, true, true, true, true, true, true, true, true];
    for (let i = 0; i <= 9; i++) newDices.push(Math.round(Math.random() * 6));
    setDices(newDices);
    setTrues(newTrues);
    setWinner(!winner);
  }
  return (
    <div className="container">
      {winner ? (
        <div>
          <h1>Tenzies</h1>
          <h3>
            Roll untill all dice are the same. Click each die to freeze it at
            its current value between rolls.
          </h3>
          <div className="squares">
            {dices.map((dice, index) => (
              <div
                key={index}
                className={
                  trues[index] ? `dice${index}` : `dice${index}clicked`
                }
                onClick={() => freezeDice(index)}
              >
                {dice}
              </div>
            ))}
          </div>
          <i className="fa-solid fa-dice" onClick={() => handleRandom()}></i>
        </div>
      ) : (
        <div>
          <div className="winner">Winner ! Winner ! Chicken Dinner !</div>
          <i
            class="fa-solid fa-arrow-rotate-right"
            onClick={() => resetRandom()}
          >
            {" "}
            Try again
          </i>
        </div>
      )}
    </div>
  );
}

export default App;
