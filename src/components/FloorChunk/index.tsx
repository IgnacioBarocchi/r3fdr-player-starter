import { Box, useTexture } from "@react-three/drei";
import { FC, memo } from "react";
import { GroundPresets, getTextureMapsResult } from "../../lib/textureHelper";

import { RigidBody } from "@react-three/rapier";

const FloorChunk: FC<FloorChunkProps> = ({
  size = 16,
  chunkPosition,
  showConnection,
}) => {
  const { map, normalMap, roughnessMap } = getTextureMapsResult(
    useTexture,
    GroundPresets.SCIFI_METAL,
    size
  );

  return (
    <group position={chunkPosition}>
      <RigidBody colliders={"cuboid"} type={"fixed"}>
        {showConnection && (
          <Box args={[1, 1, 1]} receiveShadow>
            <meshStandardMaterial
              map={map}
              normalMap={normalMap}
              roughnessMap={roughnessMap}
            />
          </Box>
        )}
        <Box args={[size, 0.1, size]} receiveShadow>
          <meshStandardMaterial
            map={map}
            normalMap={normalMap}
            roughnessMap={roughnessMap}
          />
        </Box>
      </RigidBody>
    </group>
  );
};

export default memo(FloorChunk);

export interface FloorChunkProps {
  size?: number;
  chunkPosition: [number, number, number] | undefined;
  showConnection: boolean;
}
