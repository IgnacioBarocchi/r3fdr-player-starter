import NORMALIZED_ANGLES from "../../../../lib/normalizedTurnAngles";
import { Vector3 } from "three";
import getNormalizedTurnAngle from "../../../../lib/getNormalizedTurnAngle";
const ORTHOGONAL_DIRECTIONS = {
  BACKWARD: "BACKWARD",
  FORWARD: "FORWARD",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
} as const;

const getOrthogonalDirection = (orientation: number) => {
  if (orientation === 0) return ORTHOGONAL_DIRECTIONS.BACKWARD;

  const forward = Math.PI;
  const left = Math.PI / 2;
  const backward = 2 * Math.PI;
  const right = Math.PI / 2 + Math.PI;

  if (Math.abs(orientation - forward) < Number.EPSILON)
    return ORTHOGONAL_DIRECTIONS.FORWARD;
  // * First check right
  if (Math.abs(orientation - right) < Number.EPSILON)
    return ORTHOGONAL_DIRECTIONS.LEFT;
  if (Math.abs(orientation - left) < Number.EPSILON)
    return ORTHOGONAL_DIRECTIONS.RIGHT;
  if (Math.abs(orientation - backward) < Number.EPSILON)
    return ORTHOGONAL_DIRECTIONS.BACKWARD;
};

export default function getHitboxImpulse(orientation: number): Vector3 {
  const turnAngle = getNormalizedTurnAngle(orientation);
  if (turnAngle === NORMALIZED_ANGLES.TOP_LEFT) return new Vector3(-1, 0, -1);
  if (turnAngle === NORMALIZED_ANGLES.BOTTOM_LEFT) return new Vector3(-1, 0, 1);
  if (turnAngle === NORMALIZED_ANGLES.BOTTOM_RIGHT) return new Vector3(1, 0, 1);
  if (turnAngle === NORMALIZED_ANGLES.TOP_RIGHT) return new Vector3(1, 0, -1);

  const orthogonalDirection = getOrthogonalDirection(orientation);
  if (orthogonalDirection === ORTHOGONAL_DIRECTIONS.RIGHT) {
    return new Vector3(1, 0, 0);
  }
  if (orthogonalDirection === ORTHOGONAL_DIRECTIONS.LEFT) {
    return new Vector3(-1, 0, 0);
  }
  if (orthogonalDirection === ORTHOGONAL_DIRECTIONS.FORWARD) {
    return new Vector3(0, 0, -1);
  }
  if (orthogonalDirection === ORTHOGONAL_DIRECTIONS.BACKWARD) {
    return new Vector3(0, 0, 1);
  }

  return new Vector3(0, 0, 0);
}
