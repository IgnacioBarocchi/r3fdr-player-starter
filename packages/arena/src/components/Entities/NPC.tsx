import {
    RigidBody,
    CapsuleCollider as Bounding,
    CylinderCollider as Sensor,
} from '@react-three/rapier';
import { Footsteps } from '../../containers/scenarios/Level/Footsteps';
import { useRigidBodyColliderHandler } from '../../hooks/useRigidBodyColliderHandler/useRigidBodyColliderHandler';
import { useRigidBodySensorHandler } from '../../hooks/useRigidBodySensorHandler/useRigidBodySensorHandler';
import { FC } from 'react';
import { useNPCLogic } from '../../hooks/useEnemyNPCLogic/useNPCLogic';
import { StateValue } from 'xstate';

// @ts-ignore
export const NPC: FC<{
    machineInput: any;
    Model: FC<{ stateValue: StateValue }>;
}> = ({ machineInput, Model }) => {
    // @ts-ignore
    const { NPCRigidBodyReference, state, send } = useNPCLogic(machineInput);

    const { onCollisionEnter } = useRigidBodyColliderHandler({
        send,
        teamName: 'Zombie',
    });

    const { onIntersectionEnter, onIntersectionExit } =
        useRigidBodySensorHandler({
            send,
            teamName: 'Zombie',
        });

    // @ts-expect-error
    if (state.matches('Death') && state.context.currentHP >= 0) {
        return <></>;
    }

    return (
        <RigidBody
            lockRotations={true}
            colliders={false}
            ref={NPCRigidBodyReference}
            name="NPC"
        >
            <Bounding
                args={[0.2, 0.6]}
                position={[0, 0.8, 0.2]}
                onCollisionEnter={onCollisionEnter}
            />
            <Sensor
                args={[0.2, 2]}
                position={[0, 0.5, 0]}
                sensor
                onIntersectionExit={onIntersectionExit}
                onIntersectionEnter={onIntersectionEnter}
            />
            <Model stateValue={state.value} />
            {state.matches('Move') && <Footsteps />}
        </RigidBody>
    );
};
