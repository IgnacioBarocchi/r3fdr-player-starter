import Chunk from "../../../classes/Chunk/Chunk";
import Floor from "../../../classes/Floor/Floor";

const s = 8;
const platformMapData = [[new Floor(null, s)]];

const compute = (platformMapData: Chunk[][]) => {
  platformMapData.forEach((row: Chunk[], i: number) => {
    row.forEach((chunk, j) => {
      // ? offset.
      const x = i === 0 ? 0 : i + s / 2 - 1;
      const z = j === 0 ? 0 : j + s / 2 - 1;
      chunk.chunkPosition = [x, 0, z];
    });
  });

  return platformMapData;
};

export default compute(platformMapData);
