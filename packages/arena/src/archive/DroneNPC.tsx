import {
  BallCollider as Bounding,
  RigidBody,
  CylinderCollider as Sensor,
} from "@react-three/rapier";

import { Drone3DModel } from "./Drone3DModel";
import { useEnemyNPCLogic } from "../../../hooks/useEnemyNPCLogic/useEnemyNPCLogic";

export const DroneNPC = () => {
  const {
    state,
    enemyBody,
    enemy3DModel,
  } = useEnemyNPCLogic(true);

  return (
    <RigidBody
      lockRotations={true}
      ref={enemyBody}
      position={[1, 4, 1]}
      gravityScale={0}
      colliders="ball"
    >
      {/* <Bounding args={[0.6]} position={[0, 0.8, 0.2]} /> */}
      <Drone3DModel state={state.value} givenDependantGroupRef={enemy3DModel} />
    </RigidBody>
  );
};
