import Chunk from "../Chunk/Chunk";
import FloorChunk from "../../components/FloorChunk";

export default class Floor extends Chunk {
  hasTarget: boolean;
  constructor(
    chunkPosition: [number, number, number] | null,
    size: number = 16
  ) {
    super(FloorChunk, chunkPosition, size);
    this.hasTarget = false;
  }

  get() {
    if (!this.chunkPosition) {
      throw new Error(`Set chunk position`);
    }

    return {
      Chunk: this.Component,
      props: {
        size: this.size,
        chunkPosition: this.chunkPosition,
        showConnection: this.showConnection,
        hasTarget: this.hasTarget,
      },
    };
  }
}
