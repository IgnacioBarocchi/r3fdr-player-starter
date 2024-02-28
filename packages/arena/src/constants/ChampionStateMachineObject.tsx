// * All the entities have the same model.
// * The actions came bundled as an ActionObject[]
// * The Idle action gets pop from the array while the remaining skills are filtered.
// * Each unit has 4 non-cancelable skills with cool downs
// TODO: TAKE STUN AND FALL ARE THE SAME!

import { AnyStateMachine, EventObject, assign } from 'xstate';
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
const filterFourSkills = (actionRecord: ActionObject) => {
    const { isIdle, isMove, isTakingDamage, isTakingStun, isFinal } =
        actionRecord;
    return !isIdle && !isMove && !isTakingDamage && !isTakingStun && !isFinal;
};

export const ChampionMachineStateEvents = {
    IDLE: 'IDLE',
    SKILL_1: 'SKILL_1',
    SKILL_2: 'SKILL_2',
    SKILL_3: 'SKILL_3',
    SKILL_4: 'SKILL_4',
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

    const fourSkills =
        params.player.actionRecords.filter(filterFourSkills);
    const [skill_1, skill_2, skill_3, skill_4] = fourSkills.map(
        ({ animationName }) => animationName
    );
    const [
        skill_1CoolDown,
        skill_2CoolDown,
        skill_3CoolDown,
        skill_4CoolDown,
    ] = fourSkills.map(
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
        SKILL_1,
        SKILL_2,
        SKILL_3,
        SKILL_4,
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
                    [SKILL_1]: skill_1,
                    [SKILL_2]: skill_2,
                    [SKILL_3]: skill_3,
                    [SKILL_4]: skill_4,
                    [MOVE]: move,
                    [FALL]: fall,
                    [DEATH]: final,
                    [TAKE_DAMAGE]: takeDamage,
                    [TAKE_STUN]: fall,
                },
            },
            [skill_1]: {
                after: {
                    [skill_1CoolDown]: idle,
                },
            },
            [skill_2]: {
                after: {
                    500: idle,
                },
            },
            [skill_3]: {
                after: {
                    [skill_3CoolDown]: idle,
                },
            },
            [skill_4]: {
                after: {
                    [skill_4CoolDown]: idle,
                },
            },
            [move]: {
                on: {
                    [IDLE]: idle,
                    [SKILL_1]: skill_1,
                    [SKILL_2]: skill_2,
                    [SKILL_3]: skill_3,
                    [SKILL_4]: skill_4,
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
    console.log(championState);
    return championState;
};
