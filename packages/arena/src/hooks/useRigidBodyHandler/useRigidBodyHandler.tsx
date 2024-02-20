import {
    CollisionEnterHandler,
    IntersectionEnterHandler,
} from '@react-three/rapier';

import { ChampionMachineStateEvents } from '../../constants/ChampionStateMachineObject';
import { EntityModel } from '../../providers/entities';
import { useCallback } from 'react';

export const useRigidBodyHandler = (params: {
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
