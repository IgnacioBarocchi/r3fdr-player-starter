import { RigidBodyProps } from '@react-three/rapier';
import { states as mutantStates} from '../../../Machines/MutantMachine';
import { states as zombieStates} from '../../../Machines/ZombieMachine';

export type RigibBodyWithColliderProps = {
    rigidBody: Partial<RigidBodyProps>;
    size: number;
};

export type HitBoxesRecords = { [x: string]: RigibBodyWithColliderProps }

export const MutantHitBoxes: HitBoxesRecords = {
    Using1stAbility: {
        rigidBody: {
            name: mutantStates.Using1stAbility.animation.name,
            type: 'fixed',
            position: [0, 1.25, 1.2],
            density: 1000,
        },
        size: 0.3,
    },
    Using2ndAbility: {
        rigidBody: {
            name: mutantStates.Using2ndAbility.animation.name,
            type: 'fixed',
            position: [0, 1.25, 2],
            density: 1000,
        },
        size: 0.3,
    },
    Using3rdAbility: {
        rigidBody: {
            name: mutantStates.Using3rdAbility.animation.name,
            type: 'fixed',
            position: [0, 1.25, 2],
            density: 1000,
        },
        size: 0.3,
    },
    Using4thAbility: {
        rigidBody: {
            name: mutantStates.Using4thAbility.animation.name,
            type: 'fixed',
            position: [0, 0.5, 2],
            density: 1000,
        },
        size: 0.3,
    },
};

export const ZombieHitBoxes: HitBoxesRecords = {
    Using1stAbility: {
        rigidBody: {
            name: zombieStates.Using1stAbility.animation.name,
            type: 'fixed',
            position: [0, 1.25, 1.2],
            density: 1000,
        },
        size: 0.3,
    },
    Using2ndAbility: {
        rigidBody: {
            name: zombieStates.Using2ndAbility.animation.name,
            type: 'fixed',
            position: [0, 1.25, 2],
            density: 1000,
        },
        size: 0.3,
    },
    Using3rdAbility: {
        rigidBody: {
            name: zombieStates.Using3rdAbility.animation.name,
            type: 'fixed',
            position: [0, 1.25, 2],
            density: 1000,
        },
        size: 0.3,
    },
    Using4thAbility: {
        rigidBody: {
            name: zombieStates.Using4thAbility.animation.name,
            type: 'fixed',
            position: [0, 0.5, 2],
            density: 1000,
        },
        size: 0.3,
    },
};