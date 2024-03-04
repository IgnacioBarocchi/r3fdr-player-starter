import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../../providers/GameSettingsProvider.tsx';
import { Physics } from '@react-three/rapier';
import Player from '../../../components/Entities/Player.tsx';
import Terrain from './Terrain.tsx';
import { Vector3 } from 'three';
import { useControls } from 'leva';
import { NPC } from '../../../components/Entities/NPC.tsx';
import { getMachineInput } from '../../../Machines/base2.ts';
import { GrenadierModel } from '../../../components/Entities/GrenadierModel.tsx';
import { ImpModel } from '../../../components/Entities/ImpModel.tsx';
import { GRENADIER_ENTITY_NAME } from '../../../Machines/GrenadierInfo.tsx';

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
            {!terrainIsLoading && (
                <>
                    <Player
                        name={GRENADIER_ENTITY_NAME}
                        teamName="Mutant"
                        useOrbitControls={
                            USE_ORBIT_CONTROLS && mockOrbitControls
                        }
                        Model={GrenadierModel}
                    />
                    <NPC
                        machineInput={getMachineInput(
                            'NPC',
                            'an NPC',
                            new Map([
                                ['Use skill 1', 1016.66],
                                ['Use skill 2', 1200],
                                ['Use skill 3', 1766.66],
                                ['Use skill 4', 2383.33],
                                ['React to skill 1', 1333.33],
                                ['React to skill 2', 2150],
                                ['React to skill 3', 1333.33],
                                ['React to skill 4', 1333.33],
                                ['Engage', 1000],
                                ['Provoke', 1000],
                                ['Death', 2283.33],
                            ])
                        )}

                        Model={ImpModel}
                    />
                </>
            )}
        </Physics>
    );
};

export default LVL1;
