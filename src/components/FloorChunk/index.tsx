import { Box, Text, useTexture } from "@react-three/drei";
import { FC, memo } from "react";
import { GroundPresets, getTextureMapsResult } from "../../lib/textureHelper";

import CargoBoxes from "../../containers/scenarios/SpacialBase/CargoBoxes";
import { RigidBody } from "@react-three/rapier";

const FloorChunk: FC<FloorChunkProps> = ({
  size = 16,
  chunkPosition,
  showConnection,
  hasTarget,
}) => {
  const { map, normalMap, roughnessMap } = getTextureMapsResult(
    useTexture,
    GroundPresets.SCIFI_METAL,
    size
  );

  return (
    <group position={chunkPosition}>
      <RigidBody colliders={"cuboid"} type={"fixed"} name={"FLOOR"}>
        {showConnection && (
          <Text
            scale={[0.5, 0.5, 0.5]}
            position={[0, 1, 0]}
            color="red"
            anchorX="center"
            anchorY="middle"
          >
            *
          </Text>
        )}
        <Box args={[size, 0.1, size]} receiveShadow>
          <meshStandardMaterial
            map={map}
            normalMap={normalMap}
            roughnessMap={roughnessMap}
          />
        </Box>
      </RigidBody>
      {hasTarget && <CargoBoxes />}
    </group>
  );
};

export default memo(FloorChunk);

export interface FloorChunkProps {
  size?: number;
  chunkPosition: [number, number, number] | undefined;
  showConnection: boolean;
  hasTarget: boolean;
}
