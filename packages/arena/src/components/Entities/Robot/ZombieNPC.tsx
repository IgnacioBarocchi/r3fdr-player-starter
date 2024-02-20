import {
    CapsuleCollider as Bounding,
    RigidBody,
    CylinderCollider as Sensor,
} from '@react-three/rapier';

import { ChampionMachineStateEvents } from '../../../constants/ChampionStateMachineObject';
import { EntityModel } from '../../../providers/entities';
// import { Skeleton23DModel } from './Skeleton23DModel';
import { Zombie3DModel } from './Zombie3DModel';
import { useEnemyNPCLogic } from '../../../hooks/useEnemyNPCLogic/useEnemyNPCLogic';

const teamName = 'Zombie';
export const ZombieNPC = () => {
    const {
        state,
        send,
        onInteractionRadiusEnter,
        onInteractionRadiusLeave,
        enemyBody,
        enemy3DModel,
    } = useEnemyNPCLogic(EntityModel.Zombie, false);

    return (
        <RigidBody lockRotations={true} colliders={false} ref={enemyBody}>
            <Bounding args={[0.2, 0.6]} position={[0, 0.8, 0]} />
            <Sensor
                args={[0.2, 2]}
                position={[0, 0.5, 0]}
                sensor
                onIntersectionEnter={onInteractionRadiusEnter}
                onIntersectionExit={onInteractionRadiusLeave}
                onCollisionEnter={({ other: { rigidBodyObject } }) => {
                    if (
                        !rigidBodyObject?.name ||
                        rigidBodyObject?.name.endsWith(teamName)
                    ) {
                        return;
                    }

                    const [animationName, enemy] =
                        rigidBodyObject.name.split('|');
                    console.log(EntityModel[enemy as 'Zombie' | 'Mutant']);
                    const ability =
                        EntityModel[enemy as 'Zombie' | 'Mutant'].eventMap[
                            animationName
                        ];

                    if (ability.endsWith('3')) {
                        send(ChampionMachineStateEvents.TAKE_STUN);
                    } else {
                        send(ChampionMachineStateEvents.TAKE_DAMAGE);
                    }

                    console.log(ability);
                }}
            />
            <Zombie3DModel stateValue={'Idle'} givenDependantGroupRef={null} />
        </RigidBody>
    );
};
