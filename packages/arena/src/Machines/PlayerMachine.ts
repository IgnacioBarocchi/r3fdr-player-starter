import { createMachine } from 'xstate';
import { getMachineInput } from './base2';

const DURATION_INFINITY = Infinity;
const DURATION_IDLE = DURATION_INFINITY;
const DURATION_USE_SKILL_1 = 1016.66;
const DURATION_USE_SKILL_2 = 1200;
const DURATION_USE_SKILL_3 = 1766.66;
const DURATION_USE_SKILL_4 = 2383.33;
const DURATION_REACT_SKILL_1 = 1333.33;
const DURATION_REACT_SKILL_2 = 2150;
const DURATION_REACT_SKILL_3 = 1333.33;
const DURATION_REACT_SKILL_4 = 1333.33;
const DURATION_ENGAGE = 1000;
const DURATION_PROVOKE = 1000;
const DURATION_DEATH = 2283.33;

const ANIMATION_IDLE = 'Saber And Pistol Idle - Idle';
const ANIMATION_RUN = 'Saber And Pistol Run - Move';
const ANIMATION_SLASH = 'Saber And Pistol Slash - Use skill 1';
const ANIMATION_KICK = 'Saber And Pistol Kick - Use skill 2';
const ANIMATION_ROLL = 'Sprinting Forward Roll - Use skill 3';
const ANIMATION_SHOOT = 'Shooting - Use skill 4';
const ANIMATION_DEATH = 'Falling Back Death - Death';
const ANIMATION_IMPACT = 'Saber And Pistol Impact - React to skill 1';
const ANIMATION_STANDING_IMPACT =
    'Standing React Large From Left - React to skill 3';
const ANIMATION_PISTOL_IMPACT = 'Sword And Shield Impact - React to skill 4';
const ANIMATION_STUN = 'Saber And Pistol Taking Stun - React to skill 2';
const ANIMATION_ENGAGE = 'Saber And Pistol Taking Stun - React to skill 2';
const ANIMATION_PROVOKE = 'Saber And Pistol Taking Stun - React to skill 2';

export const animationDurationByAnimationName = new Map([
    [ANIMATION_IDLE, DURATION_IDLE],
    [ANIMATION_RUN, DURATION_IDLE],
    [ANIMATION_SLASH, DURATION_USE_SKILL_1],
    [ANIMATION_KICK, DURATION_USE_SKILL_2],
    [ANIMATION_ROLL, DURATION_USE_SKILL_3],
    [ANIMATION_SHOOT, DURATION_USE_SKILL_4],
    [ANIMATION_DEATH, DURATION_DEATH],
    [ANIMATION_IMPACT, DURATION_REACT_SKILL_1],
    [ANIMATION_STUN, DURATION_REACT_SKILL_2],
    [ANIMATION_STUN, DURATION_REACT_SKILL_3],
    [ANIMATION_STUN, DURATION_REACT_SKILL_4],
]);

export const animationNameByState = new Map([
    ['Idle', ANIMATION_IDLE],
    ['Move', ANIMATION_RUN],
    ['Use skill 1', ANIMATION_SLASH],
    ['Use skill 2', ANIMATION_KICK],
    ['Use skill 3', ANIMATION_ROLL],
    ['Use skill 4', ANIMATION_SHOOT],
    ['React to skill 1', ANIMATION_IMPACT],
    ['React to skill 2', ANIMATION_STUN],
    ['React to skill 3', ANIMATION_STANDING_IMPACT],
    ['React to skill 4', ANIMATION_PISTOL_IMPACT],
    ['Engage', ANIMATION_ENGAGE],
    ['Provoke', ANIMATION_PROVOKE],
    ['Death', ANIMATION_DEATH],
]);

export const soundPathByState = new Map([
    ['Use skill 1', '/sounds/Entity/kick.mp3'],
    ['Use skill 2', '/sounds/Entity/kick.mp3'],
    ['Use skill 3', '/sounds/Entity/kick.mp3'],
    ['Use skill 4', '/sounds/Entity/kick.mp3'],
    ['React to skill 1', '/sounds/Entity/kick.mp3'],
    ['React to skill 2', '/sounds/Entity/kick.mp3'],
    ['React to skill 3', '/sounds/Entity/kick.mp3'],
    ['React to skill 4', '/sounds/Entity/kick.mp3'],
    ['Engage', '/sounds/Entity/kick.mp3'],
    ['Provoke', '/sounds/Entity/kick.mp3'],
    ['Death', '/sounds/Entity/kick.mp3'],
]);

export const PlayerFSM = createMachine(
    // @ts-ignore
    getMachineInput(
        'Player',
        'a player',
        new Map([
            ['Use skill 1', DURATION_USE_SKILL_1],
            ['Use skill 2', DURATION_USE_SKILL_2],
            ['Use skill 3', DURATION_USE_SKILL_3],
            ['Use skill 4', DURATION_USE_SKILL_4],
            ['React to skill 1', DURATION_REACT_SKILL_1],
            ['React to skill 2', DURATION_REACT_SKILL_2],
            ['React to skill 3', DURATION_REACT_SKILL_3],
            ['React to skill 4', DURATION_REACT_SKILL_4],
            ['Engage', DURATION_ENGAGE],
            ['Provoke', DURATION_PROVOKE],
            ['Death', DURATION_DEATH],
        ])
    )
);

// export const states: MachineStates = {
//     Idle: {
//         animation: {
//             name: 'Saber And Pistol Idle - Idle',
//             duration: Infinity,
//         },
//     },
//     Move: {
//         animation: {
//             name: 'Saber And Pistol Run - Move',
//             duration: Infinity,
//         },
//     },
//     'Use skill 1': {
//         animation: {
//             name: 'Saber And Pistol Slash - Use skill 1',
//             duration: 1016.66,
//         },
//     },
//     'Use skill 2': {
//         animation: {
//             name: 'Saber And Pistol Kick - Use skill 2',
//             duration: 1200,
//         },
//         effect: 'STUN',
//     },
//     'Use skill 3': {
//         animation: {
//             name: 'Sprinting Forward Roll - Use skill 3',
//             duration: 1766.66,
//         },
//     },
//     'Use skill 4': {
//         animation: {
//             name: 'Shooting - Use skill 4',
//             duration: 2383.33,
//         },
//         effect: 'AOE',
//     },
//     // todo this
//     Dying: {
//         animation: {
//             name: 'Falling Back Death - Death',
//             duration: 2283.33,
//         },
//     },
//     'React to skill 1': {
//         animation: {
//             name: 'Saber And Pistol Impact - React to skill 1',
//             duration: 1333.33,
//         },
//     },
//     'React to skill 2': {
//         animation: {
//             name: 'Saber And Pistol Taking Stun - React to skill 2',
//             duration: 2150,
//         },
//     },
// };
