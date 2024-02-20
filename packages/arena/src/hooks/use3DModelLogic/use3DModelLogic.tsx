import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';

import { AppContext } from '../../providers/GameSettingsProvider';
import { ChampionMachineStateEvents } from '../../constants/ChampionStateMachineObject';
import { Group } from 'three';
import { StateValue } from 'xstate';
import getAnimationClipMilliseconds from '../../lib/getAnimationClipDuration';
import { useContext } from 'react';
import { useGameStore } from '../useGameStore/useGameStore';

export const use3DModelLogic = <T,>(
    state: StateValue,
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

    // useEffect(() => {
    //     let timeout = 0;

    //     if (!state) return;
    //     const currentAnimation = state;
    //     if (!actions || !actions[currentAnimation]) return;

    //     const currentAction = actions[currentAnimation as string];
    //     if (['Running', 'Idle'].includes(currentAnimation as string)) {
    //         currentAction?.reset()?.fadeIn(0.2)?.play();

    //         return () => {
    //             currentAction?.fadeOut(0.2);
    //         };
    //     } else {
    //         const millisecondsOfAnimation = getAnimationClipMilliseconds(
    //             actions,
    //             currentAnimation as string
    //         );

    //         currentAction?.reset()?.play();

    //         timeout = setTimeout(() => {
    //             currentAction?.stop();
    //         }, millisecondsOfAnimation);
    //     }

    //     return () => {
    //         currentAction?.fadeOut(0.2);
    //         clearTimeout(timeout);
    //     };
    // }, [state]);

    useEffect(() => {
        let timeoutId = 0;

        if (!state) return;

        const currentAnimation = state as string;
        if (!actions || !actions[currentAnimation]) return;

        const currentAction = actions[currentAnimation];
        const isRunningOrIdle = ['Running', 'Idle'].includes(currentAnimation);

        const handleCleanup = () => {
            currentAction?.fadeOut(0.2);
            clearTimeout(timeoutId);
        };

        if (isRunningOrIdle) {
            currentAction?.reset()?.fadeIn(0.2)?.play();
            return handleCleanup;
        }

        const millisecondsOfAnimation = getAnimationClipMilliseconds(
            actions,
            currentAnimation
        );

        currentAction?.reset()?.play();

        timeoutId = setTimeout(() => {
            currentAction?.stop();
            handleCleanup();
        }, millisecondsOfAnimation);

        return () => {
            handleCleanup();
        };
    }, [state, actions]);

    return { group, scene, nodes, materials, animations };
};

// setCharacterState({
//     ...characterState,
//     ...{ ability: currentAnimation },
// });
// setCharacterState({
//     ...characterState,
//     ...{ ability: ChampionMachineStateEvents.IDLE },
// });
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
