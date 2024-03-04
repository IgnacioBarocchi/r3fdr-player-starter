import { useEffect, useLayoutEffect } from 'react';

import { use3DModelAnimationsHandler } from '../../hooks/useGameStore/use3DModelAnimationsHandler';
import { use3DModelLoader } from '../../hooks/use3DModelLoader/use3DModelLoader';
import { StateValue } from 'xstate';
import * as THREE from 'three';
import { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { states } from '../../Machines/ImpStates';

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
    | 'Big Hit To Head - React to skill 1'
    | 'Demon Attack - Use skill 4'
    | 'Demon Biting - Provoke'
    | 'Demon Idle - Idle'
    | 'Demon Kicking -  Use skill 2'
    | 'Demon Punch - Use skill 1'
    | 'Demon Reaction Hit - React to skill 4'
    | 'Demon Run - Move'
    | 'Demon Swiping - Use skill 3'
    | 'Standing React Large From Left - React to skill 3'
    | 'Standing Taunt - Engage'
    | 'Stun - React to skill 2'
    | 'Demon Death - Death'

type GLTFActions = Record<ActionName, THREE.AnimationAction>;
const path = '/models/Imp.gltf';

export const Imp3DModel = ({ stateValue }: { stateValue: StateValue }) => {
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
        <group ref={group} dispose={null} scale={200}>
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

useGLTF.preload(path);
