import { FC } from "react";
import { RobotGLTFResult } from "../components/Entities/Robot/types/Robot3DModel";
import { useGLTF } from "@react-three/drei";

export const EntityModel = {
  // Robot: "/models/Robot.glb",
  Robot: "/models/BoxerRobot.gltf",
};

const GLTFFileProvider: FC<{
  children: React.ReactNode | JSX.Element;
  modelURL: keyof typeof EntityModel;
}> = (children, modelURL): JSX.Element => {
  // the reason of the destructurting is the dependency inversion
  const { nodes, materials, animations } = useGLTF(modelURL) as RobotGLTFResult;
  // @ts-ignore
  return children(nodes, materials, animations);
};

export default GLTFFileProvider;
