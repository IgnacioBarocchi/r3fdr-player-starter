export const Scenarios = {
  ROBOT_PEN: "ROBOT_PEN",
  MILKING_PARLOR: "MILKING_PARLOR",
  ANIMAL_TRANSPORT_TRAILER: "ANIMAL_TRANSPORT_TRAILER",
} as const;

export type Scenario = keyof typeof Scenarios;
