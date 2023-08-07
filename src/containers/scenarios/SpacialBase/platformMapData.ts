import Chunk from "../../../classes/Chunk/Chunk";
import Floor from "../../../classes/Floor/Floor";
// hacer q con el index se pongan blanco y negro if Number.isInteger(x/2) ? b : n
const s = 8;
const target = new Floor(null, s);
target.hasTarget = true;
const platformMapData = [
  [
    new Floor(null, s),
    new Floor(null, s),
    new Floor(null, s),
    new Floor(null, s),
    new Floor(null, s),
  ],
  [
    new Floor(null, s),
    new Floor(null, s),
    new Floor(null, s),
    new Floor(null, s),
    new Floor(null, s),
  ],
  [
    new Floor(null, s),
    new Floor(null, s),
    new Floor(null, s),
    new Floor(null, s),
    new Floor(null, s),
  ],
  [
    new Floor(null, s),
    new Floor(null, s),
    new Floor(null, s),
    new Floor(null, s),
    new Floor(null, s),
  ],
  [
    new Floor(null, s),
    new Floor(null, s),
    new Floor(null, s),
    new Floor(null, s),
    new Floor(null, s),
  ],
];

// Helper function to get a random integer between min and max (inclusive)
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get random row and column indices within the matrix dimensions
const numRows = platformMapData.length;
const numCols = platformMapData[0].length;

const randomRow = getRandomInt(0, numRows - 1);
const randomCol = getRandomInt(0, numCols - 1);

// Access the randomly selected floor and update its 'visible' attribute to true
const randomFloor = platformMapData[randomRow][randomCol];
randomFloor.hasTarget = true;

const compute = (platformMapData: Chunk[][]) => {
  platformMapData.forEach((row: Chunk[], i: number) => {
    const x = i === 0 ? 0 : i * s; //i + s / 2 - 1;
    row.forEach((chunk, j) => {
      const z = j === 0 ? 0 : j * s; //j + s / 2 - 1;
      chunk.chunkPosition = [x, 0, z];
    });
  });

  return platformMapData;
};

const explore = (row: number, col: number, visited: Set<string>) => {
  if (row > platformMapData.length - 1 || row < 0) return;
  if (col > platformMapData[0].length - 1 || col < 0) return;
  if (visited.has(`${row},${col}`)) return;

  console.log(row, col);
  visited.add(`${row},${col}`);

  if (platformMapData[row][col]?.hasTarget) {
    console.log("found target");
    for (const position of Array.from(visited)) {
      const [r, c] = position.split(",");
      console.log(r, c);
      if (platformMapData[parseInt(r)][parseInt(c)])
        platformMapData[parseInt(r)][parseInt(c)].showConnection = true;
    }

    return platformMapData;
  }
  explore(row, col + 1, visited);
  explore(row + 1, col, visited);
  explore(row, col - 1, visited);
  explore(row - 1, col, visited);
};

const updatePath = () => {
  const row = 0;
  const col = 0;
  const visited: Set<string> = new Set();
  explore(row, col, visited);
};

export const Path = (() => {
  updatePath();
  return compute(platformMapData);
})();

export default compute(platformMapData);
