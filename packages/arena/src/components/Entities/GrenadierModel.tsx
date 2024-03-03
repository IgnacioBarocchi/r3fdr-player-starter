import { useEffect } from 'react';

import { use3DModelAnimationsHandler } from '../../hooks/useGameStore/use3DModelAnimationsHandler';
import { use3DModelLoader } from '../../hooks/use3DModelLoader/use3DModelLoader';
import { useGLTF } from '@react-three/drei';
import { states } from '../../Machines/MutantMachine';
import { StateValue } from 'xstate';

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
    | 'Saber And Pistol Idle - Idle'
    | 'Saber And Pistol Run - Move'
    | 'Saber And Pistol Impact - React to skill 1'
    | 'Saber And Pistol Taking Stun - React to skill 2'
    | 'Standing React Large From Left - React to skill 3'
    | 'Sword And Shield Impact - React to skill 4'
    | 'Saber And Pistol Slash - Use skill 1'
    | 'Saber And Pistol Kick - Use skill 2'
    | 'Sprinting Forward Roll - Use skill 3'
    | 'Shooting - Use skill 4'
    | 'Standing Idle Looking Ver. 2 - Engage'
    | 'Kick ground - Provoke'
    | 'Falling Back Death - Death';

// type GLTFActions = Record<ActionName, THREE.AnimationAction>;

const path = '/models/Grenadier.gltf';
export const GrenadierModel = ({ stateValue }: { stateValue: StateValue }) => {
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
        <group ref={group} dispose={null} scale={120}>
            <group name="Scene">
                <group
                    name="Armature"
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={0.01}
                >
                    <primitive object={nodes.mixamorigHips} />
                    <skinnedMesh
                        name="mesh"
                        geometry={nodes.mesh.geometry}
                        material={materials['Material.001']}
                        skeleton={nodes.mesh.skeleton}
                    />
                </group>
            </group>
        </group>
    );
};

useGLTF.preload('/models/Grenadier.gltf');
