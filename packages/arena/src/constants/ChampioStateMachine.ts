// * All the entities have the same model.
// * The actions came bundled as an ActionObject[]
// * The Idle action gets pop from the array while the remaining abilities are filtered.
// * Each unit has 4 non-cancelable abilities with cool downs

import { AnimationAction } from "three";
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
  const { duration, isIdle, isTakingDamage, isTakingStun, isFinal } = actionRecord;
  return duration && !isIdle && !isTakingDamage && !isTakingStun && !isFinal;
}

export const ChampionMachineStateEvents = {
  ABILITY_1: "ABILITY_1",
  ABILITY_2: "ABILITY_2",
  ABILITY_3: "ABILITY_3",
  ABILITY_4: "ABILITY_4",
  MOVE: "MOVE",
  FALL: "FALL",
  DEATH: "DEATH",
  TAKE_DAMAGE: "TAKE_DAMAGE",
} as const;

export const getChampionMachine = (params: { id: string, abilities: ActionObject[] }, animationActionByName: { [x: string]: AnimationAction | null }) => {
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

  const { ABILITY_1, ABILITY_2, ABILITY_3, ABILITY_4, MOVE, FALL, DEATH, TAKE_DAMAGE } = ChampionMachineStateEvents;

  return ({
    predictableActionArguments: true,
    id: params.id,
    initial: "idle",
    idle: {
      on: {
        [ABILITY_1]: ability_1,
        [ABILITY_2]: ability_2,
        [ABILITY_3]: ability_3,
        [ABILITY_4]: ability_4,
        [MOVE]: move,
        [FALL]: fall,
        [DEATH]: final,
        [TAKE_DAMAGE]: takeDamage,
      },
    },
    ability_1: {
      after: {
        [ability_1CoolDown]: idle,
      },
    },
    ability_2: {
      after: {
        [ability_2CoolDown]: idle,
      },
    },
    ability_3: {
      after: {
        [ability_3CoolDown]: idle,
      },
    },
    ability_4: {
      after: {
        [ability_4CoolDown]: idle,
      },
    },
    move: {
      on: {
        idle: idle,
        [ABILITY_1]: ability_1,
        [ABILITY_2]: ability_2,
        [ABILITY_3]: ability_3,
        [ABILITY_4]: ability_4,
        [MOVE]: move,
        [DEATH]: final,
        [TAKE_DAMAGE]: takeDamage
      },
    },
    takeDamage: {
      on: {
        after: {
          1000: idle,
        },
      }
    },
    final: {
      type: "final",
    },
  })
}

