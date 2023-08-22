import Chunk from "../Chunk/Chunk";
import WallChunk from "../../components/WallChunk";

export default class Wall extends Chunk {
  wallPosition: [number, number];
  layout: "h" | "v";
  size?: number = 16;

  constructor(
    chunkPosition: [number, number, number] | null,
    wallPosition: [number, number],
    layout: "h" | "v",
    size: number
  ) {
    super(WallChunk, chunkPosition, size);
    this.layout = layout;
    this.wallPosition = wallPosition;
  }

  get() {
    if (!this.chunkPosition) {
      throw new Error(`Set chunk position`);
    }

    return {
      Chunk: WallChunk,
      props: {
        size: this.size,
        chunkPosition: this.chunkPosition,
        wallPosition: this.wallPosition,
        layout: this.layout,
        showConnection: this.showConnection,
      },
    };
  }
}

export const verticalWall = (wallPosition: [number, number]) =>
  new Wall(null, wallPosition, "v", 8);

export const horizontalWall = (wallPosition: [number, number]) =>
  new Wall(null, wallPosition, "h", 8);
