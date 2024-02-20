import {
    CapsuleCollider as Bounding,
    RigidBody,
    CylinderCollider as Sensor,
} from '@react-three/rapier';

import { EntityModel } from '../../../providers/entities';
// import { Skeleton23DModel } from './Skeleton23DModel';
import { Zombie3DModel } from './Zombie3DModel';
import { useEnemyNPCLogic } from '../../../hooks/useEnemyNPCLogic/useEnemyNPCLogic';
import { useRigidBodyColliderHandler } from '../../../hooks/useRigidBodyColliderHandler/useRigidBodyColliderHandler';
import { useRigidBodySensorHandler } from '../../../hooks/useRigidBodySensorHandler/useRigidBodySensorHandler';

const teamName = 'Zombie';
export const ZombieNPC = () => {
    const { state, send, enemyBody, enemy3DModel } = useEnemyNPCLogic(
        EntityModel.Zombie,
        true
    );

    const { onCollisionEnter } = useRigidBodyColliderHandler({
        send,
        teamName,
    });

    const { onIntersectionEnter, onIntersectionExit } =
        useRigidBodySensorHandler({
            send,
            teamName,
        });

    return (
        <RigidBody lockRotations={true} colliders={false} ref={enemyBody}>
            <Bounding
                args={[0.2, 0.6]}
                position={[0, 0.8, 0]}
                onCollisionEnter={onCollisionEnter}
            />
            <Sensor
                args={[0.2, 2]}
                position={[0, 0.5, 0]}
                sensor
                onIntersectionExit={onIntersectionExit}
                onIntersectionEnter={onIntersectionEnter}
            />
            <Zombie3DModel
                stateValue={state.value}
                givenDependantGroupRef={enemy3DModel}
            />
        </RigidBody>
    );
};
