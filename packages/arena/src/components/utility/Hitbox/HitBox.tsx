import { BallCollider, RigidBody } from '@react-three/rapier';

import { EntityModel } from '../../../providers/entities';
import { PositionalAudio } from '@react-three/drei';
import { StateValue } from 'xstate';
import { useMemo } from 'react';

export const HitBox = ({
    stateValue,
    entity,
    teamName,
}: {
    stateValue: StateValue;
    entity: (typeof EntityModel)[keyof typeof EntityModel];
    teamName: 'Zombie' | 'Mutant';
}) => {
    const action = useMemo(
        () =>
            // @ts-ignore
            entity.actionRecords.find(
                // @ts-ignore
                ({ animationName, hitBox }) =>
                    animationName === stateValue && hitBox
            ),
        [stateValue, entity]
    );

    if (!action) return null;
    const { rigidBody: rigidBodyProps, size } = action.hitBox;
    return (
        <group>
            <RigidBody
                {...rigidBodyProps}
                name={rigidBodyProps.name + '|' + teamName}
                colliders={false}
                lockRotations={true}
                gravityScale={0}
                shape={'ball'}
            >
                <BallCollider args={[size]} />
            </RigidBody>
            <PositionalAudio
                load
                autoplay
                loop={false}
                distance={1}
                url="/sounds/Robot/kick.mp3"
            />
        </group>
    );
};
