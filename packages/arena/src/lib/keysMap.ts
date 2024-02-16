export interface Keys {
  forward: boolean;
  backward: boolean;
  leftward: boolean;
  rightward: boolean;
  ability_1: boolean;
  ability_2: boolean;
  ability_3: boolean;
  ability_4: boolean;
}

export const PlayerInputActions = {
  forward: "forward",
  backward: "backward",
  leftward: "leftward",
  rightward: "rightward",
  ability_1: "ability_1",
  ability_2: "ability_2",
  ability_4: "ability_4",
  ability_3: "ability_3",
} as const;

const { forward, backward, leftward, rightward, ability_1, ability_2, ability_3, ability_4 } =
  PlayerInputActions;

const keysMap = [
  { name: forward, keys: ["ArraowUp", "KeyW"] },
  { name: backward, keys: ["ArraowDown", "KeyS"] },
  { name: leftward, keys: ["ArraowLeft", "KeyA"] },
  { name: rightward, keys: ["ArraowRight", "KeyD"] },
  { name: ability_1, keys: ["KeyJ"] },
  { name: ability_2, keys: ["KeyK"] },
  { name: ability_3, keys: ["KeyL"] },
  { name: ability_4, keys: ["KeyI"] },
];

export default keysMap;
