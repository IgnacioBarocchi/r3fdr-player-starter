import { Box, useTexture } from "@react-three/drei";
import { FC, memo } from "react";
import FloorChunk, { FloorChunkProps } from "../FloorChunk";
import { GroundPresets, getTextureMapsResult } from "../../lib/textureHelper";

import { RigidBody } from "@react-three/rapier";

const WallChunk: FC<WallChunkProps> = ({
  size = 16,
  wallPosition = [0, 0],
  layout,
  chunkPosition,
  showConnection,
}) => {
  const { map, normalMap, roughnessMap } = getTextureMapsResult(
    useTexture,
    GroundPresets.SCIFI_METAL,
    size
  );

  const [x, z] = wallPosition;

  return (
    <group position={chunkPosition}>
      <RigidBody colliders={"cuboid"} type={"fixed"}>
        <Box
          args={[size, 5, 0.1]}
          receiveShadow
          rotation={[0, layout === "h" ? 0 : Math.PI / 2, 0]}
          position={[x, 0, z]}
        >
          <meshStandardMaterial
            map={map}
            normalMap={normalMap}
            roughnessMap={roughnessMap}
          />
        </Box>
      </RigidBody>
      <FloorChunk
        size={size}
        chunkPosition={undefined}
        showConnection={showConnection}
      />
    </group>
  );
};

export default memo(WallChunk);

export interface WallChunkProps extends FloorChunkProps {
  wallPosition: [number, number];
  layout: "v" | "h";
}
