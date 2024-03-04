import { Vector3 } from 'three';

import { RapierRigidBody } from '@react-three/rapier';
import { lookAt2 } from './lookat';

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

export const goToTarget2 = (params: {
    sourcePosition: Vector3;
    targetPosition: Vector3;
    speed: number;
    sourceRigidBody: RapierRigidBody;
}) => {
    const { sourcePosition, targetPosition, sourceRigidBody, speed } = params;

    lookAt2(targetPosition, sourceRigidBody);
    // linvelTowards(sourceRigidBody, sourcePosition, speed)
    impulseTowards2(targetPosition, sourceRigidBody, sourcePosition, speed);
};

// @ts-ignore
const linvelTowards = (sourceRigidBody:RapierRigidBody, sourcePosition, speed) =>{
    const impulseVector = new Vector3(0, 0, 5);
    const orientation = sourceRigidBody.rotation().y;
    impulseVector.applyAxisAngle(new Vector3(0, 1, 0), orientation);
    sourceRigidBody.setLinvel(impulseVector, false)
}

const impulseTowards2 = (
    targetPosition: Vector3,
    sourceRigidBody: RapierRigidBody,
    meleeNPCPosition: Vector3,
    speed: number
) => {
    const meleeNPCImpulseForce = getMeleeNPCMeleeNPCImpulse(
        targetPosition,
        meleeNPCPosition,
        speed
    );

    sourceRigidBody.applyImpulseAtPoint(
        meleeNPCImpulseForce,
        targetPosition,
        true
    );
};

// const impulseTowards = (
//     targetPosition: Vector3,
//     sourceBody: MutableRefObject<RapierRigidBody>,
//     meleeNPCPosition: Vector3,
//     speed: number
// ) => {
//     const meleeNPCImpulseForce = getMeleeNPCMeleeNPCImpulse(
//         targetPosition,
//         meleeNPCPosition,
//         speed
//     );

//     sourceBody.current.applyImpulseAtPoint(
//         meleeNPCImpulseForce,
//         targetPosition,
//         true
//     );
// };

// console.log(targetRotation.y)
// sourceBody.current.setRotation(
//     { x: targetRotation.x, y: targetRotation.y, z: targetRotation.z, w:targetRotation.w },
//     false
// );
// if (!lookingAtZ || !lookingAtX) {
// source3DModelGroup.current.quaternion.copy(targetRotation);
// }
// source3DModelGroup.current.quaternion.copy(targetRotation);
// const quaternionRotation = new Quaternion();
// // Math.atan2(Math.sin(targetGroup.rotation.y), Math.cos(targetGroup.rotation.y))
// quaternionRotation.setFromEuler(new Euler(0, Math.PI /2, 0));
// sourceBody.current.setRotation(quaternionRotation, false);

// // copiar solo el valor que
// if (!lookingAtZ || !lookingAtX) {
//     source3DModelGroup.current.quaternion.copy(targetRotation);
// }

// sourceBody.current.setRotation(targetRotation, false);

// source3DModelGroup.current.lookAt(targetPosition);
// console.log(source3DModelGroup.current.rotation.y);

// //
// const soloSiEstaDeEspaldasAlModelo = false;
// if (soloSiEstaDeEspaldasAlModelo) {
//     source3DModelGroup.current.quaternion.copy(targetRotation);
// }

// sourceBody.current.setRotation(targetGroup.quaternion, false);

// sourceBody.current.setRotation({x:0, y:Math.PI * 2.5, z:0, w:0}, false)
// const yval = -targetRotation.y
// Math.abs(
//     getNormalizedTurnAngle(source3DModelGroup.current.rotation.y)
// );
// source3DModelGroup.current.rotation.y = yval;//yval;

// console.log('y', yval);

// const magnitude = Math.sqrt(
//     meleeNPCPosition.x * meleeNPCPosition.x +
//         meleeNPCPosition.y * meleeNPCPosition.y +
//         meleeNPCPosition.z * meleeNPCPosition.z
// );

// const unNormalizedDirectionVector = new Vector3().subVectors(
//     targetPosition,
//     meleeNPCPosition
// );

// const directionVector = new Vector3(
//     unNormalizedDirectionVector.x / magnitude,
//     unNormalizedDirectionVector.y / magnitude,
//     unNormalizedDirectionVector.z / magnitude
// );

// const crossProduct = directionVector.cross(targetPosition);
// const intermediateQuaternion = new Quaternion(...crossProduct.toArray(), 0);
// intermediateQuaternion.normalize();
// const currentRotation =sourceBody.current.rotation();
// const currentQuaternion  = new Quaternion(currentRotation.x, currentRotation.y, currentRotation.z, currentRotation.w);
// const finalQuaternion = intermediateQuaternion.multiply(currentQuaternion);
// sourceBody.current.setRotation(finalQuaternion, false);

// const meleeNPCDirection = source3DModelGroup.current?.getWorldDirection(
//     new Vector3()
// );
// const targetDirection = targetGroup.getWorldDirection(new Vector3());
// const lookingAtZ =
//     (targetDirection.z > 0 && meleeNPCDirection.z > 0) ||
//     (targetDirection.z < 0 && meleeNPCDirection.z < 0);
// const lookingAtX =
//     (targetDirection.x > 0 && meleeNPCDirection.x > 0) ||
//     (targetDirection.x < 0 && meleeNPCDirection.x < 0);
// source3DModelGroup.current.lookAt(targetPosition);
// copyBodyRotation(sourceBody, targetGroup);

// !

// export const goToTarget = (references: Params) => {
//     const { source3DModelGroup, sourceBody, targetGroup, speed } = references;

//     const meleeNPCPosition = source3DModelGroup.current?.getWorldPosition(
//         new Vector3()
//     );
//     const targetPosition = targetGroup.getWorldPosition(new Vector3());
//     lookAt(targetPosition, sourceBody);
//     impulseTowards(targetPosition, sourceBody, meleeNPCPosition, speed);
// };
// type Params = {
//     source3DModelGroup: MutableRefObject<Group>;
//     sourceBody: MutableRefObject<RapierRigidBody>;
//     targetGroup: Group;
//     speed: number;
// };
