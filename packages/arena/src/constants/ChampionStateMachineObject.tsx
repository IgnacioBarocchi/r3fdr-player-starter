// * All the entities have the same model.
// * The actions came bundled as an ActionObject[]
// * The Idle action gets pop from the array while the remaining abilities are filtered.
// * Each unit has 4 non-cancelable abilities with cool downs
// TODO: TAKE STUN AND FALL ARE THE SAME!

import { EventObject, assign } from 'xstate';
import { useAnimations, useGLTF } from '@react-three/drei';

import { EntityModel } from '../providers/entities';
import { Group } from 'three';
import getAnimationClipMilliseconds from '../lib/getAnimationClipDuration';

export type ActionObject = {
    animationName: string;
    duration?: number;
    isIdle?: boolean;
    isMove?: boolean;
    isTakingDamage?: boolean;
    isTakingStun?: boolean;
    isFinal?: boolean;
};

const getActionByKey =
    (
        key: 'isIdle' | 'isTakingDamage' | 'isTakingStun' | 'isFinal' | 'isMove'
    ) =>
    (record: ActionObject) =>
        record[key];
const filterFourAbilities = (actionRecord: ActionObject) => {
    const { isIdle, isMove, isTakingDamage, isTakingStun, isFinal } =
        actionRecord;
    return !isIdle && !isMove && !isTakingDamage && !isTakingStun && !isFinal;
};

export const ChampionMachineStateEvents = {
    IDLE: 'IDLE',
    ABILITY_1: 'ABILITY_1',
    ABILITY_2: 'ABILITY_2',
    ABILITY_3: 'ABILITY_3',
    ABILITY_4: 'ABILITY_4',
    MOVE: 'MOVE',
    FALL: 'FALL',
    DEATH: 'DEATH',
    TAKE_DAMAGE: 'TAKE_DAMAGE',
    TAKE_STUN: 'TAKE_STUN',
} as const;

type Stats = {
    initialHP: number;
    currentHP: number;
    playerIsTargeted?: boolean;
};

const enemyFeatures = {
    context: {
        initialHP: 100,
        currentHP: 20,
        playerIsTargeted: false,
    },
    on: {
        PLAYER_REACHABLE_CHANGE: {
            actions: assign(
                (context, event: EventObject & { targeted: boolean }) => ({
                    ...context,
                    playerIsTargeted: event.targeted,
                })
            ),
        },
    },
};

const playerFeatures = {
    context: {
        initialHP: 100,
        currentHP: 100,
        playerIsTargeted: null,
    },
};

const validator = (context: { currentHP: number }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (context.currentHP) {
                resolve(true);
            } else {
                reject(`Error entity is dead ${context.currentHP} `);
            }
        }, 200);
    });
};

export const getChampionMachine = (params: {
    id: string;
    player: (typeof EntityModel)[keyof typeof EntityModel];
    isAnEnemy?: boolean;
}) => {
    const animationActionByName = useAnimations(
        useGLTF(params.player.path).animations,
        new Group()
    ).actions;

    const fourAbilities =
        params.player.actionRecords.filter(filterFourAbilities);
    const [ability_1, ability_2, ability_3, ability_4] = fourAbilities.map(
        ({ animationName }) => animationName
    );
    const [
        ability_1CoolDown,
        ability_2CoolDown,
        ability_3CoolDown,
        ability_4CoolDown,
    ] = fourAbilities.map(
        ({ animationName }) =>
            getAnimationClipMilliseconds(
                animationActionByName,
                animationName
            ) ?? 1000
    );

    const idle = params.player.actionRecords.find(
        getActionByKey('isIdle')
    )?.animationName;
    const move = params.player.actionRecords.find(
        getActionByKey('isMove')
    )?.animationName;
    const takeDamage = params.player.actionRecords.find(
        getActionByKey('isTakingDamage')
    )?.animationName;
    const fall = params.player.actionRecords.find(
        getActionByKey('isTakingStun')
    )?.animationName;
    const final = params.player.actionRecords.find(
        getActionByKey('isFinal')
    )?.animationName;
    if (!idle || !move || !takeDamage || !fall || !final) {
        throw new Error('INVALID');
    }

    const {
        IDLE,
        ABILITY_1,
        ABILITY_2,
        ABILITY_3,
        ABILITY_4,
        MOVE,
        FALL,
        DEATH,
        TAKE_DAMAGE,
        TAKE_STUN,
    } = ChampionMachineStateEvents;

    const championState = {
        predictableActionArguments: true,
        id: params.id,
        initial: idle,
        states: {
            [idle]: {
                on: {
                    [ABILITY_1]: ability_1,
                    [ABILITY_2]: ability_2,
                    [ABILITY_3]: ability_3,
                    [ABILITY_4]: ability_4,
                    [MOVE]: move,
                    [FALL]: fall,
                    [DEATH]: final,
                    [TAKE_DAMAGE]: takeDamage,
                    [TAKE_STUN]: fall,
                },
            },
            [ability_1]: {
                after: {
                    [ability_1CoolDown]: idle,
                },
            },
            [ability_2]: {
                after: {
                    500: idle,
                },
            },
            [ability_3]: {
                after: {
                    [ability_3CoolDown]: idle,
                },
            },
            [ability_4]: {
                after: {
                    [ability_4CoolDown]: idle,
                },
            },
            [move]: {
                on: {
                    [IDLE]: idle,
                    [ABILITY_1]: ability_1,
                    [ABILITY_2]: ability_2,
                    [ABILITY_3]: ability_3,
                    [ABILITY_4]: ability_4,
                    [MOVE]: move,
                    [DEATH]: final,
                    [TAKE_DAMAGE]: takeDamage,
                    [TAKE_STUN]: fall,
                },
            },
            [takeDamage]: {
                entry: assign({
                    currentHP: (context: { currentHP: number }) => {
                        return context.currentHP - 20;
                    },
                }),
                after: {
                    // attacked animation cool down
                    1000: 'validating',
                },
            },
            validating: {
                invoke: {
                    id: 'HPValidator',
                    src: validator,
                    onDone: {
                        target: idle,
                    },
                    onError: {
                        target: final,
                    },
                },
            },
            [fall]: {
                after: {
                    1000: idle,
                },
            },
            [final]: {
                // keep the string literal
                type: 'final',
            },
        },
        ...(params.isAnEnemy ? enemyFeatures : playerFeatures),
    };

    return championState;
};
