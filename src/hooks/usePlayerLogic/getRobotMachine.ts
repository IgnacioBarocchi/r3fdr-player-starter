import { AnimationAction } from "three";
import { createMachine } from "xstate";
import getAnimationClipMilliseconds from "../../lib/getAnimationClipDuration";

export const stateEvents = {
  IDLE: "idle",
  ROBOT_PUNCH: "ROBOT_PUNCH",
  ROBOT_SHOOT: "ROBOT_SHOOT",
  WALK: "WALK",
  DEATH: "DEATH",
  ROBOT_JUMP: "ROBOT_JUMP",
} as const;

export const RobotMachineStateValues = {
  idle: "idle",
  punch: "punch",
  shoot: "shoot",
  jump: "jump",
  walk: "walk",
  death: "death",
} as const;

const { idle, punch, shoot, jump, walk, death } = RobotMachineStateValues;

const getRobotMachine = (actions: { [x: string]: AnimationAction | null }) => {
  const nonLoopables = [
    "RobotArmature|Robot_Punch",
    "RobotArmature|Robot_Jump",
  ];

  const [punchCooldown, jumpCooldown] = nonLoopables.map(
    (animation) => getAnimationClipMilliseconds(actions, animation) ?? 1000
  );

  return createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGigEMBbMAYQAtCAnQgYwBcxr8QAHLWASwa6w1YAPRAFoAbOgCeosQDoADIsUBGAMwBWAEwBOTWM2rVyNCCKlKNek2qyuEADZhWHbr35DE67bO3aAHOoBACxiYkF+YRIg0ghq3tr6mprKXv5emn7G6GbkVLSMzLJsAK4YdBTOnDx8AkggwgheCn7yAOy+6m1aLUFSiJpNQQNBrUHy2m3J6kFZpiS5lgU2sBRYWAyVrjUejfFpwaHhkX0IfsqyI35BQcrtGQOtmrM5FvnWsgBWxcRsm9XudQaTV8AQOYQiIROqluPnGmlaqiC6mUejE6iMJheeSshQA7oR7ABrP5uWqgIF7UHTQ4QqIxVQTWR+TRIlmjEIDDHZeavHE2XCEBgVOouf5k+qIIYnZT+C4heSacZieRjIbGYxAA */
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
