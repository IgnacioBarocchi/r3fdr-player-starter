import * as THREE from "three";

import { Box, useGLTF } from "@react-three/drei";

import { EntityModel } from "../../../providers/GLTFProvider";
import { FC } from "react";
import { GLTF } from "three-stdlib";
import { StateValue } from "xstate";
import { use3DModelLogic } from "../../../hooks/use3DModelLogic/use3DModelLogic";

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
const Malo3DModel: FC<{ state: StateValue }> = ({ state }) => {
  const { group } = use3DModelLogic<GLTFResult>(state, false, path);

  return (
    <group ref={group} dispose={null}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="blue" visible={true} />
      </mesh>
      {/* <Box args={[3, 3, 3]} />
      <meshBasicMaterial color="green" /> */}
      {/* <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={2.13}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="mesh"
            geometry={nodes.mesh.geometry}
            material={materials.robot}
            skeleton={nodes.mesh.skeleton}
          />
        </group>
      </group> */}
    </group>
  );
};

useGLTF.preload(path);

export default Malo3DModel;

// type GLTFActions = Record<ActionName, THREE.AnimationAction>;
// type ActionName =
//   | "Hit"
//   | "Idle"
//   | "Jumping"
//   | "Kicking"
//   | "Punching"
//   | "Running";
