import { useState, useEffect } from "react";

import { getTiles } from "./services/tiles";

import Stats from "./components/Stats";
import Board from "./components/Board";
import Header from "./components/Header";

const App = () => {
  // State
  // ======================================================================== //

  // List of tiles
  const [tiles, setTiles] = useState([]);

  // Statistics
  const [turnCount, setTurnCount] = useState([]);
  const [score, setScore] = useState(0);

  // Selection
  const [firstTile, setFirstTile] = useState(null);
  const [secondTile, setSecondTile] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Event handlers
  // ======================================================================== //

  // Initialize all state to reasonable values
  const resetGame = () => {
    setTiles(getTiles());
    setTurnCount(0);
    setScore(0);
    setFirstTile(null);
    setSecondTile(null);
    setDisabled(false);
  };

  // Pick a tile
  const handleChoice = (tile) => {
    // Edge cases: skip tiles that should not be selected
    if (tile.matched || tile.selected) return;
    if (firstTile && secondTile) return;
    if (firstTile && firstTile.id === tile.id) return;

    if (!firstTile) {
      setFirstTile(tile);
    } else {
      setSecondTile(tile);
    }

    // Update selection
    setTiles((tiles) =>
      tiles.map((t) => (t.id === tile.id ? { ...t, selected: true } : t))
    );
  };

  // End this turn
  const nextTurn = () => {
    setFirstTile(null);
    setSecondTile(null);
    setTurnCount((prev) => prev + 1);
    setDisabled(false);

    // Clear selection
    setTiles((tiles) => tiles.map((t) => ({ ...t, selected: false })));
  };

  // Called when user has finished a turn (selected 2 tiles)
  const checkTurn = () => {
    // Run only if 2 tiles are selected
    if (!(firstTile && secondTile)) return;

    // Disable selections until this process is over
    setDisabled(true);

    // Match!
    if (firstTile.val === secondTile.val) {
      // Set tiles as matched
      setTiles((tiles) =>
        tiles.map((tile) => {
          if (tile.val === firstTile.val) {
            return { ...tile, matched: true };
          } else {
            return tile;
          }
        })
      );

      setScore((prev) => prev + 1);
      nextTurn();
    } else {
      // Timeout here so user can see the cards
      setTimeout(() => nextTurn(), 1000);
    }
  };

  // Effects
  // ======================================================================== //

  // Reset game on start
  useEffect(resetGame, []);

  // Check turn whenever a tile is picked
  useEffect(checkTurn, [firstTile, secondTile]);

  return (
    <div className="app">
      <Header />
      <Stats score={score} turnCount={turnCount} resetGame={resetGame} />
      <Board tiles={tiles} handleChoice={handleChoice} disabled={disabled} />
    </div>
  );
};

export default App;
