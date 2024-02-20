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
import { MutableRefObject, useRef } from 'react';
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

const playerIsInteractingWithSensor = (
    name: EntityType | undefined | string
) => {
    return ENTITIES_NAMES.Player === name;
};

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
    const [state, send] = useMachine(createMachine(machine));
    // todo: later on.
    const { currentHP, playerIsReachable } = state.context;

    const handlePlayerReachableChange = (reachable: boolean) => {
        // @ts-ignore
        send({ type: 'PLAYER_REACHABLE_CHANGE', reachable });
    };

    useFrame(() => {
        if (!enemy3DModel.current || !enemyBody.current) return;
        if (state.value === 'dead') return;

        // if (currentHP <= 0) {
        //   send("DIE");
        //   return;
        // }

        // if (currentHP <= 10) {
        //   send("RUN_AWAY");
        // }

        if (characterState?.group && shouldFollow) {
            send(ChampionMachineStateEvents.MOVE);
            goToTarget(
                {
                    targetGroup: characterState?.group,
                    sourceBody: enemyBody,
                    source3DModelGroup: enemy3DModel,
                },
                2
            );
        }
    });

    return {
        state,
        send,
        enemyBody,
        enemy3DModel,
    };
};
