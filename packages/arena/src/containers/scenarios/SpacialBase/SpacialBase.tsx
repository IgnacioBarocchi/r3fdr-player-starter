import { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../../providers/GameSettingsProvider';
import { DroneNPC } from '../../../components/Entities/Robot/DroneNPC.tsx';
import { EntityModel } from '../../../providers/entities.ts';
import { HitBox } from '../../../components/utility/Hitbox/HitBox.tsx';
import { Physics } from '@react-three/rapier';
import Player2 from '../../../components/Entities/Robot/Player2.tsx';
import Terrain from './Terrain.tsx';
import { Vector3 } from 'three';
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
                    <Player2
                        useOrbitControls={
                            USE_ORBIT_CONTROLS && mockOrbitControls
                        }
                        teamName="Mutant"
                    />
                    <group position={[1, 0.05, 0]}>
                        <HitBox
                            stateValue={'Attacking1'}
                            entity={EntityModel.Zombie}
                            teamName="Zombie"
                        />
                    </group>
                    <group position={[1, 0.05, 4]}>
                        <HitBox
                            stateValue={'Attacking2'}
                            entity={EntityModel.Zombie}
                            teamName="Zombie"
                        />
                    </group>
                    <group position={[1, 0.05, 6]}>
                        <HitBox
                            stateValue={'Attacking3'}
                            entity={EntityModel.Zombie}
                            teamName="Zombie"
                        />
                    </group>
                </>
            )}
        </Physics>
    );
};

export default SpacialBase;
