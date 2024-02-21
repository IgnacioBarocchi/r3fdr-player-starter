import * as THREE from 'three';

import { FC, useEffect } from 'react';

import { EntityModel } from '../../../providers/entities';
import { GLTF } from 'three-stdlib';
import { StateValue } from 'xstate';
import { use3DModelAnimationsHandler } from '../../../hooks/useGameStore/use3DModelAnimationsHandler';
import { use3DModelLogic } from '../../../hooks/use3DModelLogic/use3DModelLogic';
import { useGLTF } from '@react-three/drei';

type GLTFResult = GLTF & {
    nodes: {
        mesh: THREE.SkinnedMesh;
        mixamorigHips: THREE.Bone;
    };
    materials: {
        ['Material.001']: THREE.MeshStandardMaterial;
    };
};

const path = EntityModel.Zombie.path;
export const Zombie3DModel: FC<{
    stateValue: StateValue;
    givenDependantGroupRef: React.MutableRefObject<THREE.Group>;
}> = ({ stateValue, givenDependantGroupRef }) => {
    // @ts-ignore
    const { group, nodes, materials, actions } = use3DModelLogic<GLTFResult>(
        false,
        path,
        givenDependantGroupRef
    );

    const { animationEffect } = use3DModelAnimationsHandler({
        entity: EntityModel.Zombie,
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
                    scale={1.02}
                >
                    <primitive object={nodes.mixamorigHips} />
                    <skinnedMesh
                        name="mesh"
                        geometry={nodes.mesh.geometry}
                        // @ts-ignore
                        material={materials['Material.001']}
                        skeleton={nodes.mesh.skeleton}
                    />
                </group>
            </group>
        </group>
    );
};

useGLTF.preload(path);

// type ActionName =
//     | 'Attacking1'
//     | 'Attacking2'
//     | 'Attacking3'
//     | 'Dying'
//     | 'Idle'
//     | 'Running'
//     | 'Stunned'
//     | 'TakingDamage';
// type GLTFActions = Record<ActionName, THREE.AnimationAction>;
