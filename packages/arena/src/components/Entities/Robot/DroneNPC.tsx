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
    onInteractionRadiusEnter,
    onInteractionRadiusLeave,
    enemyBody,
    enemy3DModel,
  } = useEnemyNPCLogic();

  return (
    <RigidBody
      lockRotations={true}
      colliders={false}
      ref={enemyBody}
      position={[1, 4, 1]}
      gravityScale={0}
    >
      <Bounding args={[0.6]} position={[0, 0.8, 0.2]} />
      <Sensor
        args={[0.2, 2]}
        position={[0, 0.5, 0]}
        sensor
        onIntersectionEnter={onInteractionRadiusEnter}
        onIntersectionExit={onInteractionRadiusLeave}
      />
      <Drone3DModel state={state.value} givenDependantGroupRef={enemy3DModel} />
    </RigidBody>
  );
};
