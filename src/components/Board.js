import Tile from "./Tile";

const Board = ({ tiles, disabled, handleChoice }) => {
  return (
    <div className={`board ${disabled ? "disabled" : ""}`}>
      {tiles.map((tile) => (
        <Tile key={tile.id} tile={tile} handleChoice={handleChoice} />
      ))}
    </div>
  );
};

export default Board;
