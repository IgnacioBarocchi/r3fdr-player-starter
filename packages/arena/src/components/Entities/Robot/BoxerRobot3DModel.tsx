import * as THREE from "three";

import { EntityModel } from "../../../providers/GLTFProvider";
import { FC } from "react";
import { GLTF } from "three-stdlib";
import { StateValue } from "xstate";
import { use3DModelLogic } from "../../../hooks/use3DModelLogic/use3DModelLogic";
import { useGLTF } from "@react-three/drei";

interface GLTFResult extends GLTF {
  nodes: {
    mesh: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    robot: THREE.MeshStandardMaterial;
  };
}

const path = EntityModel.Robot;
const BoxerRobot: FC<{ state: StateValue }> = ({ state }) => {
  const { group, nodes, materials } = use3DModelLogic<GLTFResult>(
    state,
    true,
    path
  );

  return (
    <group ref={group} dispose={null} position={[0, 0, 0]}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={2.13}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="mesh"
            geometry={nodes.mesh.geometry}
            material={materials.robot}
            skeleton={nodes.mesh.skeleton}
          />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload(path);

export default BoxerRobot;

// type GLTFActions = Record<ActionName, THREE.AnimationAction>;
// type ActionName =
//   | "Hit"
//   | "Idle"
//   | "Jumping"
//   | "Kicking"
//   | "Punching"
//   | "Running";
