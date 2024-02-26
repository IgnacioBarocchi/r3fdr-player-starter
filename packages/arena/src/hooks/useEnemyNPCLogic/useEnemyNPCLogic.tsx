import { GameState, useGameStore } from '../useGameStore/useGameStore';
import { MutableRefObject, useRef } from 'react';

import { Group, Quaternion, Vector3 } from 'three';
import { RapierRigidBody } from '@react-three/rapier';
import { goToTarget } from './goToTarget';
import { useFrame } from '@react-three/fiber';
import { useMachine } from '@xstate/react';
import { ZombieMachine } from '../../Machines/ZombieMachine';
import { getDistance } from './getDistance';

const attacks = ['ABILITY_1', 'ABILITY_2', 'ABILITY_3'];
const speed = 1.2;

export const useEnemyNPCLogic = () => {
    const { playerState } = useGameStore((state: GameState) => ({
        playerState: state.playerState,
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

    const sendRandomAttack =  () => {
        send(attacks[Number(parseInt(String(Math.random() * 3)))]);
    };

    useFrame(() => {
        if (
            !enemy3DModel.current ||
            !enemyBody.current ||
            !playerState?.group
        ) {
            return;
        }

        // console.log("er", enemy3DModel.current.getWorldDirection(new Vector3()))
        const distance = getDistance(
            enemy3DModel.current,
            playerState.group
        );

        if (distance < 1.6) {
            sendRandomAttack();
        } else {
            send('MOVE');
            goToTarget({
                targetGroup: playerState?.group,
                sourceBody: enemyBody,
                source3DModelGroup: enemy3DModel,
                speed,
            });
        }
    });

    return {
        state,
        send,
        enemyBody,
        enemy3DModel,
    };
};
