import {
    CapsuleCollider as Bounding,
    RigidBody,
    CylinderCollider as Sensor,
} from '@react-three/rapier';

import { EntityModel } from '../../providers/entities';
import { FC } from 'react';
import { HitBox } from '../utility/Hitbox/HitBox';
import Mutant3DModel from './Mutant3DModel';
import { StateValue } from 'xstate';
import { Zombie3DModel } from './Zombie3DModel';
import { usePlayerLogic } from '../../hooks/usePlayerLogic/usePlayerLogic2';
import { useRigidBodyColliderHandler } from '../../hooks/useRigidBodyColliderHandler/useRigidBodyColliderHandler';

const EntityComponent = {
    Mutant: ({ stateValue }: { stateValue: StateValue }) => (
        <Mutant3DModel stateValue={stateValue} />
    ),
    Zombie: ({ stateValue }: { stateValue: StateValue }) => (
        // @ts-ignore
        <Zombie3DModel stateValue={stateValue} givenDependantGroupRef={null} />
    ),
    Drone: () => <></>,
};

const Player: FC<{
    useOrbitControls: boolean;
    teamName: 'Zombie' | 'Mutant';
}> = ({ useOrbitControls, teamName }) => {
    // @ts-ignore
    const { robotBody, orientation, machineState, send } = usePlayerLogic(
        useOrbitControls,
        EntityModel[teamName]
    );
    const { onCollisionEnter } = useRigidBodyColliderHandler({
        send,
        teamName,
    });

    const Model = EntityComponent[teamName];

    return (
        <RigidBody
            lockRotations={true}
            colliders={false}
            ref={robotBody}
            name="Player"
        >
            <Bounding
                args={[0.2, 0.6]}
                position={[0, 0.8, 0.2]}
                onCollisionEnter={onCollisionEnter}
            />
            <Sensor args={[0.2, 2]} position={[0, 0.5, 0]} sensor />
            <Model stateValue={machineState.value} />
            <HitBox
                stateValue={machineState.value}
                entity={EntityModel[teamName]}
                teamName={teamName}
            />
        </RigidBody>
    );
};

export default Player;
