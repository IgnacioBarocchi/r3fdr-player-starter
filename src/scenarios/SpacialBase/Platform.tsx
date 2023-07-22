import { Box, useTexture } from "@react-three/drei";
import { GroundPresets, getTextureMapsResult } from "../../lib/textureHelper";

import { RigidBody } from "@react-three/rapier";

const Platform = () => {
  const { map, normalMap, roughnessMap } = getTextureMapsResult(
    useTexture,
    GroundPresets.SCIFI_METAL,
    50
  );
  return (
    <RigidBody colliders={"cuboid"} type={"fixed"}>
      <Box args={[50, 0.1, 50]} receiveShadow>
        <meshStandardMaterial
          map={map}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
        />
      </Box>
    </RigidBody>
  );
};

export default Platform;
