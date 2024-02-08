import { FloorChunkProps } from "../../components/FloorChunk";
import { NamedExoticComponent } from "react";
import { WallChunkProps } from "../../components/WallChunk";

export default abstract class Chunk {
  chunkPosition: [number, number, number] | null;
  size?: number = 16;
  Component:
    | NamedExoticComponent<FloorChunkProps>
    | NamedExoticComponent<WallChunkProps>;
  showConnection: boolean = false;

  constructor(
    Component:
      | NamedExoticComponent<FloorChunkProps>
      | NamedExoticComponent<WallChunkProps>,
    chunkPosition: [number, number, number] | null,
    size: number
  ) {
    this.Component = Component;
    this.chunkPosition = chunkPosition;
    this.size = size;
    this.showConnection = false;
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
      },
    };
  }
}
