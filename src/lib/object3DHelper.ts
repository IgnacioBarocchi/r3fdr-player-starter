const BASE_PATH = "/models";

export const EntityNames = {
  COW: "COW",
  COW_DUMMY: "COW_DUMMY",
  FARMER: "FARMER",
  MWORKER: "MWORKER",
  FWORKER: "FWORKER",
} as const;

export const SensorNames = {
  COW_SENSOR: "COW_SENSOR",
} as const;

export const Dooads = {
  COW_CELL: "COW_CELL",
} as const;

export const ModelUrlByName = {
  [EntityNames.COW]: `${BASE_PATH}/Cow.gltf`,
  [EntityNames.COW_DUMMY]: `${BASE_PATH}/CowDummy.glb`,
  [EntityNames.FWORKER]: `${BASE_PATH}/FWorker.glb`,
  [EntityNames.MWORKER]: `${BASE_PATH}/MWorker.glb`,
  [EntityNames.FARMER]: `${BASE_PATH}/Farmer.glb`,
  [Dooads.COW_CELL]: `${BASE_PATH}/Cowcell.gltf`,
};

export const Hitboxes = {
  FIST: "FIST",
  GEAR: "GEAR",
};

export type Hitbox = (typeof Hitboxes)[keyof typeof Hitboxes];
export type Entity = (typeof EntityNames)[keyof typeof EntityNames];
export type EntitySensor = (typeof SensorNames)[keyof typeof SensorNames];
