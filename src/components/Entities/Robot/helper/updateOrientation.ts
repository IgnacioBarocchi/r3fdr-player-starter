import { Keys } from "../../../../lib/keysMap";
import NORMALIZED_ANGLES from "../../../../lib/normalizedTurnAngles";
import { SetStateAction } from "react";

const { PI, atan2, sin, cos } = Math;

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

  let aTanAngle = atan2(sin(orientation), cos(orientation));
  aTanAngle = aTanAngle < 0 ? aTanAngle + PI * 2 : aTanAngle;
  aTanAngle = Number(aTanAngle.toFixed(3));
  aTanAngle = aTanAngle == 0 ? Number((PI * 2).toFixed(3)) : aTanAngle;

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


  const movingForwardRightward = keysCombinations.forwardRight && aTanAngle != TOP_RIGHT
  if (movingForwardRightward) {
    setOrientation(
      (prevState) =>
        prevState + NORMALIZED_ROTATION_SPEED * (aTanAngle > TOP_RIGHT ? -1 : 1)
    );
  }

  const movingForwardLeftward = keysCombinations.forwardLeft && aTanAngle != TOP_LEFT
  if (movingForwardLeftward) {
    setOrientation(
      (prevState) =>
        prevState + NORMALIZED_ROTATION_SPEED * (aTanAngle > TOP_LEFT ? -1 : 1)
    );
  }

  const movingBackwardRightward = keysCombinations.backwardRight && aTanAngle != BOTTOM_RIGHT
  if (movingBackwardRightward) {
    setOrientation(
      (prevState) =>
        prevState +
        NORMALIZED_ROTATION_SPEED *
        (aTanAngle > BOTTOM_RIGHT && aTanAngle < TOP_LEFT ? -1 : 1)
    );
  }

  const movingBackwardLeftward = keysCombinations.backwardLeft && aTanAngle != BOTTOM_LEFT
  if (movingBackwardLeftward) {
    setOrientation(
      (prevState) =>
        prevState +
        NORMALIZED_ROTATION_SPEED *
        (aTanAngle < TOP_RIGHT || aTanAngle > BOTTOM_LEFT ? -1 : 1)
    );
  }

  const movingRightward = keysCombinations.right && sin(orientation) != 1
  if (movingRightward) {
    setOrientation(
      (prevState) =>
        prevState +
        NORMALIZED_ROTATION_SPEED * (cos(orientation) > 0 ? 1 : -1)
    );
  }

  const movingLeftward = keysCombinations.left && sin(orientation) != -1
  if (movingLeftward) {
    setOrientation(
      (prevState) =>
        prevState +
        NORMALIZED_ROTATION_SPEED * (cos(orientation) > 0 ? -1 : 1)
    );
  }

  const movingForward = keysCombinations.forward && cos(orientation) != -1
  if (movingForward) {
    setOrientation(
      (prevState) =>
        prevState +
        NORMALIZED_ROTATION_SPEED * (sin(orientation) > 0 ? 1 : -1)
    );
  }

  const movingBackward = keysCombinations.backward && cos(orientation) != 1
  if (movingBackward) {
    setOrientation(
      (prevState) =>
        prevState +
        NORMALIZED_ROTATION_SPEED * (sin(orientation) > 0 ? -1 : 1)
    );
  }
}
