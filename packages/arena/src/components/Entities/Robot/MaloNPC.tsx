import {
  CapsuleCollider as Bounding,
  RigidBody,
  CylinderCollider as Sensor,
} from "@react-three/rapier";

import Malo3DModel from "./Malo3DModel";
import { useEnemyNPCLogic } from "../../../hooks/useEnemyNPCLogic/useEnemyNPCLogic";

export const MaloNPC = () => {
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
      position={[4, 1, 4]}
    >
      <Bounding args={[0.2, 0.6]} position={[0, 0.8, 0.2]} />
      <Sensor
        args={[0.2, 2]}
        position={[0, 0.5, 0]}
        sensor
        onIntersectionEnter={onInteractionRadiusEnter}
        onIntersectionExit={onInteractionRadiusLeave}
      />
      <Malo3DModel state={state.value} givenDependantGroupRef={enemy3DModel} />
    </RigidBody>
  );
};
