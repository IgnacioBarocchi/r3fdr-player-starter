import {
    ChampionMachineStateEvents,
    getChampionMachine,
} from '../../constants/ChampionStateMachineObject';
import { Euler, Quaternion, Vector3 } from 'three';
import { RootState, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

import { EntityModel } from '../../providers/entities';
import { Keys } from '../../lib/keysMap';
import { RapierRigidBody } from '@react-three/rapier';
import { createMachine } from 'xstate';
import getImpulse from '../../components/Entities/helper/getImpulse';
import updateOrientation from '../../components/Entities/helper/updateOrientation';
import { useKeyboardControls } from '@react-three/drei';
import { useMachine } from '@xstate/react';

const getMachineStateFromInputtedKeys = (keys: Keys) => {
    // somehow i need to find the way to freeze controls when executing certain actions
    const { IDLE, ABILITY_1, ABILITY_2, ABILITY_3, ABILITY_4, MOVE } =
        ChampionMachineStateEvents;

    const {
        forward,
        backward,
        leftward,
        rightward,
        ability_1,
        ability_2,
        ability_3,
        ability_4,
    } = keys;

    if (forward || backward || leftward || rightward) {
        return MOVE;
    }

    if (ability_4) return ABILITY_4;

    if (ability_3) return ABILITY_3;

    if (ability_2) return ABILITY_2;

    if (ability_1) return ABILITY_1;

    return IDLE;
};

const updateCameraMovement = (
    state: RootState,
    robotPosition: Vector3,
    robotRotation: Vector3
) => {
    const fixedOffset = new Vector3(0, 15, 15);

    const rotatedOffset = fixedOffset
        .clone()
        .applyAxisAngle(new Vector3(0, 1, 0), robotRotation.y);

    const cameraPosition = new Vector3();
    cameraPosition.copy(robotPosition).add(rotatedOffset);

    const cameraTarget = new Vector3();
    cameraTarget.copy(robotPosition);

    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(cameraTarget);
};

export const usePlayerLogic = (
    useOrbitControls: boolean,
    player: (typeof EntityModel)[keyof typeof EntityModel]
) => {
    const machine = getChampionMachine({
        id: 'Player',
        player,
        isAnEnemy: false,
    });
    const robotBody = useRef<RapierRigidBody>(null);
    const [orientation, setOrientation] = useState(Math.PI);
    const [_, getKeys] = useKeyboardControls() as unknown as [null, () => Keys];
    // @ts-ignore
    const [machineState, send] = useMachine(createMachine(machine));

    useFrame((rootState, delta) => {
        if (!robotBody.current) return;
        const keys = getKeys() as unknown as Keys;
        const numberOfKeysPressed = Object.values(keys).filter(
            (key) => key
        ).length;

        const isIdle = numberOfKeysPressed === 0;
        const action = isIdle
            ? ChampionMachineStateEvents.IDLE
            : getMachineStateFromInputtedKeys(keys);

        send(action);
        const linearVelocityYaxis: number | undefined =
            robotBody.current?.linvel().y;
        const impulse = getImpulse(
            linearVelocityYaxis,
            keys,
            numberOfKeysPressed,
            delta
        );

        robotBody.current.setLinvel(impulse, false);

        updateOrientation(orientation, setOrientation, keys);

        const quaternionRotation = new Quaternion();
        quaternionRotation.setFromEuler(new Euler(0, orientation, 0));
        robotBody.current.setRotation(quaternionRotation, false);

        const robotVectorialPosition = robotBody.current.translation();
        const robotVectorialRotation = robotBody.current.rotation();

        if (!useOrbitControls) {
            updateCameraMovement(
                rootState,
                robotVectorialPosition as unknown as Vector3,
                robotVectorialRotation as unknown as Vector3
            );
        }
    });

    return {
        robotBody,
        orientation,
        setOrientation,
        getKeys,
        machineState,
        send,
    };
};
