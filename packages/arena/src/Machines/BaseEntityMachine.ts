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

// export const getBaseMachineInput = () => {
//     return {
//         predictableActionArguments: true,
//         id: 'BaseMachine',
//         initial: 'Idle',
//         states: {
//             Idle: {
//                 on: {
//                     MOVE: 'Running',
//                     SKILL_1: 'Using1stSkill',
//                     SKILL_2: 'Using2ndSkill',
//                     SKILL_3: 'Using3rdSkill',
//                     SKILL_4: 'Using4thSkill',
//                     // REACT_TO_SKILL_1:"ReactingTo1stSkill",
//                     // REACT_TO_SKILL_2:"ReactingTo2ndSkill",
//                     // REACT_TO_SKILL_3:"ReactingTo3rdSkill",
//                     // REACT_TO_SKILL_4:"ReactingTo4thSkill",
//                     // ENGAGE: "Engaging",
//                     FALL: 'Stunned',
//                     TAKE_DAMAGE: 'TakingDamage',
//                     TAKE_STUN: 'Stunned',
//                     DEATH: 'Dying',
//                 },
//             },
//             Using1stSkill: {
//                 after: {
//                     1000: 'Idle',
//                 },
//             },
//             Using2ndSkill: {
//                 after: {
//                     1000: 'Idle',
//                 },
//             },
//             Using3rdSkill: {
//                 after: {
//                     1000: 'Idle',
//                 },
//             },
//             Using4thSkill: {
//                 after: {
//                     1000: 'Idle',
//                 },
//             },
//             Running: {
//                 on: {
//                     IDLE: 'Idle',
//                     MOVE: 'Running',
//                     SKILL_1: 'Using1stSkill',
//                     SKILL_2: 'Using2ndSkill',
//                     SKILL_3: 'Using3rdSkill',
//                     SKILL_4: 'Using4thSkill',
//                     // REACT_TO_SKILL_1:"ReactingTo1stSkill",
//                     // REACT_TO_SKILL_2:"ReactingTo2ndSkill",
//                     // REACT_TO_SKILL_3:"ReactingTo3rdSkill",
//                     // REACT_TO_SKILL_4:"ReactingTo4thSkill",
//                     // ENGAGE: "Engaging",
//                     TAKE_DAMAGE: 'TakingDamage',
//                     TAKE_STUN: 'Stunned',
//                     DEATH: 'Dying',
//                 },
//             },
//             TakingDamage: {
//                 entry: {
//                     type: 'xstate.assign',
//                     assignment: {},
//                 },
//                 after: {
//                     1000: 'validating',
//                 },
//             },
//             validating: {
//                 invoke: {
//                     id: 'HPValidator',
//                     onDone: {
//                         target: 'Idle',
//                     },
//                     onError: {
//                         target: 'Dying',
//                     },
//                 },
//             },
//             Stunned: {
//                 after: {
//                     1000: 'Idle',
//                 },
//             },
//             Dying: {
//                 type: 'final',
//             },
//         },
//         context: {
//             initialHP: 100,
//             currentHP: 100,
//         },
//     };
// };

export const baseOneShotActions = [
    'Using1stSkill',
    'Using2ndSkill',
    'Using3rdSkill',
    'Using4thSkill',
    'TakingDamage',
    'Stunned',
    'Dying',
];

export const baseLoopableActions = ['Idle', 'Running'];

// export const baseSkills = baseOneShotActions.filter((skill) =>
//     skill.startsWith('Using')
// );

export const baseSkills = ["Use skill 1", 'Use skill 2', 'Use skill 3', 'Use skill 4'];

// @ts-ignore
// export const BaseEntityMachine = createMachine(getBaseMachineInput());
