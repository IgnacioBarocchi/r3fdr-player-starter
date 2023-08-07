import { Keys } from "../../../../lib/keysMap";
import { RootState } from "@react-three/fiber";
import { Vector3 } from "three";

/**
 * Camera Movement
 */
export default function updateCameraMovement(
  state: RootState,
  robotPosition: Vector3,
  keys: Keys
) {
  const { cam1, cam2, cam3 } = keys;

  const cameraPosition = new Vector3();
  cameraPosition.copy(robotPosition);

  const cameraTarget = new Vector3();
  cameraTarget.copy(robotPosition);

  if (cam1) {
    cameraPosition.z = 5;
    cameraPosition.y = 5;
    cameraTarget.y = 0;
    cameraTarget.x += 2;
  } else if (cam2) {
    cameraPosition.z = 1;
    cameraPosition.y = 1;
    cameraTarget.y = 0;
    cameraTarget.x += 2;
  } else if (cam3) {
    cameraPosition.z += 2;
    cameraPosition.y += 2.5;
    cameraPosition.x += 2.5;
  } else {
    cameraPosition.z += 5;
    cameraPosition.y += 2.5;
    cameraTarget.y += 0.25;
  }

  state.camera.position.copy(cameraPosition);
  state.camera.lookAt(cameraTarget);
}
