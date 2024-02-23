import { createMachine } from 'xstate';
import { BaseMachineInput, baseOneShotActions } from './BaseEntityMachine';

export const actions = {
    Idle: {
        animation:{
            name:"Idle",
            duration: Infinity,
        }
    },
    Running: {
        animation:{
            name:"Running",
            duration: Infinity,
        }
    },
    Using1stAbility: {
        animation:{
            name:"CrossPunching",
            duration: 1000,
        }
    },
    Using2ndAbility: {
        animation:{
            name:"Kicking",
            duration: 1000,
        },
        effect: "STUN"
    },
    Using3rdAbility: {
        animation:{
            name:"SidePunching",
            duration: 1000,
        }
    },
    Using4thAbility: {
        animation:{
            name:"Slamming",
            duration: 1000,
        },
        effect: "AOE"
    },
    Dying: {
        animation:{
            name:"Dying",
            duration: 2000,
        },
    },
    TakingDamage: {
        animation:{
            name:"TakingDamage",
            duration: 1000,
        },
    },
    Stunned: {
        animation:{
            name:"Stunned",
            duration: 1000,
        },
    },
};

const MutantMachineInput = {...BaseMachineInput};

for (const action of baseOneShotActions) {
  // @ts-ignore
  MutantMachineInput.states[action].after = actions[action].duration;
}

// @ts-ignore
export const MutantMachine = createMachine(MutantMachineInput);