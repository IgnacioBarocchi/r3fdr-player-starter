import { Mesh, MeshStandardMaterial } from "three";

import { GLTF } from "three-stdlib";
import { useGLTF } from "@react-three/drei";

type GLTFResult = GLTF & {
  nodes: {
    Collectible_Gear: Mesh;
  };
  materials: {
    Orange: MeshStandardMaterial;
  };
};

const Gear3DModel = () => {
  const { nodes, materials } = useGLTF("/models/Gear.glb") as GLTFResult;
  return (
    <group dispose={null}>
      <mesh
        geometry={nodes.Collectible_Gear.geometry}
        material={materials.Orange}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
};

useGLTF.preload("/models/Gear.glb");

export default Gear3DModel;
