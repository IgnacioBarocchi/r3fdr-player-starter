import { assign, createMachine } from 'xstate';
import {
    BaseMachineInput,
    MachineStates,
    baseOneShotActions,
    getHPValidator,
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

const HPValidator = getHPValidator();
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
    entry: assign({
        currentHP: (context: { currentHP: number }) => {
            return context.currentHP - 20;
        },
    }),
};

ZombieMachineInput.context = {
    ...ZombieMachineInput.context,
    // @ts-ignore
    playerIsTargeted: false,
};

ZombieMachineInput.id = "Zombie";

// @ts-ignore
export const ZombieMachine = createMachine(ZombieMachineInput);
