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

export const useEnemyNPCLogic = (shouldFollow?: boolean) => {
    const { characterState } = useGameStore((state: GameState) => ({
        characterState: state.characterState,
        setCaption: state.setCaption,
    }));

    const enemyBody =
        useRef<RapierRigidBody>() as MutableRefObject<RapierRigidBody>;
    const enemy3DModel = useRef<Group>(null) as MutableRefObject<Group>;

    //   const [meleeNPCAction, setMeleeNPCAnimationClip] = useState<
    //     NPCActionTypes["animationClips"][T][number]
    //   >(animationClips.chase[0]);
    const a = useGLTF(EntityModel.Skeleton2).animations;
    console.log(a);
    const [state, send] = useMachine(
        getEnemyMachine(useAnimations(a, new Group()).actions)
    );
    // send("ROBOT_PUNCH");
    // @ts-ignore
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
            goToTarget(
                {
                    targetGroup: characterState?.group,
                    sourceBody: enemyBody,
                    source3DModelGroup: enemy3DModel,
                },
                1
            );
        }
    });

    const onInteractionRadiusEnter = (({ other: { rigidBodyObject } }) => {
        console.log(rigidBodyObject?.name);
        const playerIsClose = playerIsInteractingWithSensor(
            rigidBodyObject?.name
        );
        const isTakingDamage = rigidBodyObject?.name === 'FIST'; ///WEAPONS.SWORD;
        const NPCTakingDamageFromKick = rigidBodyObject?.name === 'FOOT'; //WEAPONS.FOOT;

        if (playerIsClose && !playerIsReachable) {
            handlePlayerReachableChange(true);
        }

        if (isTakingDamage) {
            console.log(
                'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
            );
            send('TAKE_DAMAGE');
            return;
        }

        if (NPCTakingDamageFromKick) {
            send('STUN');
            return;
        }

        if (playerIsReachable) {
            send('ATTACK');
            return;
        }
    }) as IntersectionEnterHandler;

    const onInteractionRadiusLeave = (({ other: { rigidBodyObject } }) => {
        const playerIsFar = playerIsInteractingWithSensor(
            rigidBodyObject?.name
        );
        // const finishingStunAttack = rigidBodyObject?.name === WEAPONS.FOOT;

        // if (finishingStunAttack) {
        //   send("RECOVER");
        // }

        if (playerIsFar && playerIsReachable) {
            handlePlayerReachableChange(false);
        }
    }) as IntersectionExitHandler;

    return {
        state,
        onInteractionRadiusEnter,
        onInteractionRadiusLeave,
        enemyBody,
        enemy3DModel,
    };
};
