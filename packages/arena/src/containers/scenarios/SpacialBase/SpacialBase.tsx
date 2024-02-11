import {
  MaloNPC,
  Skeleton2NPC,
} from "../../../components/Entities/Robot/Skeleton2NPC.tsx";
import { Physics, RigidBody } from "@react-three/rapier";

import { AppContext } from "../../../providers/GameSettingsProvider";
import { Box } from "@react-three/drei";
import { DroneNPC } from "../../../components/Entities/Robot/DroneNPC.tsx";
import Player from "../../../components/Entities/Robot/index.tsx";
import { Vector3 } from "three";
import WoodPlankBlock from "./Piso.tsx";
import { useContext } from "react";
import { useControls } from "leva";

const SpacialBase = () => {
  const {
    state: { USE_ORBIT_CONTROLS, DEBUG_APP },
  } = useContext(AppContext);

  const { mockOrbitControls } = useControls({ mockOrbitControls: false });

  return (
    <Physics timeStep="vary" debug={true}>
      <RigidBody type={"fixed"} colliders="hull">
        <Box args={[50, 0, 50]} position={[0, 1 / 2, 0]} receiveShadow></Box>
        {/* <WoodPlankBlock
          position={new Vector3(0, -5, 0)}
          scale={new Vector3(50, -5, 50)}
        /> */}
      </RigidBody>
      <DroneNPC />
      <Skeleton2NPC />
      <Player useOrbitControls={USE_ORBIT_CONTROLS && mockOrbitControls} />
    </Physics>
  );
};

export default SpacialBase;

/* <Box args={[50, 0, 50]} position={[0, 1 / 2, 0]} receiveShadow></Box> */
