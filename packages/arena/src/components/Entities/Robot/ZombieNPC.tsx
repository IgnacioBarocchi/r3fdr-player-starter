import {
    CapsuleCollider as Bounding,
    IntersectionEnterHandler,
    IntersectionExitHandler,
    RigidBody,
    CylinderCollider as Sensor,
} from '@react-three/rapier';

import { ChampionMachineStateEvents } from '../../../constants/ChampionStateMachineObject';
import { EntityModel } from '../../../providers/entities';
// import { Skeleton23DModel } from './Skeleton23DModel';
import { Zombie3DModel } from './Zombie3DModel';
import { useEnemyNPCLogic } from '../../../hooks/useEnemyNPCLogic/useEnemyNPCLogic';
import { useRigidBodyHandler } from '../../../hooks/useRigidBodyHandler/useRigidBodyHandler';

const teamName = 'Zombie';
export const ZombieNPC = () => {
    const { state, send, enemyBody, enemy3DModel } = useEnemyNPCLogic(
        EntityModel.Zombie,
        true
    );
    const { onCollisionEnter } = useRigidBodyHandler({ send, teamName });
    // const onInteractionRadiusEnter = () as IntersectionEnterHandler;

    const onInteractionRadiusLeave = (({ other: { rigidBodyObject } }) => {
        // const playerIsFar = playerIsInteractingWithSensor(
        //     rigidBodyObject?.name
        // );
        // const finishingStunAttack = rigidBodyObject?.name === WEAPONS.FOOT;
        // if (finishingStunAttack) {
        //   send("RECOVER");
        // }
        // if (playerIsFar && playerIsReachable) {
        //     handlePlayerReachableChange(false);
        // }
    }) as IntersectionExitHandler;

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
            <Zombie3DModel
                stateValue={state.value}
                givenDependantGroupRef={enemy3DModel}
            />
        </RigidBody>
    );
};
