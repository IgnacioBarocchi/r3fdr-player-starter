import { Group, Quaternion, Vector3 } from 'three';

import { MutableRefObject } from 'react';
import { RapierRigidBody } from '@react-three/rapier';
import getNormalizedTurnAngle from '../../lib/getNormalizedTurnAngle';

const getMeleeNPCMeleeNPCImpulse = (
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

export const goToTarget = (references: Params) => {
    const { source3DModelGroup, sourceBody, targetGroup, speed } = references;

    const targetPosition = targetGroup.getWorldPosition(new Vector3());
    const targetRotation = targetGroup.getWorldQuaternion(new Quaternion());
    const meleeNPCPosition = source3DModelGroup.current?.getWorldPosition(
        new Vector3()
    );

    source3DModelGroup.current.lookAt(targetPosition);
    source3DModelGroup.current.quaternion.copy(targetRotation)
    // const yval = -targetRotation.y
    // Math.abs(
    //     getNormalizedTurnAngle(source3DModelGroup.current.rotation.y)
    // );
    // source3DModelGroup.current.rotation.y = yval;//yval;

    // console.log('y', yval);

    const meleeNPCImpulseForce = getMeleeNPCMeleeNPCImpulse(
        targetPosition,
        meleeNPCPosition,
        speed
    );

    sourceBody.current.applyImpulseAtPoint(
        meleeNPCImpulseForce,
        targetPosition,
        true
    );
};

type Params = {
    source3DModelGroup: MutableRefObject<Group>;
    sourceBody: MutableRefObject<RapierRigidBody>;
    targetGroup: Group;
    speed: number;
};
