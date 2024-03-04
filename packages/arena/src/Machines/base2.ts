/**
 * No usar hooks ni nada relacionado con el ciclo de vida de react.
 * la implemantacion debe ser createMachine(getMachineInput(actionDurationByStateKey)).withConfig({})
 * Se debe ser agnostico a los tipos de skills. pero lo que voy a usar para esta version es skill 1 [ataque rapido]
 * skill 2 stun
 * skill 3 ataque medio
 * skill 4 ataque pesado
 */

export type NonLoopableStates =
    | 'Use skill 1'
    | 'Use skill 2'
    | 'Use skill 3'
    | 'Use skill 4'
    | 'React to skill 1'
    | 'React to skill 2'
    | 'React to skill 3'
    | 'React to skill 4'
    | 'Engage'
    | 'Provoke'
    | 'Death';

const actionDurationByStateKey: Map<NonLoopableStates, number> = new Map([
    ['Use skill 1', 1000],
    ['Use skill 2', 1000],
    ['Use skill 3', 1000],
    ['Use skill 4', 1000],
    ['React to skill 1', 1000],
    ['React to skill 2', 1000],
    ['React to skill 3', 1000],
    ['React to skill 4', 1000],
    ['Engage', 1000],
    ['Provoke', 1000],
    ['Death', 1000],
]);

export type FSMStates =
    | 'Idle'
    | 'Move'
    | 'Use skill 1'
    | 'Use skill 2'
    | 'Use skill 3'
    | 'Use skill 4'
    | 'React to skill 1'
    | 'React to skill 2'
    | 'React to skill 3'
    | 'React to skill 4'
    | 'Engage'
    | 'Provoke'
    | 'Death';

export const getMachineInput = (
    id = 'Base',
    description = 'Super type that respects LSP',
    animationCoolDowns: Map<
        NonLoopableStates,
        number
    > = actionDurationByStateKey
) => {
    const machineInput = {
        context: {
            initialHP: 100,
            currentHP: 100,
        },
        id,
        description,
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
                    [animationCoolDowns.get('Use skill 1') ?? 1000]: 'Idle',
                },
                description: 'The character is using their first skill.',
            },
            'Use skill 2': {
                entry: {
                    type: 'xstate.assign',
                    assignment: {},
                },
                after: {
                    [animationCoolDowns.get('Use skill 2') ?? 1000]: 'Idle',
                },
                description: 'The character is using their second skill.',
            },
            'Use skill 3': {
                entry: {
                    type: 'xstate.assign',
                    assignment: {},
                },
                after: {
                    [animationCoolDowns.get('Use skill 3') ?? 1000]: 'Idle',
                },
                description: 'The character is using their third skill.',
            },
            'Use skill 4': {
                entry: {
                    type: 'xstate.assign',
                    assignment: {},
                },
                after: {
                    [animationCoolDowns.get('Use skill 4') ?? 1000]: 'Idle',
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
                after: {
                    [animationCoolDowns.get('Engage') ?? 1000]: 'Idle',
                },
                description:
                    'The entity is actively engaging in combat. This is used to play taunt animations, add sound effects or head ups animations',
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
                after: {
                    [animationCoolDowns.get('Engage') ?? 1000]: 'Idle',
                },
                description:
                    "The character is provoking an opponent, possibly to alter the opponent's behavior or strategy.",
            },
            'Computing damage': {
                invoke: {
                    src: (context: { currentHP: number }) => {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                if (context.currentHP) {
                                    resolve(true);
                                } else {
                                    reject(
                                        `Error entity is dead ${context.currentHP} `
                                    );
                                }
                            }, 100);
                        });
                    },
                    id: 'HPValidator',
                    onDone: {
                        target: 'Idle',
                    },
                    onError: {
                        target: 'Death',
                    },
                },
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
                after: {
                    1000: 'Computing damage',
                },
                description:
                    'The character is reacting to the use of skill 1, possibly by an opponent.',
            },
            'React to skill 2': {
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
                after: {
                    1000: 'Computing damage',
                },
                description:
                    'The character is reacting to the use of skill 1, possibly by an opponent.',
            },
            'React to skill 3': {
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
                after: {
                    1000: 'Computing damage',
                },
                description:
                    'The character is reacting to the use of skill 1, possibly by an opponent.',
            },
            'React to skill 4': {
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
                after: {
                    1000: 'Computing damage',
                },
                description:
                    'The character is reacting to the use of skill 1, possibly by an opponent.',
            },
            Death: {
                type: 'final',
                description:
                    'The character has died and is no longer active in the game.',
            },
        },
    };

    return machineInput;
};
