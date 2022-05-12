// Helpers
const getId = () => Math.floor(Math.random() * 100000000);

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

// Select 8 tiles from the 30 tiles available and return them as a list
const selectTiles = () => {
  // Array containing 0...29
  const allTiles = Array.from(Array(30).keys());
  shuffleArray(allTiles);

  // Return first 8
  return allTiles.slice(0, 8);
};

// Returns a shuffled array of tiles
const getTiles = () => {
  // These are the tiles picked this time
  const selected = selectTiles();
  const tiles = [];

  for (let i = 0; i < 8; i++) {
    // Each tile is added twice
    for (let j = 0; j < 2; j++) {
      tiles.push({
        id: getId(),
        val: selected[i],
        src: `img/${selected[i]}.png`,
        matched: false,
        selected: false,
      });
    }
  }

  // Shuffled before returning
  shuffleArray(tiles);
  return tiles;
};

export { getTiles };
