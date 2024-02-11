import { Group, Vector3 } from "three";

import { MutableRefObject } from "react";
import { RapierRigidBody } from "@react-three/rapier";
import getNormalizedTurnAngle from "../../lib/getNormalizedTurnAngle";

const getMeleeNPCMeleeNPCulse = (
    playerPosition: Vector3,
    meleeNPCPosition: Vector3,
    speed = 0.4
): Vector3 => {
    const direction = new Vector3();
    if (!playerPosition || !meleeNPCPosition) return direction;
    direction.subVectors(playerPosition, meleeNPCPosition).normalize();
    const impulse = new Vector3(direction.x, 0, direction.z).multiplyScalar(
        speed
    );
    return impulse;
};

export const goToTarget = (references: Params, speed = 1) => {
    const { soruce3DModelGroup,
        sourceBody,
        targetGroup } = references;

    const targetPosition = targetGroup.getWorldPosition(
        new Vector3()
    );
    const meleeNPCPosition = soruce3DModelGroup.current?.getWorldPosition(
        new Vector3()
    );

    soruce3DModelGroup.current.lookAt(targetPosition);
    soruce3DModelGroup.current.rotation.x = 0;
    soruce3DModelGroup.current.rotation.z = 0;
    soruce3DModelGroup.current.rotation.y = Math.abs(
        getNormalizedTurnAngle(soruce3DModelGroup.current.rotation.y)
    );

    const meleeNPCulseForce = getMeleeNPCMeleeNPCulse(
        targetPosition,
        meleeNPCPosition,
        speed
    );

    sourceBody.current.applyImpulseAtPoint(
        meleeNPCulseForce,
        targetPosition,
        true
    );
};

type Params = {
    soruce3DModelGroup: MutableRefObject<Group>;
    sourceBody: MutableRefObject<RapierRigidBody>;
    targetGroup: Group;
}