import { Physics, RigidBody } from "@react-three/rapier";

import { AppContext } from "../../../providers/GameSettingsProvider";
import { Box } from "@react-three/drei";
import { MaloNPC } from "../../../components/Entities/Robot/MaloNPC.tsx";
import Player from "../../../components/Entities/Robot/index.tsx";
import { useContext } from "react";
import { useControls } from "leva";

const SpacialBase = () => {
  const {
    state: { USE_ORBIT_CONTROLS, DEBUG_APP },
  } = useContext(AppContext);

  const { mockOrbitControls } = useControls({ mockOrbitControls: true });

  return (
    <Physics timeStep="vary" debug={DEBUG_APP}>
      <RigidBody type={"fixed"} args={[50, 0, 50]}>
        <Box args={[50, 0, 50]} position={[0, 1 / 2, 0]} receiveShadow></Box>
      </RigidBody>
      <MaloNPC />
      <Player useOrbitControls={USE_ORBIT_CONTROLS && mockOrbitControls} />
    </Physics>
  );
};

export default SpacialBase;
