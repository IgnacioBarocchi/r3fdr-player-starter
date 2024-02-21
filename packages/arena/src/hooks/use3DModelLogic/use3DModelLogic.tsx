import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';

import { AppContext } from '../../providers/GameSettingsProvider';
import { Group } from 'three';
import { useContext } from 'react';
import { useGameStore } from '../useGameStore/useGameStore';

// !register 3dmodel load + reference.
export const use3DModelLogic = <T,>(
    player: boolean,
    modelPath: string,
    givenDependantGroupRef?: React.MutableRefObject<THREE.Group>
): ModelResultType<T> => {
    const {
        state: { GRAPHICS },
    } = useContext(AppContext);

    const group = givenDependantGroupRef
        ? givenDependantGroupRef
        : useRef<Group>(null);

    const { scene, nodes, materials, animations } = useGLTF(
        modelPath
    ) as unknown as ModelResultType<T>;

    // @ts-ignore
    const { actions } = useAnimations<RobotGenericAnimationsWithActions>(
        // @ts-ignore
        animations as RobotGenericAnimationsWithActions[],
        group
    );

    const { characterState, setCharacterState } = useGameStore((state) => ({
        characterState: state.characterState,
        setCharacterState: state.setCharacterState,
    }));

    useMemo(() => {
        if (GRAPHICS === 'LOW') return;

        scene.traverse((obj) => {
            obj.castShadow = true;

            if (GRAPHICS === 'HIGH') {
                obj.receiveShadow = true;
            }
        });
    }, [scene, GRAPHICS]);

    useEffect(() => {
        if (player) {
            if (group?.current !== null || group?.current !== undefined) {
                const payload = group?.current;
                setCharacterState({ ...characterState, ...{ group: payload } });
            }
        }
    }, []);

    return { group, scene, nodes, materials, animations, actions };
};

type ModelResultType<T> = {
    scene: Group;
    nodes: {
        mesh: THREE.SkinnedMesh;
        mixamorigHips: THREE.Bone;
    };
    materials: {
        robot: THREE.MeshStandardMaterial;
    };
    animations: T;
    group: React.RefObject<Group>;
};

// setCharacterState({
//     ...characterState,
//     ...{ ability: currentAnimation },
// });
// setCharacterState({
//     ...characterState,
//     ...{ ability: ChampionMachineStateEvents.IDLE },
// });
