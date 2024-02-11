const BASE_PATH = "/models";

export const EntityNames = {
  ROBOT: "ROBOT",
} as const;

export const SensorNames = {
  ROBOT_SENSOR: "ROBOT_SENSOR",
} as const;

export const Dooads = {
  ROBOT_CELL: "ROBOT_CELL",
} as const;

export const ModelUrlByName = {
  [EntityNames.ROBOT]: `${BASE_PATH}/Robot.glb`,
};

export const Hitboxes = {
  FIST: "FIST",
  GEAR: "GEAR",
};

export type Hitbox = (typeof Hitboxes)[keyof typeof Hitboxes];
export type Entity = (typeof EntityNames)[keyof typeof EntityNames];
export type EntitySensor = (typeof SensorNames)[keyof typeof SensorNames];
