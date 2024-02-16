export interface Keys {
  forward: boolean;
  backward: boolean;
  leftward: boolean;
  rightward: boolean;
  ability_3: boolean;
  ability_1: boolean;
  ability_2: boolean;
}

export const PlayerInputActions = {
  forward: "forward",
  backward: "backward",
  leftward: "leftward",
  rightward: "rightward",
  ability_3: "ability_3",
  ability_1: "ability_1",
  ability_2: "ability_2",
} as const;

const { forward, backward, leftward, rightward, ability_3, ability_1, ability_2 } =
  PlayerInputActions;

const keysMap = [
  { name: forward, keys: ["ArraowUp", "KeyW"] },
  { name: backward, keys: ["ArraowDown", "KeyS"] },
  { name: leftward, keys: ["ArraowLeft", "KeyA"] },
  { name: rightward, keys: ["ArraowRight", "KeyD"] },
  { name: ability_1, keys: ["KeyJ"] },
  { name: ability_2, keys: ["KeyK"] },
  { name: ability_3, keys: ["KeyL"] },
  { name: "cam1", keys: ["1"] },
  { name: "cam2", keys: ["2"] },
  { name: "cam3", keys: ["3"] },
];

export default keysMap;
