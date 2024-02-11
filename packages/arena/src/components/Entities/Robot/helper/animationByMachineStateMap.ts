import { AnimationClips, RobotAnimationClipName } from "../types/Robot3DModel";

import { StateValue } from "xstate";

const { IDLE, ROBOT_PUNCH, ROBOT_KICK, ROBOT_JUMP, WALK, DEATH } =
  AnimationClips;

const animationsByMachineStateMap = new Map<
  StateValue,
  | RobotAnimationClipName[]
  | (typeof AnimationClips)[keyof typeof AnimationClips]
>(
  Object.entries({
    idle: IDLE,
    punch: ROBOT_PUNCH,
    kick: ROBOT_KICK,
    walk: WALK,
    death: DEATH,
    jump: ROBOT_JUMP,
  })
);

export default animationsByMachineStateMap;
