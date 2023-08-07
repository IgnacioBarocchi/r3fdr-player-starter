import Chunk from "../../../classes/Chunk/Chunk";
import Floor from "../../../classes/Floor/Floor";
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

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const numRows = platformMapData.length;
const numCols = platformMapData[0].length;

const randomRow = getRandomInt(0, numRows - 1);
const randomCol = getRandomInt(0, numCols - 1);

const randomFloor = platformMapData[randomRow][randomCol];
randomFloor.hasTarget = true;

const compute = (platformMapData: Chunk[][]) => {
  platformMapData.forEach((row: Chunk[], i: number) => {
    const x = i === 0 ? 0 : i * s;
    row.forEach((chunk, j) => {
      const z = j === 0 ? 0 : j * s;
      chunk.chunkPosition = [x, 0, z];
    });
  });

  return platformMapData;
};

const explore = (startRow: number, startCol: number) => {
  const visitedPaths: Map<string, [number, number]> = new Map();
  const queue: [number, number][] = [];
  const visited: Set<string> = new Set();

  queue.push([startRow, startCol]);
  visited.add(`${startRow},${startCol}`);

  while (queue.length > 0) {
    const [row, col] = queue.shift()!;

    if (platformMapData[row][col]?.hasTarget) {
      console.log("found target");
      const shortestPath: [number, number][] = [];

      let currentRow = row;
      let currentCol = col;

      while (currentRow !== startRow || currentCol !== startCol) {
        shortestPath.unshift([currentRow, currentCol]);
        const previous = visitedPaths.get(`${currentRow},${currentCol}`);
        if (!previous) break;
        [currentRow, currentCol] = previous;
      }

      for (const [r, c] of shortestPath) {
        platformMapData[r][c].showConnection = true;
      }

      break;
    }

    const neighbors: [number, number][] = [
      [row, col + 1],
      [row + 1, col],
      [row, col - 1],
      [row - 1, col],
    ];

    for (const [r, c] of neighbors) {
      if (
        r >= 0 &&
        r < platformMapData.length &&
        c >= 0 &&
        c < platformMapData[0].length &&
        !visited.has(`${r},${c}`)
      ) {
        visited.add(`${r},${c}`);
        visitedPaths.set(`${r},${c}`, [row, col]);
        queue.push([r, c]);
      }
    }
  }
};

const updatePath = () => {
  const row = 0;
  const col = 0;
  explore(row, col);
};

export const Path = (() => {
  updatePath();
  return compute(platformMapData);
})();

export default compute(platformMapData);
