export const Scenarios = {
  COW_PEN: "COW_PEN",
  MILKING_PARLOR: "MILKING_PARLOR",
  ANIMAL_TRANSPORT_TRAILER: "ANIMAL_TRANSPORT_TRAILER",
} as const;

export type Scenario = keyof typeof Scenarios;
