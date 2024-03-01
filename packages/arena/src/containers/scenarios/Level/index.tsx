import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../../providers/GameSettingsProvider.tsx';
import { Physics } from '@react-three/rapier';
import Player from '../../../components/Entities/Player.tsx';
import Terrain from './Terrain.tsx';
import { Vector3 } from 'three';
import { useControls } from 'leva';
import { ZombieSpawner } from '../../../components/Entities/ZombieSpawner.tsx';
import { Dummies } from './Dummies.tsx';

const renderDummies = false;
const renderZombies = true;

const LVL1 = () => {
    const {
        state: { USE_ORBIT_CONTROLS, DEBUG_APP },
    } = useContext(AppContext);

    const { mockOrbitControls } = useControls({ mockOrbitControls: false });
    const [terrainIsLoading, setTerrainIsLoading] = useState(DEBUG_APP);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setTerrainIsLoading(false);
        }, 1000);
        return () => {
            clearTimeout(timeout);
        };
    }, []);

    return (
        <Physics timeStep="vary" debug={true}>
            <Terrain
                position={new Vector3(0, 0.2, 0)}
                scale={new Vector3(100, 0.2, 100)}
            />
            {/* <OutskirtsDoodads /> */}
            {!terrainIsLoading && (
                <>
                    <Player
                        teamName="Mutant"
                        useOrbitControls={
                            USE_ORBIT_CONTROLS && mockOrbitControls
                        }
                    />
                    {renderZombies && <ZombieSpawner position={[5, 0, 5]} />}
                    {renderDummies && <Dummies teamName="Zombie" />}
                </>
            )}
        </Physics>
    );
};

export default LVL1;

{
    /* <ZombieNPC enemyId="a" onDead={() => {}} /> */
}
