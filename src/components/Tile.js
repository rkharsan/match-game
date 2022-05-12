const Tile = ({ tile, handleChoice }) => {
  const classes = ["tile"];
  if (tile.selected) classes.push("selected");
  if (tile.matched) classes.push("matched");

  return (
    <div className={classes.join(" ")}>
      <img className="front" src={tile.src} alt="" />
      <img
        onClick={() => handleChoice(tile)}
        className="back"
        src="img/cover.png"
        alt=""
      />
    </div>
  );
};

export default Tile;
