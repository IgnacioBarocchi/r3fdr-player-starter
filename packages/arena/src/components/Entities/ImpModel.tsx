import { useEffect } from 'react';
import { use3DModelAnimationsHandler } from '../../hooks/useGameStore/use3DModelAnimationsHandler';
import { use3DModelLoader } from '../../hooks/use3DModelLoader/use3DModelLoader';
import { StateValue } from 'xstate';
import { useGLTF } from '@react-three/drei';
import {
    animationNameByState,
    animationDurationByAnimationName,
} from '../../Machines/ImpStates';

const path = '/models/Imp.gltf';

export const ImpModel = ({ stateValue }: { stateValue: StateValue }) => {
    // @ts-ignore
    const { group, nodes, scene, materials, actions } = use3DModelLoader({
        modelPath: path,
        onLoadEffect: () => () => {},
    });

    const { animationEffect } = use3DModelAnimationsHandler({
        animationDurationByAnimationName,
        animationNameByState,
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
