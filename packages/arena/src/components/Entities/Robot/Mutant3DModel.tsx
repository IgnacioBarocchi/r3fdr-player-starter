// import { useControls } from 'leva';
import { Clone, useGLTF } from '@react-three/drei';
// todo encapsulate 3d logic
import { FC, useEffect, useMemo, useRef } from 'react';

import { EntityModel } from '../../../providers/entities';
import { GLTFResult } from './MutantTypes';
import { RigidBody } from '@react-three/rapier';
import { SkeletonUtils } from 'three-stdlib';
// import { SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils';
import { StateValue } from 'xstate';
import { use3DModelAnimationsHandler } from '../../../hooks/useGameStore/use3DModelAnimationsHandler';
import { use3DModelLoader } from '../../../hooks/use3DModelLoader/use3DModelLoader';
import { useGraph } from '@react-three/fiber';

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

    // <group ref={group} dispose={null}>
    //     <group name="Scene">
    //         <group
    //             name="Armature"
    //             rotation={[Math.PI / 2, 0, 0]}
    //             scale={0.75}
    //         >

    /* const a = useRef(null);
    useEffect(() => {
        if (a.current) {
            console.log(a);
        }
    }); */
    return (
        <group ref={group} dispose={null}>
            <group name="Scene">
                <group
                    name="Armature"
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={0.75}
                >
                    <primitive object={nodes.mixamorigHips} />
                    {/* <skinnedMesh
                        name="mesh"
                        geometry={nodes.mesh.geometry}
                        // @ts-expect-error X
                        material={materials['Main material']}
                        skeleton={nodes.mesh.skeleton}
                    /> */}
                    <skinnedMesh
                        name="meshmesh008"
                        // @ts-ignore
                        geometry={nodes.meshmesh008.geometry}
                        // @ts-ignore
                        material={materials['Main material']}
                        // @ts-ignore
                        skeleton={nodes.meshmesh008.skeleton}
                    />
                    {/* <group ref={a}>
                        {a.current && 'position' in a.current && (
                            <RigidBody
                                // @ts-ignore
                                position={a.current.position}
                                colliders="hull"
                            > */}
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

// const { angle } = useControls('Lamp', {
//     angle: { value: 0, min: 0, max: 360, step: 0.5 },
// });
// const { x, y, z, pp } = useControls('Lamp', {
//     x: { value: 0, min: 0, max: 1000, step: 1 },
//     y: { value: 10, min: 0, max: 1000, step: 1 },
//     z: { value: 0, min: 0, max: 1000, step: 1 },
//     pp: { value: 2, min: 0, max: 7, step: 1 },
// });
