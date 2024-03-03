import { Euler, Quaternion, Vector3 } from 'three';
import { RootState, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

import { Keys } from '../../lib/keysMap';
import { RapierRigidBody } from '@react-three/rapier';
import getImpulse from '../../components/Entities/helper/getImpulse';
import updateOrientation from '../../components/Entities/helper/updateOrientation';
import { useKeyboardControls } from '@react-three/drei';
import { Context } from '../../providers/PlayerProvider/PlayerProvider';

const getMachineStateFromInputtedKeys = (keys: Keys) => {
    const {
        forward,
        backward,
        leftward,
        rightward,
        skill_1,
        skill_2,
        skill_3,
        skill_4,
    } = keys;
    if (forward || backward || leftward || rightward) {
        return 'move';
    }

    if (skill_4) return 'use_skill_4';

    if (skill_3) return 'use_skill_3';

    if (skill_2) return 'use_skill_2';

    if (skill_1) return 'use_skill_1';

    return 'idle';
};

const updateCameraMovement = (
    rootState: RootState,
    playerPosition: Vector3,
    playerRotation: Vector3
) => {
    const fixedOffset = new Vector3(0, 15, 15);

    const rotatedOffset = fixedOffset
        .clone()
        .applyAxisAngle(new Vector3(0, 1, 0), playerRotation.y);

    const cameraPosition = new Vector3();
    cameraPosition.copy(playerPosition).add(rotatedOffset);

    const cameraTarget = new Vector3();
    cameraTarget.copy(playerPosition);

    rootState.camera.position.copy(cameraPosition);
    rootState.camera.lookAt(cameraTarget);
};

export const usePlayerLogic = (useOrbitControls: boolean) => {
    const playerRigidBodyReference = useRef<RapierRigidBody>(null);
    const [orientation, setOrientation] = useState(Math.PI);
    const [_, getKeys] = useKeyboardControls() as unknown as [null, () => Keys];
    const [state, send] = Context.useActor();

    useFrame((rootState, delta) => {
        if (!playerRigidBodyReference.current) return;
        const keys = getKeys() as unknown as Keys;
        const numberOfKeysPressed = Object.values(keys).filter(
            (key) => key
        ).length;

        send(getMachineStateFromInputtedKeys(keys));

        if (!state.matches('Use skill 3') || !state.matches('Use skill 4')) {
            const impulse = getImpulse(keys, numberOfKeysPressed, delta);
    
            playerRigidBodyReference.current.setLinvel(impulse, false);
            updateOrientation(orientation, setOrientation, keys);
            const quaternionRotation = new Quaternion();
            quaternionRotation.setFromEuler(new Euler(0, orientation, 0));
            playerRigidBodyReference.current.setRotation(quaternionRotation, false);
        }


        if (state.matches('Use skill 3')) {
            const impulseVector = new Vector3(0, 0, 5);
            impulseVector.applyAxisAngle(new Vector3(0, 1, 0), orientation);
            playerRigidBodyReference.current.setLinvel(impulseVector, false);
        }

        if (!useOrbitControls) {
            updateCameraMovement(
                rootState,
                playerRigidBodyReference.current.translation() as unknown as Vector3,
                playerRigidBodyReference.current.rotation() as unknown as Vector3
            );
        }
    });

    return {
        playerRigidBodyReference,
        orientation,
        setOrientation,
        getKeys,
    };
};
