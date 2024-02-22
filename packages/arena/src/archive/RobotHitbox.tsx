import { FC } from 'react';
import Hitbox from '../../utility/Hitbox/Hitbox';
import { Hitboxes } from '../lib/object3DHelper';
// import { PlayerMachineStateValues } from "../../../hooks/usePlayerLogic/getPlayerMachine";
import { PositionalAudio } from '@react-three/drei';
import { StateValue } from 'xstate';

const PunchCollider = () => {
    return (
        <Hitbox
            rigidBodyProps={{
                name: Hitboxes.FIST,
                position: [0, 1.25, 1.2],
                density: 1000,
                // type: 'fixed',
            }}
            physical={true}
            shape={'ball'}
            boundingSize={0.3}
        />
    );
};

const KickCollider = () => {
    return (
        <Hitbox
            rigidBodyProps={{
                name: Hitboxes.FOOT,
                position: [0, 1.25, 2],
                density: 1000,
                // type: 'fixed',
            }}
            physical={true}
            shape={'ball'}
            boundingSize={0.3}
        />
    );
};

const RobotHitbox: FC<RobotHitboxProps> = ({ state }) => {
    if (state === 'CrossPunching')
        return (
            <>
                <PunchCollider />
                <PositionalAudio
                    load
                    autoplay
                    loop={false}
                    distance={1}
                    url="/sounds/Robot/kick.mp3"
                />
            </>
        );

    if (state === 'SidePunching')
        return (
            <>
                <KickCollider />
                <PositionalAudio
                    load
                    autoplay
                    loop={false}
                    distance={1}
                    url="/sounds/Robot/kick.mp3"
                />
            </>
        );

    return null;
};

export default RobotHitbox;

interface HitboxColliderProps {
    orientation: number;
}

interface RobotHitboxProps extends HitboxColliderProps {
    state: StateValue;
}
