import { assign, createMachine } from 'xstate';
import {
    MachineStates,
    baseOneShotActions,
    getBaseMachineInput,
    getHPValidator,
} from './BaseEntityMachine';
import { getMachineInput } from './base2';


const actionDurationByStateKey: Map<NonLoopableStates, number> = new Map([
    ['Use skill 1', 1016.66],
    ['Use skill 2', 1200],
    ['Use skill 3', 1766.66],
    ['Use skill 4', 2383.33],
    ['React to skill 1', 1333.33],
    ['React to skill 2', 2150],
    ['React to skill 3', 1333.33],
    ['React to skill 4', 1333.33],
    ['Engage', 1000],
    ['Provoke', 1000],
    ['Death', 2283.33],
]);

const input = getMachineInput(actionDurationByStateKey)

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
    Using1stSkill: {
        animation: {
            name: 'CrossPunching',
            duration: 1016.66,
        },
    },
    Using2ndSkill: {
        animation: {
            name: 'Kicking',
            duration: 1200,
        },
        effect: 'STUN',
    },
    Using3rdSkill: {
        animation: {
            name: 'SidePunching',
            duration: 1766.66,
        },
    },
    Using4thSkill: {
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

const HPValidator = getHPValidator(200);
const MutantMachineInput = getBaseMachineInput();

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
    after: {
        1000: 'validating',
    },
    entry: assign({
        currentHP: (context: { currentHP: number }) => {
            return context.currentHP - 20;
        },
    }),
};

MutantMachineInput.id = "Player"
// @ts-ignore
export const MutantMachine = createMachine(MutantMachineInput);
