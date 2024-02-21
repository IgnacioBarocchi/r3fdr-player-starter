import { ChampionMachineStateEvents } from '../../constants/ChampionStateMachineObject';
import { CollisionEnterHandler } from '@react-three/rapier';
import { EntityModel } from '../../providers/entities';
import { useCallback } from 'react';

export const useRigidBodyColliderHandler = (params: {
    teamName: 'Zombie' | 'Mutant';
    send: (action: string) => void;
}) => {
    const onCollisionEnter = useCallback(
        (({ other: { rigidBodyObject } }) => {
            if (
                !rigidBodyObject?.name ||
                rigidBodyObject?.name.endsWith(params.teamName)
            ) {
                return;
            }
            const [animationName, enemy] = rigidBodyObject.name.split('|');
            const ability =
                EntityModel[enemy as 'Zombie' | 'Mutant'].eventMap[
                    animationName
                ];

            console.log(ability);

            if (ability.endsWith('3')) {
                params.send(ChampionMachineStateEvents.TAKE_STUN);
            } else {
                params.send(ChampionMachineStateEvents.TAKE_DAMAGE);
            }
        }) as CollisionEnterHandler,
        [params.teamName]
    );

    return { onCollisionEnter };
};
