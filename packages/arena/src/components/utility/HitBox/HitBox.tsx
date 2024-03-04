import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { FC } from 'react';

export const HitBox: FC<{
    FSMSkill: 'Use skill 1' | 'Use skill 2' | 'Use skill 3' | 'Use skill 4';
    sender: string;
    ignoredEntities: string[];
    colliderDimensions: [number, number, number];
    colliderPosition: [number, number, number];
}> = ({ FSMSkill, sender, colliderDimensions, colliderPosition }) => {
    return (
        <group>
            <RigidBody
                name={`${FSMSkill}|${sender}`}
                position={colliderPosition}
                colliders={false}
                lockRotations={true}
                gravityScale={0}
                type="fixed"
            >
                <CuboidCollider args={colliderDimensions} />
            </RigidBody>
        </group>
    );
};

// onIntersectionEnter={({ other: { rigidBodyObject } }) => {
//     if (
//         !rigidBodyObject?.name ||
//         ignoredEntities.includes(rigidBodyObject.name)
//     ) {
//         return;
//     }

//     // if (
//     //     rigidBodyObject?.name === 'Player' &&
//     //     params.teamName === 'Zombie'
//     // ) {
//     //     // @ts-ignore
//     //     params.send({
//     //         type: 'PLAYER_REACHABLE_CHANGE',
//     //         reachable: true,
//     //     });
//     //     if (Math.random() > 0.5) {
//     //         params.send('TAUNT');
//     //     }
//     // }
// }}
