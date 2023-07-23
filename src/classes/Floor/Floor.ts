import Chunk from "../Chunk/Chunk";
import FloorChunk from "../../components/FloorChunk";

export default class Floor extends Chunk {
  constructor(
    chunkPosition: [number, number, number] | null,
    size: number = 16
  ) {
    super(FloorChunk, chunkPosition, size);
  }
}
