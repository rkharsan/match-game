const Stats = ({ score, turnCount, resetGame }) => {
  const buttonClass = score === 8 ? "highlighted" : "";

  return (
    <div className="stats">
      <div className="stat">
        <div className="label">Turns</div>
        <div className="value">{turnCount}</div>
      </div>

      <button onClick={resetGame} className={buttonClass}>
        New Game
      </button>

      <div className="stat">
        <div className="label">Score</div>
        <div className="value">{score}</div>
      </div>
    </div>
  );
};

export default Stats;
