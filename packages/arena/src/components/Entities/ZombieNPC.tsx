import {
    CapsuleCollider as Bounding,
    RigidBody,
    CylinderCollider as Sensor,
    TrimeshCollider,
} from '@react-three/rapier';
import { useEffect, useState } from 'react';

import { HitBox } from '../utility/HitBox/HitBox';
import { Zombie3DModel } from './Zombie3DModel';
import { useEnemyNPCLogic } from '../../hooks/useEnemyNPCLogic/useEnemyNPCLogic';
import { useRigidBodyColliderHandler } from '../../hooks/useRigidBodyColliderHandler/useRigidBodyColliderHandler';
import { useRigidBodySensorHandler } from '../../hooks/useRigidBodySensorHandler/useRigidBodySensorHandler';
import { ZombieHitBoxes } from '../utility/HitBox/hitBoxes';

const teamName = 'Zombie';

export const ZombieNPC = ({ enemyId, onDead }: { enemyId: string; onDead: ()=> void }) => {
    const { state, send, enemyBody, enemy3DModel } = useEnemyNPCLogic();

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
            timeoutId = setTimeout(() => {
                onDead();
                setIsDead(true);
            }, 2000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [state.value]);

    if (isDead) {
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
            {/* <CuboidCollider position={[0, 1.25, 1.5]} args={[.1, .1, .5]} /> */}
            <HitBox
                stateValue={state.value}
                hitBoxesRecords={ZombieHitBoxes}
                teamName={teamName}
            />
        </RigidBody>
    );
};
