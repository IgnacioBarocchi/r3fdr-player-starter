import {
  CapsuleCollider as Bounding,
  RigidBody,
  CylinderCollider as Sensor,
} from "@react-three/rapier";

import { Skeleton23DModel } from "./Skeleton23DModel";
import { useEnemyNPCLogic } from "../../../hooks/useEnemyNPCLogic/useEnemyNPCLogic";

export const Skeleton2NPC = () => {
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
      position={[5, 1, 5]}
    >
      <Bounding args={[0.2, 0.6]} position={[0, 0, 0.2]} />
      <Sensor
        args={[0.2, 2]}
        position={[0, 0.5, 0]}
        sensor
        onIntersectionEnter={onInteractionRadiusEnter}
        onIntersectionExit={onInteractionRadiusLeave}
      />
      <Skeleton23DModel
        state={state.value}
        givenDependantGroupRef={enemy3DModel}
      />
    </RigidBody>
  );
};
