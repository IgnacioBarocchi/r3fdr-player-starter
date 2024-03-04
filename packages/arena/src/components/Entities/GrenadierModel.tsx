import { useEffect } from 'react';
import { use3DModelAnimationsHandler } from '../../hooks/useGameStore/use3DModelAnimationsHandler';
import { use3DModelLoader } from '../../hooks/use3DModelLoader/use3DModelLoader';
import { useGLTF } from '@react-three/drei';
import {
    animationDurationByAnimationName,
    animationNameByState,
} from '../../Machines/PlayerMachine';
import { StateValue } from 'xstate';
import { GRENADIER_ENTITY_PATH } from '../../Machines/GrenadierInfo';

export const GrenadierModel = ({ stateValue }: { stateValue: StateValue }) => {
    // @ts-ignore
    const { group, nodes, scene, materials, actions } = use3DModelLoader({
        modelPath: GRENADIER_ENTITY_PATH,
        onLoadEffect: () => () => {},
    });

    const { animationEffect } = use3DModelAnimationsHandler({
        animationNameByState,
        animationDurationByAnimationName,
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
                    <primitive
                        object={nodes.mixamorigHips}
                        emissiveIntensity={100}
                    />
                    <skinnedMesh
                        receiveShadow={false}
                        castShadow={false}
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

useGLTF.preload(GRENADIER_ENTITY_PATH);
