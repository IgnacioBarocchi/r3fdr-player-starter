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
        return "MOVE";
    }

    if (skill_4) return "SKILL_4";

    if (skill_3) return "SKILL_3";

    if (skill_2) return "SKILL_2";

    if (skill_1) return "SKILL_1";

    return "IDLE";
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

export const usePlayerLogic = (
    useOrbitControls: boolean,
) => {
    const playerBody = useRef<RapierRigidBody>(null);
    const [orientation, setOrientation] = useState(Math.PI);
    const [_, getKeys] = useKeyboardControls() as unknown as [null, () => Keys];
    const [, send] = Context.useActor();

    useFrame((rootState, delta) => {
        if (!playerBody.current) return;
        const keys = getKeys() as unknown as Keys;
        const numberOfKeysPressed = Object.values(keys).filter(
            (key) => key
        ).length;

        send(getMachineStateFromInputtedKeys(keys));

        const linearVelocityYAxis: number | undefined =
            playerBody.current?.linvel().y;
        const impulse = getImpulse(
            linearVelocityYAxis,
            keys,
            numberOfKeysPressed,
            delta
        );

        playerBody.current.setLinvel(impulse, false);

        updateOrientation(orientation, setOrientation, keys);

        const quaternionRotation = new Quaternion();
        quaternionRotation.setFromEuler(new Euler(0, orientation, 0));
        // console.log(quaternionRotation)
        playerBody.current.setRotation(quaternionRotation, false);

        const playerVectorialPosition = playerBody.current.translation();
        const playerVectorialRotation = playerBody.current.rotation();

        if (!useOrbitControls) {
            updateCameraMovement(
                rootState,
                playerVectorialPosition as unknown as Vector3,
                playerVectorialRotation as unknown as Vector3
            );
        }
    });

    return {
        playerBody,
        orientation,
        setOrientation,
        getKeys,
    };
};

// const isIdle = numberOfKeysPressed === 0;
// const action = isIdle
//     ? "IDLE"
//     : ;

//     send(numberOfKeysPressed === 0 && !state.matches("Idle") ? );