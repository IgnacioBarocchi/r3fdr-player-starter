export interface Keys {
  forward: boolean;
  backward: boolean;
  leftward: boolean;
  rightward: boolean;
  jump: boolean;
  punch: boolean;
  shoot: boolean;
}

export const PlayerInputActions = {
  forward: "forward",
  backward: "backward",
  leftward: "leftward",
  rightward: "rightward",
  jump: "jump",
  punch: "punch",
  shoot: "shoot",
} as const;

const { forward, backward, leftward, rightward, jump, punch, shoot } =
  PlayerInputActions;

const keysMap = [
  { name: forward, keys: ["ArraowUp", "KeyW"] },
  { name: backward, keys: ["ArraowDown", "KeyS"] },
  { name: leftward, keys: ["ArraowLeft", "KeyA"] },
  { name: rightward, keys: ["ArraowRight", "KeyD"] },
  { name: jump, keys: ["Space"] },
  { name: punch, keys: ["KeyJ"] },
  { name: shoot, keys: ["KeyK"] },
];

export default keysMap;
