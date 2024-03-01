import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';

import { Group } from 'three';
import { SkeletonUtils } from 'three-stdlib';
import { useGraph } from '@react-three/fiber';

export type LoaderParams = {
    onLoadEffect?: (group: React.RefObject<Group>) => () => void;
    modelPath: string;
    givenDependantGroupRef?: React.MutableRefObject<THREE.Group>;
};
export const use3DModelLoader = (params: LoaderParams) => {
    const group = params.givenDependantGroupRef
        ? params.givenDependantGroupRef
        : useRef<Group>(null);

    // @ts-ignore
    const { scene, materials, animations } = useGLTF(params.modelPath);

    const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes } = useGraph(clone);

    // @ts-ignore
    const { actions } = useAnimations<RobotGenericAnimationsWithActions>(
        // @ts-ignore
        animations as RobotGenericAnimationsWithActions[],
        group
    );

    // useMemo(() => {
    //     scene.traverse((obj: { castShadow: boolean }) => {
    //         obj.castShadow = true;
    //     });
    // }, [scene]);

    useEffect(params.onLoadEffect ? params.onLoadEffect(group) : () => {}, []);

    return { group, scene, nodes, materials, animations, actions };
};
