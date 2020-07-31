/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import knight from "./knight.svg";

const generateBoard = (size, visited = {}) => {
  let arr = [];
  //initial all false
  for (let i = 0; i < size; i++) {
    let temp = [];
    for (let j = 0; j < size; j++) {
      if (visited[`${i}_${j}`]) {
        temp.push("visited");
      } else {
        temp.push("visitable");
      }
    }
    arr.push(temp);
  }
  return arr;
};

const _get = (board, x, y) => {
  return board[x] && board[x][y];
};

const TravelingKnight = ({ x, y, size }) => {
  const [pos, setPos] = useState({ x: +x, y: +y });

  const [visitables, setVisitables] = useState([]);
  const [visited, setVisited] = useState({});
  const [board, setBoard] = useState(generateBoard(size, visited));
  const [count, setCount] = useState(0);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    let timer = null;

    if (auto && visitables.length > 0) {
      const randomIndex = Math.floor(Math.random() * visitables.length);
      timer = setTimeout(() => {
        move(visitables[randomIndex]);
      }, 200);
    }

    return () => clearTimeout(timer);
  });
  useEffect(() => {
    checkAndMarkMoves();
  }, [pos]);

  const move = (newPos) => {
    if (board[newPos.x][newPos.y] !== "canVisit") return;
    setPos({ x: newPos.x, y: newPos.y });
    setVisited((obj) => {
      return { ...obj, [`${pos.x}_${pos.y}`]: true };
    });
    setCount(count + 1);
  };

  const isVisited = (x, y) => {
    return visited[`${x}_${y}`];
  };

  const checkAndMarkMoves = () => {
    const newBoard = generateBoard(size, visited);
    //right check
    let visitables = [];
    if (_get(newBoard, pos.x + 2, pos.y + 1) && !isVisited(pos.x + 2, pos.y + 1)) {
      newBoard[pos.x + 2][pos.y + 1] = "canVisit";
      visitables.push({ x: pos.x + 2, y: pos.y + 1 });
    }
    if (_get(newBoard, pos.x + 2, pos.y - 1) && !isVisited(pos.x + 2, pos.y - 1)) {
      newBoard[pos.x + 2][pos.y - 1] = "canVisit";
      visitables.push({ x: pos.x + 2, y: pos.y - 1 });
    }
    //left
    if (_get(newBoard, pos.x - 2, pos.y + 1) && !isVisited(pos.x - 2, pos.y + 1)) {
      newBoard[pos.x - 2][pos.y + 1] = "canVisit";
      visitables.push({ x: pos.x - 2, y: pos.y + 1 });
    }
    if (_get(newBoard, pos.x - 2, pos.y - 1) && !isVisited(pos.x - 2, pos.y - 1)) {
      newBoard[pos.x - 2][pos.y - 1] = "canVisit";
      visitables.push({ x: pos.x - 2, y: pos.y - 1 });
    }
    //bottom
    if (_get(newBoard, pos.x - 1, pos.y + 2) && !isVisited(pos.x - 1, pos.y + 2)) {
      newBoard[pos.x - 1][pos.y + 2] = "canVisit";
      visitables.push({ x: pos.x - 1, y: pos.y + 2 });
    }
    if (_get(newBoard, pos.x + 1, pos.y + 2) && !isVisited(pos.x + 1, pos.y + 2)) {
      newBoard[pos.x + 1][pos.y + 2] = "canVisit";
      visitables.push({ x: pos.x + 1, y: pos.y + 2 });
    }
    //top
    if (_get(newBoard, pos.x - 1, pos.y - 2) && !isVisited(pos.x - 1, pos.y - 2)) {
      newBoard[pos.x - 1][pos.y - 2] = "canVisit";
      visitables.push({ x: pos.x - 1, y: pos.y - 2 });
    }
    if (_get(newBoard, pos.x + 1, pos.y - 2) && !isVisited(pos.x + 1, pos.y - 2)) {
      newBoard[pos.x + 1][pos.y - 2] = "canVisit";
      visitables.push({ x: pos.x + 1, y: pos.y - 2 });
    }
    setVisitables(visitables);
    setBoard(newBoard);
  };

  const isCurrent = (currPos) => {
    return currPos.x === pos.x && currPos.y === pos.y;
  };

  const getColor = (type) => {
    if (type === "visited") return "#e74c3c";
    if (type === "canVisit") return "#2ecc71";

    return "#2c3e50";
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    // background-color: #2196F3;
  };
  const cellStyle = {
    border: "1px solid black",
    width: "40px",
    height: "40px",
  };

  const buildBoard = () => {
    return (
      <div style={gridStyle}>
        {board.map((row, x) => (
          <div key={"x" + x}>
            {row.map((cell, y) => (
              <div onClick={() => move({ x, y })} key={"y" + y} style={{ ...cellStyle, backgroundColor: getColor(cell) }}>
                {isCurrent({ x, y }) && <img src={knight} alt="knight" />}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  return (
    <div>
      <p>Click on green tiles to move</p>
      {buildBoard()}
      {!visitables.length && <p>Oops no more moves :(</p>}
      <div>Moves: {count}</div>
      <button onClick={() => setAuto(!auto)}>Autopilot</button>
    </div>
  );
};

export default TravelingKnight;
