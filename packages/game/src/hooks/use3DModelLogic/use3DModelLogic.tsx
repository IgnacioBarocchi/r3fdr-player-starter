import {
  RobotGLTFResult,
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

export const use3DModelLogic = (state: StateValue) => {
  const {
    state: { GRAPHICS },
  } = useContext(AppContext);

  const group = useRef<Group>(null);

  const { scene, nodes, materials, animations } = useGLTF(
    "/models/Robot.glb"
  ) as RobotGLTFResult;

  const { actions } = useAnimations<RobotGenericAnimationsWithActions>(
    animations as RobotGenericAnimationsWithActions[],
    group
  );

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
      const secondsOfDeathAnimation = getAnimationClipMilliseconds(
        actions,
        currentAnimation
      );
      actions[currentAnimation]?.getClip().duration;
      actions[currentAnimation]?.reset().play();

      setTimeout(() => {
        actions[currentAnimation]?.stop();
      }, secondsOfDeathAnimation);
    }

    return () => {
      actions[currentAnimation]?.fadeOut(0.2);
    };
  }, [state]);

  return { group, nodes, materials };
};
