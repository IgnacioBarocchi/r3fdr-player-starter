import { BallCollider, CuboidCollider, RigidBody } from '@react-three/rapier';

import { PositionalAudio } from '@react-three/drei';
import { StateValue } from 'xstate';
import { HitBoxesRecords } from './hitBoxes';

export const HitBox = ({
    stateValue,
    hitBoxesRecords,
    teamName,
}: {
    stateValue: StateValue;
    hitBoxesRecords: HitBoxesRecords;
    teamName: 'Zombie' | 'Mutant';
}) => {
    const record = hitBoxesRecords[stateValue as string];

    if (!record) {
        return null;
    }

    const { rigidBody: rigidBodyProps, size } =
        hitBoxesRecords[stateValue as string];

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
                {/* <BallCollider args={[size]} /> */}
                <CuboidCollider sensor args={[.2, .2, 5]} />
            </RigidBody>
            <PositionalAudio
                load
                autoplay
                loop={false}
                distance={1}
                url="/sounds/Entity/kick.mp3"
            />
        </group>
    );
};
