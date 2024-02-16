import {
  RobotGenericAnimationsWithActions,
  loopableAnimationClips,
} from "../../components/Entities/Robot/types/Robot3DModel";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";

import { AppContext } from "../../providers/GameSettingsProvider";
import { Group } from "three";
import { StateValue } from "xstate";
import animationsByMachineStateMap from "../../components/Entities/Robot/helper/animationByMachineStateMap";
import getAnimationClipMilliseconds from "../../lib/getAnimationClipDuration";
import { useContext } from "react";
import { useGameStore } from "../useGameStore/useGameStore";

export const use3DModelLogic = <T,>(
  state: StateValue,
  player: boolean,
  // todo: update type of modelpath
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

  const { actions } = useAnimations<RobotGenericAnimationsWithActions>(
    animations as RobotGenericAnimationsWithActions[],
    group
  );

  const { characterState, setCharacterState } = useGameStore((state) => ({
    characterState: state.characterState,
    setCharacterState: state.setCharacterState,
  }));

  useMemo(() => {
    if (GRAPHICS === "LOW") return;

    scene.traverse((obj) => {
      obj.castShadow = true;

      if (GRAPHICS === "HIGH") {
        obj.receiveShadow = true;
      }
    });
  }, [scene, GRAPHICS]);

  useEffect(() => {
    if (player) {
      if (group?.current !== null || group?.current !== undefined) {
        const payload = group?.current;
        setCharacterState({ ...characterState, ...{ group: payload } });
        console.log(characterState.action);
      }
    }
  }, []);

  useEffect(() => {
    let timeout = 0;
    const availableAnimations = animationsByMachineStateMap?.get(state);
    const currentAnimation = availableAnimations
      ? availableAnimations[
          Math.floor(Math.random() * availableAnimations.length)
        ]
      : undefined;

    if (!actions || !currentAnimation || !actions[currentAnimation] || !state)
      return;

    if (loopableAnimationClips.includes(currentAnimation as string)) {
      actions[currentAnimation]?.reset().fadeIn(0.2).play();

      return () => {
        actions[currentAnimation]?.fadeOut(0.2);
      };
    } else {
      setCharacterState({ ...characterState, ...{ ability: currentAnimation } });

      const secondsOfDeathAnimation = getAnimationClipMilliseconds(
        actions,
        currentAnimation
      );
      // actions[currentAnimation]?.getClip().duration;
      actions[currentAnimation]?.reset().play();

      timeout = setTimeout(() => {
        actions[currentAnimation]?.stop();
        setCharacterState({ ...characterState, ...{ ability: "idle" } });
      }, secondsOfDeathAnimation);
    }

    return () => {
      actions[currentAnimation]?.fadeOut(0.2);
      clearTimeout(timeout)
    };
  }, [state]);

  return { group, scene, nodes, materials, animations };
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
