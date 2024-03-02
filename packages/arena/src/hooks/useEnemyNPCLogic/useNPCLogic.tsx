import { GameState, useGameStore } from '../useGameStore/useGameStore';
import { MutableRefObject, useRef } from 'react';

import { Vector3 } from 'three';
import { RapierRigidBody } from '@react-three/rapier';
import { goToTarget2 } from './goToTarget';
import { useFrame } from '@react-three/fiber';
import { useMachine } from '@xstate/react';
import { getDistance } from './getDistance';
import { createMachine } from 'xstate';

const attacks = ['use_skill_1', 'use_skill_2', 'use_skill_3', 'use_skill_4'];
const speed = 1.5;

// @ts-ignore
export const useNPCLogic = (machineInput) => {
    const { playerRigidBody } = useGameStore((state: GameState) => ({
        playerRigidBody: state.playerRigidBody,
    }));

    const NPCRigidBodyReference =
        useRef<RapierRigidBody>() as MutableRefObject<RapierRigidBody>;

    // @ts-ignore
    const [state, send] = useMachine(createMachine(machineInput));

    const sendRandomAttack = () => {
        send(attacks[Number(parseInt(String(Math.random() * 3)))]);
    };

    useFrame(() => {
        if (!NPCRigidBodyReference.current) {
            return;
        }

        const partialParams = {
            sourcePosition: new Vector3(
                NPCRigidBodyReference.current.translation().x,
                NPCRigidBodyReference.current.translation().y,
                NPCRigidBodyReference.current.translation().z
            ),
            targetPosition: new Vector3(
                playerRigidBody.translation().x,
                playerRigidBody.translation().y,
                playerRigidBody.translation().z
            )
        };

        const distance = getDistance(partialParams);

        if (distance < 1.6) {
            sendRandomAttack();
        } else {
            goToTarget2({
                ...partialParams,
                sourceRigidBody: NPCRigidBodyReference.current,
                speed,
            });
        }
    });

    return {
        state,
        send,
        NPCRigidBodyReference,
    };
};
