import { AnimationAction } from "three";

export default function getAnimationClipMilliseconds(
  actions: {
    [x: string]: AnimationAction | null;
  },
  animation: string
): number {
  if (actions[animation]?.getClip().duration!) {
    return actions[animation]?.getClip().duration! * 1000;
  }

  return 1000;
}
