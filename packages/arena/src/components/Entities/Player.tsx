import {
    CapsuleCollider as Bounding,
    RigidBody,
    CylinderCollider as Sensor,
} from '@react-three/rapier';

import { usePlayerLogic } from '../../hooks/usePlayerLogic/usePlayerLogic';
import { useRigidBodyColliderHandler } from '../../hooks/useRigidBodyColliderHandler/useRigidBodyColliderHandler';
import { Context } from '../../providers/PlayerProvider/PlayerProvider';
import { FC, useEffect } from 'react';
import { Footsteps } from '../../containers/scenarios/Level/Footsteps';
import { useGameStore } from '../../hooks/useGameStore/useGameStore';
import { FSMStateComponents } from '../../Machines/GrenadierInfo';
import { FSMStates } from '../../Machines/base2';

const Player: FC<{
    useOrbitControls: boolean;
    teamName: 'Zombie' | 'Mutant';
    Model: FC<{ stateValue: FSMStates }>;
    name: string;
}> = ({ useOrbitControls, teamName, name, Model }) => {
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
            name={name}
        >
            <Bounding
                args={[0.2, 0.6]}
                position={[0, 0.8, 0.2]}
                onCollisionEnter={onCollisionEnter}
            />
            <Sensor args={[0.2, 2]} position={[0, 0.5, 0]} sensor />
            <Model stateValue={state.value} />
            {FSMStateComponents.hasOwnProperty(state.value as FSMStates)
                ? FSMStateComponents[state.value as FSMStates]()
                : null}
            {state.matches('Move') && <Footsteps />}
        </RigidBody>
    );
};

export default Player;
