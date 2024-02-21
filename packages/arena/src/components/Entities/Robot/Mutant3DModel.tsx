import { FC, useEffect } from 'react';

import { EntityModel } from '../../../providers/entities';
import { GLTFResult } from './MutantTypes';
import { StateValue } from 'xstate';
import { Vector3 } from 'three';
import { use3DModelAnimationsHandler } from '../../../hooks/useGameStore/use3DModelAnimationsHandler';
import { use3DModelLogic } from '../../../hooks/use3DModelLogic/use3DModelLogic';
// import { useControls } from 'leva';
import { useGLTF } from '@react-three/drei';

const path = EntityModel.Mutant.path;
const Mutant3DModel: FC<{ stateValue: StateValue }> = ({ stateValue }) => {
    // @ts-ignore
    const { group, nodes, materials, actions } = use3DModelLogic<GLTFResult>(
        stateValue,
        true,
        path
    );

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
                        name="mesh"
                        geometry={nodes.mesh.geometry}
                        // @ts-expect-error X
                        material={materials['Main material']}
                        skeleton={nodes.mesh.skeleton}
                    />
                </group>
            </group>
        </group>
    );
};

useGLTF.preload(path);

export default Mutant3DModel;

// const { angle } = useControls('Lamp', {
//     angle: { value: 0, min: 0, max: 360, step: 0.5 },
// });
// const { x, y, z, pp } = useControls('Lamp', {
//     x: { value: 0, min: 0, max: 1000, step: 1 },
//     y: { value: 10, min: 0, max: 1000, step: 1 },
//     z: { value: 0, min: 0, max: 1000, step: 1 },
//     pp: { value: 2, min: 0, max: 7, step: 1 },
// });
