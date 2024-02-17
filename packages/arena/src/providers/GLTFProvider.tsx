import { FC } from 'react';
import { RobotGLTFResult } from '../components/Entities/Robot/types/Robot3DModel';
import { useGLTF } from '@react-three/drei';

export const EntityModel = {
    // Robot: "/models/Robot.glb",
    Drone: { path: '/models/Drone.gltf', actionRecords: [] },
    Mutant: {
        path: '/models/Mutant.gltf',
        actionRecords: [
            {
                animationName: 'Idle',
                isIdle: true,
            },
            {
                animationName: 'Running',
                isMove: true,
            },
            {
                animationName: 'TackingDamage',
                isTakingDamage: true,
            },
            {
                animationName: 'Stunned',
                isTakingStun: true,
            },
            {
                animationName: 'Dying',
                isFinal: true,
            },
            {
                animationName: 'CrossPunching',
                // duration: 1000,
            },
            {
                animationName: 'Kicking',
                // duration: 1000,
            },
            {
                animationName: 'SidePunching',
                // duration: 1000,
            },
            {
                animationName: 'Slamming',
                // duration: 1000,
            },
        ],
    },
    Zombie: {
        path: '/models/Zombie.gltf',
        actionRecords: [
            {
                animationName: 'Idle',
                isIdle: true,
            },
            {
                animationName: 'Running',
                isMove: true,
            },
            {
                animationName: 'TackingDamage',
                isTakingDamage: true,
            },
            {
                animationName: 'Stunned',
                isTakingStun: true,
            },
            {
                animationName: 'Dying',
                isFinal: true,
            },
            {
                // punching is missing
                animationName: 'Attacking1',
                // duration: 1000,
            },
            {
                animationName: 'Attacking1',
                // duration: 1000,
            },
            {
                animationName: 'Attacking2',
                // duration: 1000,
            },
            {
                animationName: 'Attacking3',
                // duration: 1000,
            },
        ],
    },
} as const;

const GLTFFileProvider: FC<{
    children: React.ReactNode | JSX.Element;
    modelURL: keyof typeof EntityModel;
}> = (children, modelURL): JSX.Element => {
    // the reason of the destructurting is the dependency inversion
    const { nodes, materials, animations } = useGLTF(
        modelURL
    ) as RobotGLTFResult;
    // @ts-ignore
    return children(nodes, materials, animations);
};

export default GLTFFileProvider;
