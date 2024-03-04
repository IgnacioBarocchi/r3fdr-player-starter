import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../../providers/GameSettingsProvider.tsx';
import { Physics } from '@react-three/rapier';
import Player from '../../../components/Entities/Player.tsx';
import Terrain from './Terrain.tsx';
import { Vector3 } from 'three';
import { useControls } from 'leva';
import { NPC } from '../../../components/UI/SkillBar/NPC.tsx';
import { getMachineInput } from '../../../Machines/base2.ts';
import { Mutant3DModel } from '../../../components/Entities/MutantModel.tsx';
import { GrenadierModel } from '../../../components/Entities/GrenadierModel.tsx';
import { Imp3DModel } from '../../../components/Entities/Imp3DModel.tsx';

// const renderDummies = false;
// const renderZombies = true;

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

                        Model={Imp3DModel}
                    />
                </>
            )}
        </Physics>
    );
};

export default LVL1;

/* <ZombieNPC enemyId="a" onDead={() => {}} /> */
/* <ZombieNPC enemyId='x' onDead={()=>{}}/> */
/* {renderZombies && <ZombieSpawner position={[5, 0, 5]} />} */
/* {renderDummies && <Dummies teamName="Zombie" />} */