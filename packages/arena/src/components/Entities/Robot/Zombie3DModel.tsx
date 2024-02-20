/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.11 public/models/Zombie.gltf -t -r public
*/

import * as THREE from 'three';

import { EntityModel } from '../../../providers/entities';
import { FC } from 'react';
import { GLTF } from 'three-stdlib';
import { StateValue } from 'xstate';
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

type ActionName =
    | 'Attacking1'
    | 'Attacking2'
    | 'Attacking3'
    | 'Dying'
    | 'Idle'
    | 'Running'
    | 'Stunned'
    | 'TakingDamage';
// type GLTFActions = Record<ActionName, THREE.AnimationAction>;

const path = EntityModel.Zombie.path;
export const Zombie3DModel: FC<{
    stateValue: StateValue;
    givenDependantGroupRef: React.MutableRefObject<THREE.Group>;
}> = ({ stateValue, givenDependantGroupRef }) => {
    const { group, nodes, materials } = use3DModelLogic<GLTFResult>(
        stateValue,
        false,
        path,
        givenDependantGroupRef
    );

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