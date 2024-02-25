import {
    CapsuleCollider as Bounding,
    RigidBody,
    CylinderCollider as Sensor,
} from '@react-three/rapier';

import Mutant3DModel from './Mutant3DModel';
import { usePlayerLogic } from '../../hooks/usePlayerLogic/usePlayerLogic';
import { useRigidBodyColliderHandler } from '../../hooks/useRigidBodyColliderHandler/useRigidBodyColliderHandler';
import { Context } from '../../providers/PlayerProvider/PlayerProvider';
import { FC } from 'react';
import { HitBox } from '../utility/HitBox/HitBox';
import { MutantHitBoxes } from '../utility/HitBox/hitBoxes';
import { Text } from '@react-three/drei';

const Player: FC<{
    useOrbitControls: boolean;
    teamName: 'Zombie' | 'Mutant';
}> = ({ useOrbitControls, teamName }) => {
    const [state, send] = Context.useActor();

    const { playerBody } = usePlayerLogic(useOrbitControls);

    const { onCollisionEnter } = useRigidBodyColliderHandler({
        send,
        teamName,
    });

    if (state.matches('Dying') && state.context.currentHP >= 0) {
        return <></>;
    }
    
    return (
        <RigidBody
        lockRotations={true}
        colliders={false}
        ref={playerBody}
        name="Player"
        >
            <Bounding
                args={[0.2, 0.6]}
                position={[0, 0.8, 0.2]}
                onCollisionEnter={onCollisionEnter}
            />
            <Sensor args={[0.2, 2]} position={[0, 0.5, 0]} sensor />
            <Mutant3DModel />
            <HitBox
                stateValue={state.value}
                hitBoxesRecords={MutantHitBoxes}
                teamName={teamName}
            />
        </RigidBody>
    );
};

export default Player;
