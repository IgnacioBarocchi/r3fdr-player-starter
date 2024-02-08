import { Box, PositionalAudio, useTexture } from "@react-three/drei";
import {
  CollisionEnterHandler,
  CuboidCollider,
  RigidBody,
} from "@react-three/rapier";
import {
  GroundPresets,
  getTextureMapsResult,
} from "../../../lib/textureHelper";

import { Hitboxes } from "../../../lib/object3DHelper";
import { useState } from "react";

const CargoBoxes = () => {
  const { map, normalMap, roughnessMap } = getTextureMapsResult(
    useTexture,
    GroundPresets.CARGO_BOX,
    1
  );
  const [soundUrl, setSoundUrl] = useState("");

  const collisionEnterHandler = (({ other: { rigidBodyObject } }) => {
    setSoundUrl(
      [Hitboxes.FIST, Hitboxes.GEAR].includes(String(rigidBodyObject?.name))
        ? "/sounds/Doodads/robot-hit-cell.mp3"
        : ""
    );
  }) as CollisionEnterHandler;
  return (
    <RigidBody
      colliders={false}
      position={[0, 1, 1]}
      friction={5}
      restitution={0.5}
      density={5}
    >
      <CuboidCollider
        args={[0.5, 0.5, 0.5]}
        position={[0, 0, 0]}
        onCollisionEnter={collisionEnterHandler}
      />
      <Box args={[1, 1]}>
        <meshStandardMaterial
          map={map}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
        />
      </Box>
      {soundUrl && (
        <PositionalAudio
          autoplay
          loop={false}
          load
          url={soundUrl}
          distance={0.2}
        />
      )}
    </RigidBody>
  );
};

export default CargoBoxes;
