import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../../providers/GameSettingsProvider.tsx';
import { Physics } from '@react-three/rapier';
import Player from '../../../components/Entities/Player.tsx';
import Terrain from './Terrain.tsx';
import { Vector3 } from 'three';
import { useControls } from 'leva';
import { ZombieNPC } from '../../../components/Entities/ZombieNPC.tsx';
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
                        teamName="Mutant"
                        useOrbitControls={
                            USE_ORBIT_CONTROLS && mockOrbitControls
                        }
                    />
                    <ZombieNPC/>
                    {/* {renderDummies && <Dummies teamName="Zombie" />}
                    {renderZombies && <Zombies/>} */}
                </>
            )}
        </Physics>
    );
};

export default LVL1;
