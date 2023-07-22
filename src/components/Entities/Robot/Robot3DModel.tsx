import { FC, useEffect, useMemo, useRef } from "react";
import {
  RobotGLTFResult,
  RobotGenericAnimationsWithActions,
  loopableAnimationClips,
} from "./types/Robot3DModel";
import { useAnimations, useGLTF } from "@react-three/drei";

import { AppContext } from "../../../containers/context/AppContext";
import { Group } from "three";
import { StateValue } from "xstate";
import animationsByMachineStateMap from "./helper/animationByMachineStateMap";
import getAnimationClipMilliseconds from "../../../lib/getAnimationClipDuration";
import { useContext } from "react";

const Robot3DModel: FC<{ state: StateValue }> = ({ state }) => {
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

    console.log("g" + GRAPHICS);
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

  return (
    <group ref={group} scale={0.3} dispose={null}>
      <group name="Root_Scene">
        <meshStandardMaterial />
        <group name="RootNode">
          <group
            name="RobotArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Bone} />
          </group>
          <group
            name="HandR"
            position={[0, 2.37, -0.02]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              name="HandR_1"
              geometry={nodes.HandR_1.geometry}
              material={materials.Main}
              skeleton={nodes.HandR_1.skeleton}
            />
            <skinnedMesh
              name="HandR_2"
              geometry={nodes.HandR_2.geometry}
              material={materials.Grey}
              skeleton={nodes.HandR_2.skeleton}
            />
          </group>
          <group
            name="HandL"
            position={[0, 2.37, -0.02]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <skinnedMesh
              name="HandL_1"
              geometry={nodes.HandL_1.geometry}
              material={materials.Main}
              skeleton={nodes.HandL_1.skeleton}
            />
            <skinnedMesh
              name="HandL_2"
              geometry={nodes.HandL_2.geometry}
              material={materials.Grey}
              skeleton={nodes.HandL_2.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/models/Robot.glb");

export default Robot3DModel;
