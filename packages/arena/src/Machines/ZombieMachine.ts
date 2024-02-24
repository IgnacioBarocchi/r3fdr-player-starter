import { EventObject, assign, createMachine } from 'xstate';
import {
    BaseMachineInput,
    MachineStates,
    baseOneShotActions,
} from './BaseEntityMachine';

export const states: MachineStates = {
    Idle: {
        animation: {
            name: 'Idle',
            duration: 1000,
        },
    },
    Running: {
        animation: {
            name: 'Running',
            duration: 1000,
        },
    },
    Using1stAbility: {
        animation: {
            name: 'Attacking1',
            duration: 1000,
        },
    },
    Using2ndAbility: {
        animation: {
            name: 'Attacking2',
            duration: 1000,
        },
        effect: 'STUN',
    },
    Using3rdAbility: {
        animation: {
            name: 'Attacking3',
            duration: 1000,
        },
    },
    Using4thAbility: {
        animation: {
            name: 'Attacking3',
            duration: 1000,
        },
        effect: 'AOE',
    },
    Dying: {
        animation: {
            name: 'Dying',
            duration: 1000,
        },
    },
    TakingDamage: {
        animation: {
            name: 'TakingDamage',
            duration: 1000,
        },
    },
    Stunned: {
        animation: {
            name: 'Stunned',
            duration: 1000,
        },
    },
};

const HPValidator =  (context: { currentHP: number }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (context.currentHP) {
                resolve(true);
            } else {
                reject(`Error entity is dead ${context.currentHP} `);
            }
        }, 200);
    });
}

const ZombieMachineInput = { ...BaseMachineInput };

for (const action of baseOneShotActions) {
    // @ts-ignore
    ZombieMachineInput.states[action] = {
        // @ts-ignore
        after: { [states[action].animation.duration]: 'Idle' },
    };
}

ZombieMachineInput.states.validating = {
    invoke: {
        id: 'HPValidator',
        // @ts-ignore
        src: HPValidator,
        onDone: {
            target: states.Idle.animation.name,
        },
        onError: {
            target: states.Dying.animation.name,
        },
    },
};

ZombieMachineInput.states.Dying = {
    type: 'final',
};

ZombieMachineInput.states.TakingDamage = {
    ...ZombieMachineInput.states.TakingDamage,
    after: {
        1000: "validating"
    },
    entry: assign({
        currentHP: (context: { currentHP: number }) => {
            return context.currentHP - 20;
        },
    }),
};

ZombieMachineInput.context = {
    ...ZombieMachineInput.context,
    initialHP: 20,
    currentHP: 20,
    // @ts-ignore
    playerIsTargeted: false,
};

// @ts-ignore
ZombieMachineInput.on = {
    PLAYER_REACHABLE_CHANGE: {
        actions: assign(
            (context, event: EventObject & { reachable: boolean }) => {
                return {
                    ...context,
                    playerIsReachable: event.reachable,
                };
            }
        ),
    },
};

ZombieMachineInput.id = 'Zombie';
console.log(ZombieMachineInput)

// @ts-ignore
export const ZombieMachine = createMachine(ZombieMachineInput);
