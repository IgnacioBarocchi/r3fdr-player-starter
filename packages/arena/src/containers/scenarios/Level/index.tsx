import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../../providers/GameSettingsProvider.tsx';
import { Dummies } from './Dummies.tsx';
import { Physics } from '@react-three/rapier';
import Player from '../../../components/Entities/Player.tsx';
import Terrain from './Terrain.tsx';
import { Vector3 } from 'three';
import { Zombies } from './Zombies.tsx';
import { useControls } from 'leva';
import {
    Context,
    PlayerProvider,
} from '../../../providers/PlayerProvider/PlayerProvider.tsx';

const renderDummies = false;

const LVL1 = () => {
    const [state, send] = Context.useActor();
    console.log(state.value)
    const {
        state: { USE_ORBIT_CONTROLS, DEBUG_APP },
    } = useContext(AppContext);

    const { mockOrbitControls } = useControls({ mockOrbitControls: false });
    const [terrainIsLoading, setTerrainIsLoading] = useState(DEBUG_APP);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setTerrainIsLoading(false);
        }, 200);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <Physics timeStep="vary" debug={true}>
            <Terrain
                position={new Vector3(0, 0.2, 0)}
                scale={new Vector3(50, 0.2, 50)}
            />
            {!terrainIsLoading && (
                <>
                    <Player
                        useOrbitControls={
                            USE_ORBIT_CONTROLS && mockOrbitControls
                        }
                        teamName="Mutant"
                    />
                    {/* {renderDummies && <Dummies teamName="Zombie" />} */}
                </>
            )}
        </Physics>
    );
};

export default LVL1;
