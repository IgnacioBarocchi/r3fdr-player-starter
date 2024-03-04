import { createMachine } from 'xstate';
import { MachineStates } from './BaseEntityMachine';
import { getMachineInput } from './base2';

export const states: MachineStates = {
    Idle: {
        animation: {
            name: 'Saber And Pistol Idle - Idle',
            duration: Infinity,
        },
    },
    Move: {
        animation: {
            name: 'Saber And Pistol Run - Move',
            duration: Infinity,
        },
    },
    'Use skill 1': {
        animation: {
            name: 'Saber And Pistol Slash - Use skill 1',
            duration: 1016.66,
        },
    },
    'Use skill 2': {
        animation: {
            name: 'Saber And Pistol Kick - Use skill 2',
            duration: 1200,
        },
        effect: 'STUN',
    },
    'Use skill 3': {
        animation: {
            name: 'Sprinting Forward Roll - Use skill 3',
            duration: 1766.66,
        },
    },
    'Use skill 4': {
        animation: {
            name: 'Shooting - Use skill 4',
            duration: 2383.33,
        },
        effect: 'AOE',
    },
    // todo this
    Dying: {
        animation: {
            name: 'Falling Back Death - Death',
            duration: 2283.33,
        },
    },
    'React to skill 1': {
        animation: {
            name: 'Saber And Pistol Impact - React to skill 1',
            duration: 1333.33,
        },
    },
    'React to skill 2': {
        animation: {
            name: 'Saber And Pistol Taking Stun - React to skill 2',
            duration: 2150,
        },
    },
};

// @ts-ignore
export const MutantMachine = createMachine(
    // @ts-ignore
    getMachineInput(
        'Player',
        'a player',
        new Map([
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
        ])
    )
);