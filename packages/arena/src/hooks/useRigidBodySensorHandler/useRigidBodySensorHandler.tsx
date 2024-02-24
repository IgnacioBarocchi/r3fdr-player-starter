import { useCallback } from 'react';

import { IntersectionExitHandler } from '@react-three/rapier';

export const useRigidBodySensorHandler = (params: {
    teamName: 'Zombie' | 'Mutant';
    send: (action: string) => void;
}) => {

    const onIntersectionEnter = useCallback(
        (({ other: { rigidBodyObject } }) => {
            if (rigidBodyObject?.name === 'Player' && params.teamName ==="Zombie") {
                // @ts-ignore
                params.send({
                    type: 'PLAYER_REACHABLE_CHANGE',
                    reachable: true,
                });
                if(Math.random() > 0.5){
                    params.send("TAUNT");
                }
            }
        }) as IntersectionExitHandler,
        [params.teamName]
    );

    const onIntersectionExit = useCallback(
        (({ other: { rigidBodyObject } }) => {
            if (rigidBodyObject?.name === 'Player') {
                // @ts-ignore
                params.send({
                    type: 'PLAYER_REACHABLE_CHANGE',
                    targeted: false,
                });
            }
        }) as IntersectionExitHandler,
        [params.teamName]
    );

    return { onIntersectionEnter, onIntersectionExit };
};
