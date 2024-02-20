import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../../providers/GameSettingsProvider';
import { DroneNPC } from '../../../components/Entities/Robot/DroneNPC.tsx';
import { Dummy } from './Dummy.tsx';
import { EntityModel } from '../../../providers/entities.ts';
import { HitBox } from '../../../components/utility/Hitbox/HitBox.tsx';
import { Physics } from '@react-three/rapier';
import Player2 from '../../../components/Entities/Robot/Player2.tsx';
import Terrain from './Terrain.tsx';
import { Vector3 } from 'three';
import { ZombieNPC } from '../../../components/Entities/Robot/ZombieNPC.tsx';
import { useControls } from 'leva';

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
            {/* <RigidBody type={'fixed'} colliders="hull"> */}

            {/* </RigidBody> */}

            {/* <RigidBody
                type="fixed"
                restitution={0.2}
                friction={1}
                name="floor"
                colliders={'hull'}
            >
                <CuboidCollider args={[25, 0.2, 25]} /> */}
            <Terrain
                position={new Vector3(0, 0.2, 0)}
                scale={new Vector3(50, 0.2, 50)}
            />
            {/* </RigidBody> */}
            {!terrainIsLoading && (
                <>
                    {/* <DroneNPC /> */}
                    {/* <Player2
                        useOrbitControls={
                            USE_ORBIT_CONTROLS && mockOrbitControls
                        }
                        teamName="Mutant"
                    /> */}
                    <group position={[0, 0, 6]}>
                        <ZombieNPC />
                    </group>
                    <Player2
                        useOrbitControls={
                            USE_ORBIT_CONTROLS && mockOrbitControls
                        }
                        teamName="Mutant"
                    />
                    {/* <Dummy teamName="Mutant" /> */}
                </>
            )}
        </Physics>
    );
};

export default SpacialBase;
