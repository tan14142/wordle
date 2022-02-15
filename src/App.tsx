import './App.css';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { fivePositives, fiveNegatives, sixPositives, sixNegatives } from './App/Words';
import { BoardType, KeysType } from './App/Types';
import Board from './App/Board';
import Header from './App/Header';
import Keyboard from './App/Keyboard';
import Info from './App/Info';
import Stats from './App/Stats';
import stats from './App/getStats';
import Settings from './App/Settings';
import NewGame from './App/NewGame';
import getItem from './App/getItem';

export default function App() {
  const [numTiles, setNumTiles] = useState(getItem("numTiles", 5));

  let positives = numTiles === 5
    ? fivePositives
    : sixPositives;
  let negatives = numTiles === 5
    ? fiveNegatives
    : sixNegatives;

  let [pick, setPick] = useState(getItem("pick", positives[Math.floor(Math.random() * (positives.length - 1))]));
  localStorage.setItem("pick", JSON.stringify(pick));

  let [board, setBoard] = useState<BoardType>(getItem("board", Array(6).fill(0).map(
    () => Array(numTiles).fill(["", ""]).map(
      tile => tile.slice()
    )
  )));
  let [keys, setKeys] = useState<KeysType>(getItem("keys", {}));
  let [pos, setPos] = useState(getItem("pos", {
    row: 0,
    col: 0
  }));

  const [showNewGame, setShowNewGame] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [message, setMessage] = useState("");

  const messageTimeoutRef = useRef(setTimeout(() => {}, 0));
  const fadeTimeoutRef = useRef(setTimeout(() => {}, 0));

  const fadeCallback = useCallback(() => fade(), []);
  const defeat = pos.row === 6;
  const victory = pos.row > 0
    ? board[pos.row - 1].reduce((pre, cur) => pre + cur[0], "") === pick
    : false;
  
  /*eslint-disable*/
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  });

  function handleKeyDown(e: KeyboardEvent) {
    if (e.target instanceof HTMLElement) {
      e.target.blur();
    }

    if ((e.shiftKey && e.key === "z") || e.key === "Backspace") {
      handleClickKeyboard("Backspace");
    }
    else if (e.key === "Enter" || /^[a-z]$/.test(e.key)) {
      handleClickKeyboard(e.key);
    }
  }

  function handleClickKeyboard(key: string) {
    if (victory || defeat) {
      return;
    }
    if (key === "Backspace") {
      handleBackspace();
    }
    else if (key === "Enter") {
      handleEnter();
    }
    else if (pos.col < numTiles) {
      board[pos.row][pos.col][0] = key;
      board[pos.row][pos.col][1] = "pulse";

      pos.col += 1;
      setBoard(board);
      setPos(pos);

      setTimeout(((row, col) => () => {
        if (board[row][col][1] === "pulse") {
          board[row][col][1] = "";
        }
      })(pos.row, pos.col - 1), 250);
    }
    forceUpdate();
  }

  function handleBackspace() {
    if (pos.col) {
      pos.col -= 1;
      board[pos.row][pos.col][0] = "";
      setBoard(board);
      setPos(pos);
    }
  }

  function handleEnter() {
    if (pos.col === numTiles) {
      const row = board[pos.row].reduce((pre, cur) => pre + cur[0], "");

      if (JSON.parse(localStorage.getItem("hard")!)) {
        for (let k in keys) {
          if (["correct", "present"].includes(keys[k])) {
            if (!row.includes(k)) {
              shakeRow();
              showMessage("Not valid in hard mode");
              return;
            }
          }
        }
      }
      if (positives.includes(row) || negatives.includes(row)) {
        for (let i = 0; i < numTiles; i++) {
          if (row[i] === pick[i]) {
            board[pos.row][i][1] = "correct";
            keys[row[i]] = "correct";
          }
          else if (pick.includes(row[i])) {
            board[pos.row][i][1] = "present";

            if (!(row[i] in keys) || keys[row[i]] === "absent") {
              keys[row[i]] = "present";
            }
          }
          else {
            board[pos.row][i][1] = "absent";

            if (!(row[i] in keys)) {
              keys[row[i]] = "absent";
            }
          }
        }
        pos.row += 1;
        pos.col = 0;
        setBoard(board);
        setKeys(keys);
        setPos(pos);
        localStorage.setItem("board", JSON.stringify(board));
        localStorage.setItem("keys", JSON.stringify(keys));
        localStorage.setItem("pos", JSON.stringify(pos));

        if (row === pick) {
          showMessage(["Genius","Magnificent","Impressive","Splendid","Great","Phew"][pos.row - 1]);
          stats.played += 1;
          stats.wins += 1;
          stats.curStreak += 1;

          if (stats.curStreak > stats.maxStreak) {
            stats.maxStreak += 1;
          }

          stats.dist[pos.row - 1] += 1;
          localStorage.setItem("stats", JSON.stringify(stats));
          setTimeout(() => setShowStats(true), 2500);
        }
        else if (pos.row === 6) {
          showMessage(pick);
          stats.played += 1;
          stats.curStreak = 0;
          localStorage.setItem("stats", JSON.stringify(stats));
          setTimeout(() => setShowStats(true), 2500);
        }
      }
      else {
        shakeRow();
        showMessage("Not in word list");
      }
    }
    else {
      shakeRow();
      showMessage("Not enough letters");
    }
  }

  function shakeRow() {
    for (let i = 0; i < numTiles; i++) {
      board[pos.row][i][1] = "shakeX";
    }
    setBoard(board);

    setTimeout(() => {
      for (let i = 0; i < numTiles; i++) {
        if (board[pos.row][i][1] === "shakeX") {
          board[pos.row][i][1] = "";
        }
      }
      setBoard(board);
    }, 500);
  }

  function showMessage(s: string) {
    clearTimeout(messageTimeoutRef.current);
    setMessage("");
    setTimeout(() => setMessage(s), 0);
    messageTimeoutRef.current = setTimeout(() => setMessage(""), 3000);
  }

  function resetGame(numTiles: number) {
    fade();

    if (!victory && !defeat && pos.row > 0) {
      stats.played += 1;
      stats.curStreak = 0;
    }

    positives = numTiles === 5 ? fivePositives : sixPositives;
    pick = positives[Math.floor(Math.random() * (positives.length - 1))];
    board = Array(6).fill(0).map(
      () => Array(numTiles).fill(["", ""]).map(
        tile => tile.slice()
      )
    )
    keys = {};
    pos = {
      row: 0,
      col: 0
    };

    setPick(pick);
    setBoard(board);
    setKeys({});
    setPos(pos);

    localStorage.setItem("pick", JSON.stringify(pick));
    localStorage.setItem("board", JSON.stringify(board));
    localStorage.setItem("keys", JSON.stringify(keys));
    localStorage.setItem("pos", JSON.stringify(pos));
    localStorage.setItem("stats", JSON.stringify(stats));

    setShowNewGame(false);
  }

  function fade() {
    clearTimeout(fadeTimeoutRef.current);

    const el = document.getElementById("fade") as HTMLElement;
    el.removeAttribute("style");
    el.style.display = "block";
    el.style.opacity = "1";
    el.style.transition = "none";
  
    setTimeout(() => {
      el.style.opacity = "0";
      el.style.transition = "opacity 2.5s";
    }, 0);

    fadeTimeoutRef.current = setTimeout(() => {
      el.removeAttribute("style");
    }, 2500);
  }

  return (
    <>
      <Header
       handleClickInfo={() => setShowInfo(true)}
       handleClickNew={() => setShowNewGame(true)}
       handleClickStats={() => setShowStats(true)}
       handleClickSettings={() => setShowSettings(true)}
       message={message} />
      <Board
       board={board}
       pos={pos}
       isVictory={pos.row > 0 && victory} />
      <Keyboard
       handleClickKeyboard={handleClickKeyboard}
       keys={keys} />
      <NewGame
       handleClickClose={() => setShowNewGame(false)}
       handleClickConfirm={() => resetGame(numTiles)}
       onHide={() => setShowNewGame(false)}
       show={showNewGame} />
      <Info
       onHide={() => setShowInfo(false)}
       show={showInfo} />
      <Settings
       fade={fadeCallback}
       setNumTiles={n => {
         setNumTiles(n);
         resetGame(n);
       }}
       showMessage={showMessage}
       onHide={() => setShowSettings(false)}
       show={showSettings} />
      <Stats
       onHide={() => setShowStats(false)}
       show={showStats} />
      <div id="fade" />
    </>
  );
}