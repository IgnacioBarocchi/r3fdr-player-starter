import { AnimationAction } from "three";
import { createMachine } from "xstate";
import getAnimationClipMilliseconds from "../lib/getAnimationClipDuration";

export const stateEvents = {
  IDLE: "idle",
  ROBOT_PUNCH: "ROBOT_PUNCH",
  ROBOT_SHOOT: "ROBOT_SHOOT",
  WALK: "WALK",
  DEATH: "DEATH",
  ROBOT_JUMP: "ROBOT_JUMP",
} as const;

export const RobotMachineStates = {
  idle: "idle",
  punch: "punch",
  shoot: "shoot",
  jump: "jump",
  walk: "walk",
  death: "death",
} as const;

const { idle, punch, shoot, jump, walk, death } = RobotMachineStates;

const getRobotMachine = (actions: { [x: string]: AnimationAction | null }) => {
  const nonLoopables = [
    "RobotArmature|Robot_Punch",
    "RobotArmature|Robot_Jump",
  ];

  const [punchCooldown, jumpCooldown] = nonLoopables.map(
    (animation) => getAnimationClipMilliseconds(actions, animation) ?? 1000
  );
  return createMachine({
    predictableActionArguments: true,
    id: "gameCharacter",
    initial: "idle",
    states: {
      idle: {
        on: {
          ROBOT_PUNCH: punch,
          ROBOT_SHOOT: shoot,
          ROBOT_JUMP: jump,
          WALK: walk,
          DEATH: death,
        },
      },
      punch: {
        after: {
          [1 * punchCooldown]: idle,
        },
      },
      shoot: {
        after: {
          [1 * punchCooldown]: idle,
        },
      },
      jump: {
        after: {
          [1 * jumpCooldown]: idle,
        },
      },
      walk: {
        on: {
          idle: idle,
          ROBOT_JUMP: jump,
          ROBOT_PUNCH: punch,
          ROBOT_SHOOT: shoot,
          WALK: walk,
          DEATH: death,
        },
      },
      death: {
        type: "final",
      },
    },
  });
};

export default getRobotMachine;
