import {
    ChampionMachineStateEvents,
    getChampionMachine,
} from '../../constants/ChampionStateMachineObject';
import { GameState, useGameStore } from '../useGameStore/useGameStore';
import {
    IntersectionEnterHandler,
    IntersectionExitHandler,
    RapierRigidBody,
} from '@react-three/rapier';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';

import { EntityModel } from '../../providers/entities';
import { Group } from 'three';
import { createMachine } from 'xstate';
import { enemyMachine } from './enemyMachine';
import getEnemyMachine from './getEnemyMachine';
import { goToTarget } from './goToTarget';
import { useFrame } from '@react-three/fiber';
import { useMachine } from '@xstate/react';

const ENTITIES_NAMES = {
    Plinth: 'Plinth',
    Floor: 'Floor',
    Player: 'Player',
    Enemy: 'Enemy',
    Ally: 'Ally',
    IMP_VARIANT_1: 'ImpVariant1',
    IMP_VARIANT_2: 'ImpVariant2',
} as const;

export type EntityType = (typeof ENTITIES_NAMES)[keyof typeof ENTITIES_NAMES];
const speed = 1.2;
export const useEnemyNPCLogic = (
    npc: (typeof EntityModel)[keyof typeof EntityModel],
    shouldFollow?: boolean
) => {
    const { characterState } = useGameStore((state: GameState) => ({
        characterState: state.characterState,
        setCaption: state.setCaption,
    }));

    const enemyBody =
        useRef<RapierRigidBody>() as MutableRefObject<RapierRigidBody>;
    const enemy3DModel = useRef<Group>(null) as MutableRefObject<Group>;
    const machine = getChampionMachine({
        id: 'Zombie',
        player: npc,
        isAnEnemy: true,
    });

    // @ts-ignore
    const [state, send] = useMachine(createMachine(machine), {
        actions: {
            reduceHP: (context) => {
                context.currentHP -= 10;
            },
        },
    });
    const elapsedRef = useRef(0);

    useFrame((_, delta) => {
        if (!enemy3DModel.current || !enemyBody.current) return;
        elapsedRef.current += delta;

        if (elapsedRef.current >= 1.2) {
            send(
                [
                    ChampionMachineStateEvents.ABILITY_1,
                    ChampionMachineStateEvents.ABILITY_2,
                    ChampionMachineStateEvents.ABILITY_3,
                ][Number(parseInt(String(Math.random() * 3)))]
            );

            elapsedRef.current = 0;
        }

        if (
            characterState?.group &&
            shouldFollow &&
            // @ts-ignore
            !state.context.playerIsTargeted
        ) {
            goToTarget(
                {
                    targetGroup: characterState?.group,
                    sourceBody: enemyBody,
                    source3DModelGroup: enemy3DModel,
                },
                speed
            );
        }
    });

    useEffect(() => {
        if (state.context.playerIsTargeted) {
        } else {
            send(ChampionMachineStateEvents.MOVE);
        }
    }, [state.context.playerIsTargeted]);

    return {
        state,
        send,
        enemyBody,
        enemy3DModel,
    };
};

// if (currentHP <= 0) {
//   send("DIE");
//   return;
// }

// if (currentHP <= 10) {
//   send("RUN_AWAY");
// }
// if (state.context.playerIsTargeted) {
//     send(
//         [
//             ChampionMachineStateEvents.ABILITY_1,
//             ChampionMachineStateEvents.ABILITY_2,
//             ChampionMachineStateEvents.ABILITY_3,
//         ][0]
//     );
// }
