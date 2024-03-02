import {
    CapsuleCollider as Bounding,
    RigidBody,
    CylinderCollider as Sensor,
} from '@react-three/rapier';

import { usePlayerLogic } from '../../hooks/usePlayerLogic/usePlayerLogic';
import { useRigidBodyColliderHandler } from '../../hooks/useRigidBodyColliderHandler/useRigidBodyColliderHandler';
import { Context } from '../../providers/PlayerProvider/PlayerProvider';
import { FC, useEffect } from 'react';
import { HitBox } from '../utility/HitBox/HitBox';
import { MutantHitBoxes } from '../utility/HitBox/hitBoxes';
import { Footsteps } from '../../containers/scenarios/Level/Footsteps';
import { useGameStore } from '../../hooks/useGameStore/useGameStore';

const Player: FC<{
    useOrbitControls: boolean;
    teamName: 'Zombie' | 'Mutant';
    Model: FC<{ stateValue: StateValue }>;
}> = ({ useOrbitControls, teamName, Model }) => {
    const [state, send] = Context.useActor();
    
    const { setPlayerRigidBody } = useGameStore((state) => ({
        playerState: state.playerState,
        setPlayerRigidBody: state.setPlayerRigidBody,
    }));

    const { playerRigidBodyReference } = usePlayerLogic(useOrbitControls);

    const { onCollisionEnter } = useRigidBodyColliderHandler({
        send,
        teamName,
    });

    useEffect(() => {
        if (playerRigidBodyReference?.current) {
            setPlayerRigidBody(playerRigidBodyReference?.current);
        }
    }, []);

    if (state.matches('Death') && state.context.currentHP >= 0) {
        return <></>;
    }

    return (
        <RigidBody
            lockRotations={true}
            colliders={false}
            ref={playerRigidBodyReference}
            name="Player"
        >
            <Bounding
                args={[0.2, 0.6]}
                position={[0, 0.8, 0.2]}
                onCollisionEnter={onCollisionEnter}
            />
            <Sensor args={[0.2, 2]} position={[0, 0.5, 0]} sensor />
            <Model stateValue={state.value} />
            <HitBox
                stateValue={state.value}
                hitBoxesRecords={MutantHitBoxes}
                teamName={teamName}
            />
            {state.matches('Move') && <Footsteps />}
        </RigidBody>
    );
};

export default Player;
