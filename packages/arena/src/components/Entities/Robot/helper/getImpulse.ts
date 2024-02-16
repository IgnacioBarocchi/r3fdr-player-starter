import { Keys } from "../../../../lib/keysMap";

export default function getImpulse(
  linvelY: number,
  keys: Keys,
  numberOfKeysPressed: number,
  delta: number,
) {
  let { forward, backward, leftward, rightward } = keys;
  const scaler = 20;
  const speed = 6 * scaler;
  // * Reduce speed value if it's diagonal movement to always keep the same speed
  const normalizedSpeed =
    numberOfKeysPressed == 1
      ? speed * delta
      : Math.sqrt(2) * (speed / 2) * delta;

  if (forward && backward && numberOfKeysPressed === 2) forward = false;

  if (leftward && rightward && numberOfKeysPressed === 2) leftward = false;
  // console.log(linvelY);
  let impulse = {
    x: leftward ? -normalizedSpeed : rightward ? normalizedSpeed : 0,
    y: linvelY,
    z: forward ? -normalizedSpeed : backward ? normalizedSpeed : 0,
  };

  return impulse;
}
