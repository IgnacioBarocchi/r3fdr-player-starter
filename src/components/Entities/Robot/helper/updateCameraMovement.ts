import { RootState } from "@react-three/fiber";
import { Vector3 } from "three";

/**
 * Camera Movement
 */
export default function updateCameraMovement(
  state: RootState,
  robotPosition: Vector3
) {
  const cameraPosition = new Vector3();
  cameraPosition.copy(robotPosition);

  cameraPosition.z += 5;
  cameraPosition.y += 2.5;

  const cameraTarget = new Vector3();
  cameraTarget.copy(robotPosition);
  cameraTarget.y += 0.25;

  state.camera.position.copy(cameraPosition);
  state.camera.lookAt(cameraTarget);
}
