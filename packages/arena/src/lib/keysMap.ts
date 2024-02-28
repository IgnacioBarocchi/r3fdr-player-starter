export interface Keys {
  forward: boolean;
  backward: boolean;
  leftward: boolean;
  rightward: boolean;
  skill_1: boolean;
  skill_2: boolean;
  skill_3: boolean;
  skill_4: boolean;
}

export const PlayerInputActions = {
  forward: "forward",
  backward: "backward",
  leftward: "leftward",
  rightward: "rightward",
  skill_1: "skill_1",
  skill_2: "skill_2",
  skill_4: "skill_4",
  skill_3: "skill_3",
} as const;

const { forward, backward, leftward, rightward, skill_1, skill_2, skill_3, skill_4 } =
  PlayerInputActions;

const keysMap = [
  { name: forward, keys: ["ArraowUp", "KeyW"] },
  { name: backward, keys: ["ArraowDown", "KeyS"] },
  { name: leftward, keys: ["ArraowLeft", "KeyA"] },
  { name: rightward, keys: ["ArraowRight", "KeyD"] },
  { name: skill_1, keys: ["KeyJ"] },
  { name: skill_2, keys: ["KeyK"] },
  { name: skill_3, keys: ["KeyL"] },
  { name: skill_4, keys: ["KeyI"] },
];

export default keysMap;
