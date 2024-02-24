import { assign, createMachine } from 'xstate';
import {
    BaseMachineInput,
    baseOneShotActions,
    getHPValidator,
} from './BaseEntityMachine';

export type MachineStates = {
    [state: string]: {
        animation: { name: string; duration: number };
        effect?: 'STUN' | 'AOE';
    };
};

export const states: MachineStates = {
    Idle: {
        animation: {
            name: 'Idle',
            duration: Infinity,
        },
    },
    Running: {
        animation: {
            name: 'Running',
            duration: Infinity,
        },
    },
    Using1stAbility: {
        animation: {
            name: 'CrossPunching',
            duration: 1016.66,
        },
    },
    Using2ndAbility: {
        animation: {
            name: 'Kicking',
            duration: 1200,
        },
        effect: 'STUN',
    },
    Using3rdAbility: {
        animation: {
            name: 'SidePunching',
            duration: 1766.66,
        },
    },
    Using4thAbility: {
        animation: {
            name: 'Slamming',
            duration: 2383.33,
        },
        effect: 'AOE',
    },
    Dying: {
        animation: {
            name: 'Dying',
            duration: 2283.33,
        },
    },
    TakingDamage: {
        animation: {
            name: 'TakingDamage',
            duration: 1333.33,
        },
    },
    Stunned: {
        animation: {
            name: 'Stunned',
            duration: 2150,
        },
    },
};

const HPValidator = getHPValidator();
const MutantMachineInput = { ...BaseMachineInput };

for (const action of baseOneShotActions) {
    // @ts-ignore
    MutantMachineInput.states[action] = {
        // @ts-ignore
        after: { [states[action].animation.duration]: 'Idle' },
    };
}

MutantMachineInput.states.validating = {
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

MutantMachineInput.states.Dying = {
    type: 'final',
};

MutantMachineInput.states.TakingDamage = {
    ...MutantMachineInput.states.TakingDamage,
    entry: assign({
        currentHP: (context: { currentHP: number }) => {
            return context.currentHP - 20;
        },
    }),
};
console.log(MutantMachineInput);

// @ts-ignore
export const MutantMachine = createMachine(MutantMachineInput);
