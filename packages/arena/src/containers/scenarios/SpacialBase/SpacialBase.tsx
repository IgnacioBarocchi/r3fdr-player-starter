import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../../providers/GameSettingsProvider';
import { Dummyies } from './Dummies.tsx';
import { Physics } from '@react-three/rapier';
import Player2 from '../../../components/Entities/Robot/Player2.tsx';
import Terrain from './Terrain.tsx';
import { Vector3 } from 'three';
import { ZombieNPC } from '../../../components/Entities/Robot/ZombieNPC.tsx';
import { useControls } from 'leva';

const renderDummies = false;

const SpacialBase = () => {
    const {
        state: { USE_ORBIT_CONTROLS, DEBUG_APP },
    } = useContext(AppContext);

    const { mockOrbitControls } = useControls({ mockOrbitControls: false });
    const [terrainIsLoading, setTerrainIsLoading] = useState(true);

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
                    <Player2
                        useOrbitControls={
                            USE_ORBIT_CONTROLS && mockOrbitControls
                        }
                        teamName="Mutant"
                    />
                    {/* <group position={[0, 0, 6]}>
                        <ZombieNPC />
                    </group>
                    <group position={[0, 0, -6]}>
                        <ZombieNPC />
                    </group>
                    <group position={[6, 0, 6]}>
                        <ZombieNPC />
                    </group> */}
                    <group position={[-6, 0, -6]}>
                        <ZombieNPC />
                    </group>
                    {renderDummies && <Dummyies teamName="Zombie" />}
                </>
            )}
        </Physics>
    );
};

export default SpacialBase;
