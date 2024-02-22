import {
    CapsuleCollider as Bounding,
    RigidBody,
    CylinderCollider as Sensor,
} from '@react-three/rapier';
import { useEffect, useState } from 'react';

import { EntityModel } from '../../providers/entities';
import { HitBox } from '../utility/Hitbox/HitBox';
import { Zombie3DModel } from './Zombie3DModel';
import { useEnemyNPCLogic } from '../../hooks/useEnemyNPCLogic/useEnemyNPCLogic';
import { useRigidBodyColliderHandler } from '../../hooks/useRigidBodyColliderHandler/useRigidBodyColliderHandler';
import { useRigidBodySensorHandler } from '../../hooks/useRigidBodySensorHandler/useRigidBodySensorHandler';

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

    const [isDead, setIsDead] = useState(false);

    useEffect(() => {
        let timeoutId = 0;

        if (state.value === 'Dying') {
            // Set a timeout to change isDead state to true after 5 seconds
            timeoutId = setTimeout(() => {
                setIsDead(true);
                // state = null;
                // send = null;
                // onIntersectionEnter = null;
                // onIntersectionExit = null;
                // enemyBody = null;
                // enemy3DModel = null;
            }, 2000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [state.value]);

    if (isDead) {
        // cleanup component
        return <></>;
    }

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
            <HitBox
                stateValue={state.value}
                entity={EntityModel[teamName]}
                teamName={teamName}
            />
        </RigidBody>
    );
};
