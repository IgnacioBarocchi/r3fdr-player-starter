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
import Terrain from "./Piso.tsx";
import { useContext, useEffect, useState } from "react";
import { useControls } from "leva";

const SpacialBase = () => {
  const {
    state: { USE_ORBIT_CONTROLS, DEBUG_APP },
  } = useContext(AppContext);

  const { mockOrbitControls } = useControls({ mockOrbitControls: false });
  const [terrainIsLoading, setTerrainIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTerrainIsLoading(false)
    }, 200);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <Physics timeStep="vary" debug={true}>
      <RigidBody type={"fixed"} colliders="hull">
        <Terrain
          position={new Vector3(0, .2, 0)}
          scale={new Vector3(50, .2, 50)}
        />
      </RigidBody>
      {!terrainIsLoading && (
        <>
          <DroneNPC />
          <Skeleton2NPC />
          <Player useOrbitControls={USE_ORBIT_CONTROLS && mockOrbitControls} />
        </>
      )}
      
    </Physics>
  );
};

export default SpacialBase;

/* <Box args={[50, 0, 50]} position={[0, 1 / 2, 0]} receiveShadow></Box> */
/* <Box args={[50, 0, 50]} position={[0, 1 / 2, 0]} receiveShadow></Box> */
