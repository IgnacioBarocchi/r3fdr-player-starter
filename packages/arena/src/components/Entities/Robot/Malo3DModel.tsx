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
const Malo3DModel: FC<{
  state: StateValue;
  givenDependantGroupRef: React.MutableRefObject<THREE.Group>;
}> = ({ state, givenDependantGroupRef }) => {
  const { group } = use3DModelLogic<GLTFResult>(
    state,
    false,
    path,
    givenDependantGroupRef
  );

  return (
    <group ref={group} dispose={null}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="red" visible={true} />
      </mesh>
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
