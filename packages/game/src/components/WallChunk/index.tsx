import { Box, useTexture } from "@react-three/drei";
import { FC, memo } from "react";
import { GroundPresets, getTextureMapsResult } from "../../lib/textureHelper";

import CargoBoxes from "../../containers/scenarios/SpacialBase/CargoBoxes";
import { RigidBody } from "@react-three/rapier";

const WallChunk: FC<FloorChunkProps> = ({
  size = 16,
  chunkPosition,
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
        <Box
          args={[size, size, size]}
          position={[0, size / 2, 0]}
          receiveShadow
        >
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

export default memo(WallChunk);

export interface FloorChunkProps {
  size?: number;
  chunkPosition: [number, number, number] | undefined;
  showConnection: boolean;
  hasTarget: boolean;
}
