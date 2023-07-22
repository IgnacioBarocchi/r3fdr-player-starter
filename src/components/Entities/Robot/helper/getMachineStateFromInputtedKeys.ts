import { Keys } from "../../../../lib/keysMap";
import { stateEvents } from "../../../../machines/getRobotMachine";

const { WALK, ROBOT_JUMP, ROBOT_SHOOT, ROBOT_PUNCH, IDLE } = stateEvents;

export default function getMachineStateFromInputtedKeys(keys: Keys) {
  const { forward, backward, leftward, rightward, jump, punch, shoot } = keys;

  if (forward || backward || leftward || rightward) {
    return WALK;
  }

  if (jump) return ROBOT_JUMP;

  if (shoot) return ROBOT_SHOOT;

  if (punch) return ROBOT_PUNCH;

  return IDLE;
}
