import { RapierRigidBody } from '@react-three/rapier';
import { MutableRefObject } from 'react';

import { Vector3, Quaternion, Object3D } from 'three';

export const lookAt = (
    targetPosition: Vector3,
    sourceBody: MutableRefObject<RapierRigidBody>
) => {
    const rigidBody = sourceBody.current;
    const rigidBodyPosition = rigidBody.translation();

    const direction = new Vector3()
        .subVectors(
            targetPosition,

            new Vector3(
                rigidBodyPosition.x,
                rigidBodyPosition.y,
                rigidBodyPosition.z
            )
        )
        .normalize();

    const rotation = new Quaternion();
    rotation.setFromUnitVectors(new Vector3(0, 0, 1), direction);
    rotation.set(0, rotation.y, 0, rotation.w);
    rigidBody.setRotation(rotation, false);
};

// export const lookAt = (
//     targetPosition: Vector3,
//     sourceBody: MutableRefObject<RapierRigidBody>
// ) => {
//     const rigidBody = sourceBody.current;

//     const lookAtObject = new Object3D();
//     lookAtObject.position.copy(
//         new Vector3(
//             rigidBodyPosition.x,
//             rigidBodyPosition.y,
//             rigidBodyPosition.z
//         )
//     );
//     lookAtObject.lookAt(targetPosition);

//     const rotation = new Quaternion();
//     rotation.setFromRotationMatrix(lookAtObject.matrix);

//     rigidBody.setRotation(rotation);
// };

// export const lookAt = (
//     targetPosition: Vector3,
//     sourceBody: MutableRefObject<RapierRigidBody>
// ) => {
//     const rigidBodyPosition = sourceBody.current.translation();

//     const lookAtObject = new Object3D();
//     lookAtObject.position.copy(
//         new Vector3(
//             rigidBodyPosition.x,
//             rigidBodyPosition.y,
//             rigidBodyPosition.z
//         )
//     );

//     lookAtObject.lookAt(targetPosition);
//     const rotation = new Quaternion();
//     rotation.setFromRotationMatrix(lookAtObject.matrix);

//     sourceBody.current.setRotation(rotation, false);
// };

// export const lookAt = (
//     targetPosition: Vector3,
//     sourceBody: MutableRefObject<RapierRigidBody>
// ) => {
//     const rigidBodyPosition = sourceBody.current.translation();

//     const directionVector = new Vector3(
//         targetPosition.x - rigidBodyPosition.x,
//         targetPosition.y - rigidBodyPosition.y,
//         targetPosition.z - rigidBodyPosition.z
//     );

//     directionVector.normalize();

//     sourceBody.current.addTorque(directionVector, false);
// };

const lookAtTarget = (references: {
    source3DModelGroup: MutableRefObject<Group>;
    sourceBody: MutableRefObject<RapierRigidBody>;
    targetGroup: Group;
    speed: number;
}) => {
    const { source3DModelGroup, sourceBody, targetGroup } = references;

    const meleeNPCPosition = source3DModelGroup.current?.getWorldPosition(
        new Vector3()
    );

    const targetPosition = targetGroup.getWorldPosition(new Vector3());
    const magnitude = Math.sqrt(
        meleeNPCPosition.x * meleeNPCPosition.x +
            meleeNPCPosition.y * meleeNPCPosition.y +
            meleeNPCPosition.z * meleeNPCPosition.z
    );

    const unNormalizedDirectionVector = new Vector3().subVectors(
        targetPosition,
        meleeNPCPosition
    );

    const directionVector = new Vector3(
        unNormalizedDirectionVector.x / magnitude,
        unNormalizedDirectionVector.y / magnitude,
        unNormalizedDirectionVector.z / magnitude
    );

    const crossProduct = directionVector.cross(targetPosition);
    const intermediateQuaternion = new Quaternion(...crossProduct.toArray(), 0);
    intermediateQuaternion.normalize();
    const currentRotation = sourceBody.current.rotation();
    const currentQuaternion = new Quaternion(
        currentRotation.x,
        currentRotation.y,
        currentRotation.z,
        currentRotation.w
    );
    const finalQuaternion = intermediateQuaternion.multiply(currentQuaternion);
    sourceBody.current.setRotation(finalQuaternion, false);
};
