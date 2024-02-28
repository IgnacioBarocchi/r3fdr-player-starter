import { createMachine } from 'xstate';

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


export const machine = createMachine({
    context: {
        initialHP: 100,
        currentHP: 100,
    },
    id: 'SuperType',
    initial: 'Idle',
    states: {
        Idle: {
            on: {
                use_skill_1: {
                    target: 'Use skill 1',
                },
                use_skill_2: {
                    target: 'Use skill 2',
                },
                use_skill_3: {
                    target: 'Use skill 3',
                },
                use_skill_4: {
                    target: 'Use skill 4',
                },
                engage: {
                    target: 'Engage',
                },
                move: {
                    target: 'Move',
                },
                provoke: {
                    target: 'Provoke',
                },
            },
            description:
                'The character is inactive, awaiting player input or external triggers.',
        },
        'Use skill 1': {
            entry: {
                type: 'xstate.assign',
                assignment: {},
            },
            after: {
                1000: 'Idle',
            },
            description: 'The character is using their first skill.',
        },
        'Use skill 2': {
            entry: {
                type: 'xstate.assign',
                assignment: {},
            },
            after: {
                1000: 'Idle',
            },
            description: 'The character is using their second skill.',
        },
        'Use skill 3': {
            entry: {
                type: 'xstate.assign',
                assignment: {},
            },
            after: {
                1000: 'Idle',
            },
            description: 'The character is using their third skill.',
        },
        'Use skill 4': {
            entry: {
                type: 'xstate.assign',
                assignment: {},
            },
            after: {
                1000: 'Idle',
            },
            description: 'The character is using their fourth skill.',
        },
        Engage: {
            on: {
                idle: {
                    target: 'Idle',
                },
                move: {
                    target: 'Move',
                },
                provoke: {
                    target: 'Provoke',
                },
                death: {
                    target: 'Death',
                },
            },
            description: 'The character is actively engaging in combat.',
        },
        Move: {
            on: {
                idle: {
                    target: 'Idle',
                },
                engage: {
                    target: 'Engage',
                },
                provoke: {
                    target: 'Provoke',
                },
                death: {
                    target: 'Death',
                },
            },
            description: 'The character is moving to a new position.',
        },
        Provoke: {
            on: {
                idle: {
                    target: 'Idle',
                },
                engage: {
                    target: 'Engage',
                },
                move: {
                    target: 'Move',
                },
                death: {
                    target: 'Death',
                },
            },
            description:
                "The character is provoking an opponent, possibly to alter the opponent's behavior or strategy.",
        },
        'React to skill 1': {
            on: {
                idle: {
                    target: 'Idle',
                },
                engage: {
                    target: 'Engage',
                },
                move: {
                    target: 'Move',
                },
                provoke: {
                    target: 'Provoke',
                },
                death: {
                    target: 'Death',
                },
            },
            description:
                'The character is reacting to the use of skill 1, possibly by an opponent.',
        },
        Death: {
            type: 'final',
            description:
                'The character has died and is no longer active in the game.',
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
        }
    },
}).withConfig({});
