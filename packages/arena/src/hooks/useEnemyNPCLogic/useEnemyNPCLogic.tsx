import {
    ChampionMachineStateEvents,
} from '../../constants/ChampionStateMachineObject';
import { GameState, useGameStore } from '../useGameStore/useGameStore';
import { MutableRefObject, useEffect, useRef } from 'react';

import { Group } from 'three';
import { RapierRigidBody } from '@react-three/rapier';
import { goToTarget } from './goToTarget';
import { useFrame } from '@react-three/fiber';
import { useMachine } from '@xstate/react';
import { ZombieMachine } from '../../Machines/ZombieMachine';

const attacks = ["ABILITY_1", "ABILITY_2", "ABILITY_3"];
const speed = 1.2;

export const useEnemyNPCLogic = (
    shouldFollow?: boolean
) => {
    const { characterState } = useGameStore((state: GameState) => ({
        characterState: state.characterState,
        setCaption: state.setCaption,
    }));

    const enemyBody =
        useRef<RapierRigidBody>() as MutableRefObject<RapierRigidBody>;
    const enemy3DModel = useRef<Group>(null) as MutableRefObject<Group>;

    // @ts-ignore
    const [state, send] = useMachine(ZombieMachine, {
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

        if (
            characterState?.group &&
            shouldFollow &&
            state.context.currentHP &&
            // @ts-ignore
            !state.context.playerIsTargeted
        ) {
            goToTarget({
                targetGroup: characterState?.group,
                sourceBody: enemyBody,
                source3DModelGroup: enemy3DModel,
                speed,
            });
        }

        if (elapsedRef.current >= 1.2) {
            //!&& state.context.playerIsTargeted) {
            send(attacks[Number(parseInt(String(Math.random() * 3)))]);
            elapsedRef.current = 0;
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
