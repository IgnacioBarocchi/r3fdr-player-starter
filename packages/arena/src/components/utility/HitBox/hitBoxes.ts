import { RigidBodyProps } from '@react-three/rapier';
import { states } from '../../../Machines/MutantMachine';

export type RigibBodyWithColliderProps = {
    rigidBody: Partial<RigidBodyProps>;
    size: number;
};

export type HitBoxesRecords = { [x: string]: RigibBodyWithColliderProps }

export const MutantHitBoxes: HitBoxesRecords = {
    Using1stAbility: {
        rigidBody: {
            name: states.Using1stAbility.animation.name,
            type: 'fixed',
            position: [0, 1.25, 1.2],
            density: 1000,
        },
        size: 0.3,
    },
    Using2ndAbility: {
        rigidBody: {
            name: states.Using2ndAbility.animation.name,
            type: 'fixed',
            position: [0, 1.25, 2],
            density: 1000,
        },
        size: 0.3,
    },
    Using3rdAbility: {
        rigidBody: {
            name: states.Using3rdAbility.animation.name,
            type: 'fixed',
            position: [0, 1.25, 2],
            density: 1000,
        },
        size: 0.3,
    },
    Using4thAbility: {
        rigidBody: {
            name: states.Using4thAbility.animation.name,
            type: 'fixed',
            position: [0, 0.5, 2],
            density: 1000,
        },
        size: 0.3,
    },
};
