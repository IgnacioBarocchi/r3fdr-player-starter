import { useCallback, useState } from 'react';

import { ChampionMachineStateEvents } from '../../constants/ChampionStateMachineObject';
import { IntersectionExitHandler } from '@react-three/rapier';

export const useRigidBodySensorHandler = (params: {
    teamName: 'Zombie' | 'Mutant';
    send: (action: string) => void;
}) => {
    // const [playerIsTargeted, setPlayerIsTargeted] = useState(false);

    const onIntersectionEnter = useCallback(
        (({ other: { rigidBodyObject } }) => {
            if (rigidBodyObject?.name === 'Player') {
                // setPlayerIsTargeted(true);
                // @ts-ignore
                params.send({
                    type: 'PLAYER_REACHABLE_CHANGE',
                    reachable: true,
                });

                params.send(ChampionMachineStateEvents.ABILITY_1);
            }
        }) as IntersectionExitHandler,
        [params.teamName]
    );

    const onIntersectionExit = useCallback(
        (({ other: { rigidBodyObject } }) => {
            if (rigidBodyObject?.name === 'Player') {
                // setPlayerIsTargeted(false);
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
