// * All the entities have the same model.
// * The actions came bundled as an ActionObject[]
// * The Idle action gets pop from the array while the remaining abilities are filtered.
// * Each unit has 4 non-cancelable abilities with cool downs

import { AnimationAction } from "three";
import { createMachine } from "xstate";
import getAnimationClipMilliseconds from "../lib/getAnimationClipDuration";

export type ActionObject = {
  animationName: string;
  duration?: number;
  isIdle?: boolean;
  isMove?: boolean;
  isTakingDamage?: boolean;
  isTakingStun?: boolean;
  isFinal?: boolean;
};

const getActionByKey = (key: "isIdle" | "isTakingDamage" | "isTakingStun" | "isFinal" | "isMove") => (record: ActionObject) => record[key];
const filterFourAbilities = (actionRecord: ActionObject) => {
  const { isIdle, isMove, isTakingDamage, isTakingStun, isFinal } = actionRecord;
  return !isIdle && !isMove && !isTakingDamage && !isTakingStun && !isFinal;
}

export const ChampionMachineStateEvents = {
  IDLE: "IDLE",
  ABILITY_1: "ABILITY_1",
  ABILITY_2: "ABILITY_2",
  ABILITY_3: "ABILITY_3",
  ABILITY_4: "ABILITY_4",
  MOVE: "MOVE",
  FALL: "FALL",
  DEATH: "DEATH",
  TAKE_DAMAGE: "TAKE_DAMAGE",
  TAKE_STUN: "TAKE_STUN",
} as const;

export const getChampionMachine = (params: { id: string, abilities: ActionObject[] }, animationActionByName: { [x: string]: AnimationAction | null }) => {
  // debugger;
  const fourAbilities = params.abilities.filter(filterFourAbilities);
  const [ability_1, ability_2, ability_3, ability_4] = fourAbilities.map(({ animationName }) => animationName);
  const [ability_1CoolDown, ability_2CoolDown, ability_3CoolDown, ability_4CoolDown] = fourAbilities.map(
    ({ animationName }) => getAnimationClipMilliseconds(animationActionByName, animationName) ?? 1000
  );

  const idle = params.abilities.find(getActionByKey("isIdle"))?.animationName;
  const move = params.abilities.find(getActionByKey("isMove"))?.animationName;
  const takeDamage = params.abilities.find(getActionByKey("isTakingDamage"))?.animationName;
  const fall = params.abilities.find(getActionByKey("isTakingStun"))?.animationName;
  const final = params.abilities.find(getActionByKey("isFinal"))?.animationName;
  if (
    !idle
    || !move
    || !takeDamage
    || !fall
    || !final

  ) {
    throw new Error("INVALID")
  }

  const { IDLE, ABILITY_1, ABILITY_2, ABILITY_3, ABILITY_4, MOVE, FALL, DEATH, TAKE_DAMAGE, TAKE_STUN } = ChampionMachineStateEvents;

  const championState = {
    predictableActionArguments: true,
    id: params.id,
    initial: idle,
    states: {
      [idle]: {
        on: {
          [ABILITY_1]: ability_1,
          [ABILITY_2]: ability_2,
          [ABILITY_3]: ability_3,
          [ABILITY_4]: ability_4,
          [MOVE]: move,
          [FALL]: fall,
          [DEATH]: final,
          [TAKE_DAMAGE]: takeDamage,
          [TAKE_STUN]: fall,
        },
      },
      [ability_1]: {
        after: {
          [ability_1CoolDown]: idle,
        },
      },
      [ability_2]: {
        after: {
          [ability_2CoolDown]: idle,
        },
      },
      [ability_3]: {
        after: {
          [ability_3CoolDown]: idle,
        },
      },
      [ability_4]: {
        after: {
          [ability_4CoolDown]: idle,
        },
      },
      [move]: {
        on: {
          [IDLE]: idle,
          [ABILITY_1]: ability_1,
          [ABILITY_2]: ability_2,
          [ABILITY_3]: ability_3,
          [ABILITY_4]: ability_4,
          [MOVE]: move,
          [DEATH]: final,
          [TAKE_DAMAGE]: takeDamage,
          [TAKE_STUN]: fall,
        },
      },
      [takeDamage]: {
        on: {
          after: {
            1000: idle,
          },
        }
      },
      [fall]: {
        on: {
          after: {
            1000: idle,
          },
        }
      },
      [final]: {
        // keep the string literal
        type: "final",
      },
    },
  }

  console.log(championState)
  return createMachine(championState)
}

