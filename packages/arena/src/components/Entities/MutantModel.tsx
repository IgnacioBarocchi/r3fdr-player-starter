import { useEffect } from 'react';

import { EntityModel } from '../../providers/entities';
import { use3DModelAnimationsHandler } from '../../hooks/useGameStore/use3DModelAnimationsHandler';
import { use3DModelLoader } from '../../hooks/use3DModelLoader/use3DModelLoader';
import { useGLTF } from '@react-three/drei';
import { states } from '../../Machines/MutantMachine';
import { StateValue } from 'xstate';

const path = EntityModel.Mutant.path;
export const Mutant3DModel = ({ stateValue }: { stateValue: StateValue }) => {
    // @ts-ignore
    const { group, nodes, scene, materials, actions } = use3DModelLoader({
        modelPath: path,
        onLoadEffect: () => () => {},
    });

    const { animationEffect } = use3DModelAnimationsHandler({
        states,
        stateValue,
        actions,
    });

    useEffect(animationEffect, [stateValue, actions]);

    return (
        <group ref={group} dispose={null}>
            <group name="Scene">
                <group
                    name="Armature"
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={0.75}
                >
                    <primitive object={nodes.mixamorigHips} />

                    <skinnedMesh
                        name="meshmesh008"
                        // @ts-ignore
                        geometry={nodes.meshmesh008.geometry}
                        // @ts-ignore
                        material={materials['Main material']}
                        // @ts-ignore
                        skeleton={nodes.meshmesh008.skeleton}
                        castShadow
                    />

                    <skinnedMesh
                        name="meshmesh008_1"
                        // @ts-ignore
                        geometry={nodes.meshmesh008_1.geometry}
                        // @ts-ignore
                        material={materials.RH}
                        // @ts-ignore
                        skeleton={nodes.meshmesh008_1.skeleton}
                    />
                    {/* </RigidBody>
                        )}
                    </group> */}
                </group>
            </group>
        </group>
    );
};

useGLTF.preload(path);
