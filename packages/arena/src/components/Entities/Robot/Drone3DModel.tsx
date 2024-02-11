import * as THREE from "three";

import { EntityModel } from "../../../providers/GLTFProvider";
import { FC } from "react";
import { GLTF } from "three-stdlib";
import { StateValue } from "xstate";
import { use3DModelLogic } from "../../../hooks/use3DModelLogic/use3DModelLogic";
import { useGLTF } from "@react-three/drei";

type GLTFResult = GLTF & {
  nodes: {
    mesh: THREE.Mesh;
  };
  materials: {
    base_material: THREE.MeshStandardMaterial;
  };
};

const path = EntityModel.Drone;
export const Drone3DModel: FC<{
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
    // @ts-ignore
    <group ref={group} dispose={null}>
      <mesh
        // @ts-ignore
        geometry={nodes.mesh.geometry}
        // @ts-ignore
        material={materials.base_material}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
};

useGLTF.preload(path);
