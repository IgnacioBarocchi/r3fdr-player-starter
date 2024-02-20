import {
    CapsuleCollider as Bounding,
    RigidBody,
    CylinderCollider as Sensor,
} from '@react-three/rapier';

import { ChampionMachineStateEvents } from '../../../constants/ChampionStateMachineObject';
import { EntityModel } from '../../../providers/entities';
import { FC } from 'react';
import { HitBox } from '../../utility/Hitbox/HitBox';
import Mutant3DModel from './Mutant3DModel';
import { StateValue } from 'xstate';
import { Zombie3DModel } from './Zombie3DModel';
import { usePlayerLogic } from '../../../hooks/usePlayerLogic/usePlayerLogic2';

const EntityComponent = {
    Mutant: ({ stateValue }: { stateValue: StateValue }) => (
        <Mutant3DModel stateValue={stateValue} />
    ),
    Zombie: ({ stateValue }: { stateValue: StateValue }) => (
        <Zombie3DModel stateValue={stateValue} />
    ),
    Drone: () => <></>,
};

const Player2: FC<{
    useOrbitControls: boolean;
    teamName: 'Zombie' | 'Mutant';
}> = ({ useOrbitControls, teamName }) => {
    // @ts-ignore
    const { robotBody, orientation, machineState, send } = usePlayerLogic(
        useOrbitControls,
        EntityModel[teamName]
    );

    const Model = EntityComponent[teamName];
    return (
        <RigidBody lockRotations={true} colliders={false} ref={robotBody}>
            <Bounding
                args={[0.2, 0.6]}
                position={[0, 0.8, 0.2]}
                onCollisionEnter={({ other: { rigidBodyObject } }) => {
                    if (
                        !rigidBodyObject?.name ||
                        rigidBodyObject?.name.endsWith(teamName)
                    ) {
                        return;
                    }

                    const [animationName, enemy] =
                        rigidBodyObject.name.split('|');
                    const ability =
                        EntityModel[enemy as 'Zombie' | 'Mutant'].eventMap[
                            animationName
                        ];

                    if (ability.endsWith('3')) {
                        send(ChampionMachineStateEvents.TAKE_STUN);
                    } else {
                        send(ChampionMachineStateEvents.TAKE_DAMAGE);
                    }
                }}
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

export default Player2;
