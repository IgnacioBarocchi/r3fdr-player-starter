import {
  AnimationAction,
  AnimationClip,
  Bone,
  Mesh,
  MeshStandardMaterial,
  SkinnedMesh,
} from "three";

import { GLTF } from "three-stdlib";

export type RobotGLTFResult = GLTF & {
  nodes: {
    FootL_1: Mesh;
    LowerLegL_1: Mesh;
    LegL: Mesh;
    LowerLegR_1: Mesh;
    LegR: Mesh;
    Head_2: Mesh;
    Head_3: Mesh;
    Head_4: Mesh;
    ArmL: Mesh;
    ShoulderL_1: Mesh;
    ArmR: Mesh;
    ShoulderR_1: Mesh;
    Torso_2: Mesh;
    Torso_3: Mesh;
    FootR_1: Mesh;
    HandR_1: SkinnedMesh;
    HandR_2: SkinnedMesh;
    HandL_1: SkinnedMesh;
    HandL_2: SkinnedMesh;
    Bone: Bone;
  };
  materials: {
    Grey: MeshStandardMaterial;
    Main: MeshStandardMaterial;
    Black: MeshStandardMaterial;
  };
};

export type RobotAnimationClipName =
  | "RobotArmature|Robot_Dance"
  | "RobotArmature|Robot_Death"
  | "RobotArmature|Robot_Idle"
  | "RobotArmature|Robot_Jump"
  | "RobotArmature|Robot_No"
  | "RobotArmature|Robot_Punch"
  | "RobotArmature|Robot_Running"
  | "RobotArmature|Robot_Sitting"
  | "RobotArmature|Robot_Standing"
  | "RobotArmature|Robot_ThumbsUp"
  | "RobotArmature|Robot_Walking"
  | "RobotArmature|Robot_WalkJump"
  | "RobotArmature|Robot_Wave"
  | "RobotArmature|Robot_Yes";

export type GLTFActions = Record<RobotAnimationClipName, AnimationAction>;

export const AnimationClips = {
  ROBOT_PUNCH: ["RobotArmature|Robot_Punch"],
  ROBOT_SHOOT: ["RobotArmature|Robot_Punch"],
  DEATH: ["RobotArmature|Robot_Death"],
  IDLE: [
    "RobotArmature|Robot_Idle",
    "RobotArmature|Robot_Dance",
    "RobotArmature|Robot_No",
    "RobotArmature|Robot_ThumbsUp",
  ],
  ROBOT_JUMP: ["RobotArmature|Robot_Jump"],
  WALK: ["RobotArmature|Robot_Running"],
} as const;

export const loopableAnimationClips: Readonly<string[]> = [
  ...AnimationClips.IDLE,
  ...AnimationClips.WALK,
];

export type RobotAnimationClip = keyof typeof AnimationClips;
export type RobotGenericAnimationsWithActions = AnimationClip & GLTFActions;
