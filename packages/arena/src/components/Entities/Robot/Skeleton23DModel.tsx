import * as THREE from "three";

import React, { FC } from "react";

import { EntityModel } from "../../../providers/GLTFProvider";
import { GLTF } from "three-stdlib";
import { StateValue } from "xstate";
import { use3DModelLogic } from "../../../hooks/use3DModelLogic/use3DModelLogic";
import { useGLTF } from "@react-three/drei";

const path = EntityModel.Skeleton2;

export const Skeleton23DModel: FC<{
  state: StateValue;
  givenDependantGroupRef: React.MutableRefObject<THREE.Group>;
}> = ({ state, givenDependantGroupRef }) => {
  const { group, nodes, materials } = use3DModelLogic<GLTFResult>(
    state,
    false,
    path,
    givenDependantGroupRef
  );

  return (
    <group ref={group} dispose={null} position={[0, -0.75, 0]}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={2.1}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="mesh"
            geometry={nodes.mesh.geometry}
            // @ts-ignore
            material={materials["Material.001"]}
            skeleton={nodes.mesh.skeleton}
          />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload(path);

type GLTFResult = GLTF & {
  nodes: {
    mesh: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

// type ActionName = "Death" | "Hit" | "Idle" | "Punching" | "Running" | "Stunned";
// type GLTFActions = Record<ActionName, THREE.AnimationAction>;
