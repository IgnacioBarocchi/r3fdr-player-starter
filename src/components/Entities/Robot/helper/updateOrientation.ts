import { SetStateAction } from "react";
import NORMALIZED_ANGLES from "../../../../lib/normalizedTurnAngles";
import { Keys } from "../../../../lib/keysMap";

const {
  NORMALIZED_ROTATION_SPEED,
  TOP_LEFT,
  BOTTOM_LEFT,
  TOP_RIGHT,
  BOTTOM_RIGHT,
} = NORMALIZED_ANGLES;

export default function updateOrientation(
  orientation: number,
  setOrientation: (value: SetStateAction<number>) => void,
  keys: Keys
) {
  let { forward, backward, leftward, rightward } = keys;

  let aTanAngle = Math.atan2(Math.sin(orientation), Math.cos(orientation));
  aTanAngle = aTanAngle < 0 ? aTanAngle + Math.PI * 2 : aTanAngle;
  aTanAngle = Number(aTanAngle.toFixed(3));
  aTanAngle = aTanAngle == 0 ? Number((Math.PI * 2).toFixed(3)) : aTanAngle;

  const keysCombinations = {
    forwardRight: forward && !backward && !leftward && rightward,
    forwardLeft: forward && !backward && leftward && !rightward,
    backwardRight: !forward && backward && !leftward && rightward,
    backwardLeft: !forward && backward && leftward && !rightward,
    forward: forward && !backward && !leftward && !rightward,
    right: !forward && !backward && !leftward && rightward,
    backward: !forward && backward && !leftward && !rightward,
    left: !forward && !backward && leftward && !rightward,
  };

  // Forward-Rightward
  if (keysCombinations.forwardRight && aTanAngle != TOP_RIGHT) {
    setOrientation(
      (prevState) =>
        prevState + NORMALIZED_ROTATION_SPEED * (aTanAngle > TOP_RIGHT ? -1 : 1)
    );
  }

  // Forward-Leftward
  if (keysCombinations.forwardLeft && aTanAngle != TOP_LEFT) {
    setOrientation(
      (prevState) =>
        prevState + NORMALIZED_ROTATION_SPEED * (aTanAngle > TOP_LEFT ? -1 : 1)
    );
  }

  // Backward-Rightward
  if (keysCombinations.backwardRight && aTanAngle != BOTTOM_RIGHT) {
    setOrientation(
      (prevState) =>
        prevState +
        NORMALIZED_ROTATION_SPEED *
          (aTanAngle > BOTTOM_RIGHT && aTanAngle < TOP_LEFT ? -1 : 1)
    );
  }

  // Backward-Leftward
  if (keysCombinations.backwardLeft && aTanAngle != BOTTOM_LEFT) {
    setOrientation(
      (prevState) =>
        prevState +
        NORMALIZED_ROTATION_SPEED *
          (aTanAngle < TOP_RIGHT || aTanAngle > BOTTOM_LEFT ? -1 : 1)
    );
  }

  // Rightward
  if (keysCombinations.right && Math.sin(orientation) != 1) {
    setOrientation(
      (prevState) =>
        prevState +
        NORMALIZED_ROTATION_SPEED * (Math.cos(orientation) > 0 ? 1 : -1)
    );
  }

  // Leftward
  if (keysCombinations.left && Math.sin(orientation) != -1) {
    setOrientation(
      (prevState) =>
        prevState +
        NORMALIZED_ROTATION_SPEED * (Math.cos(orientation) > 0 ? -1 : 1)
    );
  }

  // Forward
  if (keysCombinations.forward && Math.cos(orientation) != -1) {
    setOrientation(
      (prevState) =>
        prevState +
        NORMALIZED_ROTATION_SPEED * (Math.sin(orientation) > 0 ? 1 : -1)
    );
  }

  // Backward
  if (keysCombinations.backward && Math.cos(orientation) != 1) {
    setOrientation(
      (prevState) =>
        prevState +
        NORMALIZED_ROTATION_SPEED * (Math.sin(orientation) > 0 ? -1 : 1)
    );
  }
}
