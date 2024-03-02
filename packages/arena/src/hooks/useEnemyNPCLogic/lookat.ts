import { RapierRigidBody } from '@react-three/rapier';
import { MutableRefObject } from 'react';
import { Vector3, Quaternion } from 'three';

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


export const lookAt2 = (
    targetPosition: Vector3,
    sourceRigidBody: RapierRigidBody
) => {
    const rigidBodyPosition = sourceRigidBody.translation();

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
    sourceRigidBody.setRotation(rotation, false);
};