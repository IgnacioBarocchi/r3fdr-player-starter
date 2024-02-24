import { createMachine } from 'xstate';

export type MachineStates = {
    [state: string]: {
        animation: { name: string; duration: number };
        effect?: 'STUN' | 'AOE';
    };
};

export const getHPValidator =
    (checkHPDelay = 200) =>
    (context: { currentHP: number }) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (context.currentHP) {
                    resolve(true);
                } else {
                    reject(`Error entity is dead ${context.currentHP} `);
                }
            }, checkHPDelay);
        });
    };

export const getBaseMachineInput = () => {
    return {
        predictableActionArguments: true,
        id: 'BaseMachine',
        initial: 'Idle',
        states: {
            Idle: {
                on: {
                    MOVE: 'Running',
                    ABILITY_1: 'Using1stAbility',
                    ABILITY_2: 'Using2ndAbility',
                    ABILITY_3: 'Using3rdAbility',
                    ABILITY_4: 'Using4thAbility',
                    FALL: 'Stunned',
                    TAKE_DAMAGE: 'TakingDamage',
                    TAKE_STUN: 'Stunned',
                    DEATH: 'Dying',
                },
            },
            Using1stAbility: {
                after: {
                    1000: 'Idle',
                },
            },
            Using2ndAbility: {
                after: {
                    1000: 'Idle',
                },
            },
            Using3rdAbility: {
                after: {
                    1000: 'Idle',
                },
            },
            Using4thAbility: {
                after: {
                    1000: 'Idle',
                },
            },
            Running: {
                on: {
                    IDLE: 'Idle',
                    MOVE: 'Running',
                    ABILITY_1: 'Using1stAbility',
                    ABILITY_2: 'Using2ndAbility',
                    ABILITY_3: 'Using3rdAbility',
                    ABILITY_4: 'Using4thAbility',
                    TAKE_DAMAGE: 'TakingDamage',
                    TAKE_STUN: 'Stunned',
                    DEATH: 'Dying',
                },
            },
            TakingDamage: {
                entry: {
                    type: 'xstate.assign',
                    assignment: {},
                },
                after: {
                    1000: 'validating',
                },
            },
            validating: {
                invoke: {
                    id: 'HPValidator',
                    onDone: {
                        target: 'Idle',
                    },
                    onError: {
                        target: 'Dying',
                    },
                },
            },
            Stunned: {
                after: {
                    1000: 'Idle',
                },
            },
            Dying: {
                type: 'final',
            },
        },
        context: {
            initialHP: 100,
            currentHP: 100,
        },
    };
};

export const baseOneShotActions = [
    'Using1stAbility',
    'Using2ndAbility',
    'Using3rdAbility',
    'Using4thAbility',
    'TakingDamage',
    'Stunned',
    'Dying',
];

export const baseLoopableActions = ['Idle', 'Running'];

export const baseSkills = baseOneShotActions.filter((skill) =>
    skill.startsWith('Using')
);

// @ts-ignore
export const BaseEntityMachine = createMachine(getBaseMachineInput());
