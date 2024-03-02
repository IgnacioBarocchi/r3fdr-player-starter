import { RigidBodyProps } from '@react-three/rapier';
import { states as mutantStates} from '../../../Machines/MutantMachine';
import { states as zombieStates} from '../../../Machines/ZombieMachine';

export type RigibBodyWithColliderProps = {
    rigidBody: Partial<RigidBodyProps>;
    size: number;
};

export type HitBoxesRecords = { [x: string]: RigibBodyWithColliderProps }

export const MutantHitBoxes: HitBoxesRecords = {
    'Use skill 1': {
        rigidBody: {
            name: mutantStates['Use skill 1'].animation.name,
            type: 'fixed',
            position: [0, 1.25, 1.2],
            density: 1000,
        },
        size: 0.3,
    },
    'Use skill 2': {
        rigidBody: {
            name: mutantStates['Use skill 2'].animation.name,
            type: 'fixed',
            position: [0, 1.25, 2],
            density: 1000,
        },
        size: 0.3,
    },
    'Use skill 3': {
        rigidBody: {
            name: mutantStates['Use skill 3'].animation.name,
            type: 'fixed',
            position: [0, 1.25, 2],
            density: 1000,
        },
        size: 0.3,
    },
    'Use skill 4': {
        rigidBody: {
            name: mutantStates['Use skill 4'].animation.name,
            type: 'fixed',
            position: [0, 0.5, 5],
            density: 1000,
        },
        size: 0.3,
    },
};

export const ZombieHitBoxes: HitBoxesRecords = {
    Using1stSkill: {
        rigidBody: {
            name: zombieStates.Using1stSkill.animation.name,
            type: 'fixed',
            position: [0, 1.25, .9],
            density: 1000,
        },
        size: 0.3,
    },
    Using2ndSkill: {
        rigidBody: {
            name: zombieStates.Using2ndSkill.animation.name,
            type: 'fixed',
            position: [0, 1.25, .9],
            density: 1000,
        },
        size: 0.3,
    },
    Using3rdSkill: {
        rigidBody: {
            name: zombieStates.Using3rdSkill.animation.name,
            type: 'fixed',
            position: [0, 1.25, .9],
            density: 1000,
        },
        size: 0.3,
    },
    Using4thSkill: {
        rigidBody: {
            name: zombieStates.Using4thSkill.animation.name,
            type: 'fixed',
            position: [0, 0.5, .9],
            density: 1000,
        },
        size: 0.3,
    },
};