import { FC, useEffect } from 'react';

import { EntityModel } from '../../providers/entities';
import { GLTFResult } from './MutantTypes';
import { StateValue } from 'xstate';
import { use3DModelAnimationsHandler } from '../../hooks/useGameStore/use3DModelAnimationsHandler';
import { use3DModelLoader } from '../../hooks/use3DModelLoader/use3DModelLoader';
import { useGLTF } from '@react-three/drei';

const path = EntityModel.Mutant.path;
const Mutant3DModel: FC<{ stateValue: StateValue }> = ({ stateValue }) => {
    // @ts-ignore
    const { group, nodes, scene, materials, actions } =
        use3DModelLoader<GLTFResult>(true, path);

    const { animationEffect } = use3DModelAnimationsHandler({
        entity: EntityModel.Mutant,
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

export default Mutant3DModel;