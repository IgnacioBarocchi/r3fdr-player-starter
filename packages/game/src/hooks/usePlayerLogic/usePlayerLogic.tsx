import { Euler, Group, Quaternion, Vector3 } from "three";
import { RootState, useFrame } from "@react-three/fiber";
import getRobotMachine, {
  RobotMachineStateValues,
  stateEvents,
} from "./getRobotMachine";
import { useAnimations, useGLTF, useKeyboardControls } from "@react-three/drei";
import { useRef, useState } from "react";

import { Keys } from "../../lib/keysMap";
import { RapierRigidBody } from "@react-three/rapier";
import getImpulse from "../../components/Entities/Robot/helper/getImpulse";
import updateOrientation from "../../components/Entities/Robot/helper/updateOrientation";
import { useControls } from "leva";
import { useMachine } from "@xstate/react";

const getMachineStateFromInputtedKeys = (keys: Keys) => {
  const { WALK, ROBOT_JUMP, ROBOT_SHOOT, ROBOT_PUNCH, IDLE } = stateEvents;

  const { forward, backward, leftward, rightward, jump, punch, shoot } = keys;

  if (forward || backward || leftward || rightward) {
    return WALK;
  }

  if (jump) return ROBOT_JUMP;

  if (shoot) return ROBOT_SHOOT;

  if (punch) return ROBOT_PUNCH;

  return IDLE;
};

const updateCameraMovement = (
  state: RootState,
  robotPosition: Vector3,
  robotRotation: Vector3
) => {
  const fixedOffset = new Vector3(0, 2.5, 0); // Initial offset, adjust other values as needed
  // Conditionally update fixedOffset.z based on robotRotation.y
  // console.log(robotRotation.y);
  if (robotRotation.y < 0) {
    fixedOffset.z = -15;
    fixedOffset.x = -15;

    console.log(fixedOffset.z, robotRotation.y);
  } else {
    fixedOffset.z = 5;
    fixedOffset.x = 5;
    console.log(fixedOffset.z, robotRotation.y);
  }

  // Use the character's rotation to rotate the fixed offset
  const rotatedOffset = fixedOffset
    .clone()
    .applyAxisAngle(new Vector3(0, 1, 0), robotRotation.y);

  // Update camera position and target
  const cameraPosition = new Vector3();
  cameraPosition.copy(robotPosition).add(rotatedOffset);

  const cameraTarget = new Vector3();
  cameraTarget.copy(robotPosition);

  // Update the camera
  state.camera.position.copy(cameraPosition);
  state.camera.lookAt(cameraTarget);
};

// const updateCameraMovement = (
//   state: RootState,
//   robotPosition: Vector3,
//   robotRotation: Vector3
// ) => {
//   const fixedOffset = new Vector3(0, 2.5, 5); // Adjust these values to fit your scene
//   // console.log(robotRotation.y);
//   // Use the character's rotation to rotate the fixed offset
//   const rotatedOffset = fixedOffset
//     .clone()
//     .applyAxisAngle(new Vector3(0, 1, 0), robotRotation.y);

//   // Update camera position and target
//   const cameraPosition = new Vector3();
//   cameraPosition.copy(robotPosition).add(rotatedOffset);

//   const cameraTarget = new Vector3();
//   cameraTarget.copy(robotPosition);

//   // Update the camera
//   state.camera.position.copy(cameraPosition);
//   state.camera.lookAt(cameraTarget);
// };

// const updateCameraMovement = (
//   state: RootState,
//   robotPosition: Vector3,
//   robotRotation: Vector3
//   // keys: Keys
// ) => {
//   const distanceFromRobot = 5;
//   const heightAboveRobot = 2.5;

//   // Calculate the offset based on the character's rotation
//   const offset = new Vector3(
//     Math.sin(robotRotation.y) * distanceFromRobot,
//     heightAboveRobot,
//     Math.cos(robotRotation.y) * distanceFromRobot
//   );

//   // Update camera position and target
//   const cameraPosition = new Vector3();
//   cameraPosition.copy(robotPosition).add(offset);

//   const cameraTarget = new Vector3();
//   cameraTarget.copy(robotPosition);

//   // Update the camera
//   state.camera.position.copy(cameraPosition);
//   state.camera.lookAt(cameraTarget);
// };

// Example usage:
// Assuming robotPosition and robotRotation are updated in your animation loop

// const updateCameraMovement = (
//   state: RootState,
//   robotPosition: Vector3,
//   keys: Keys
// ) => {
//   // const { cam1, cam2, cam3 } = keys;

//   const cameraPosition = new Vector3();
//   cameraPosition.copy(robotPosition);

//   const cameraTarget = new Vector3();
//   cameraTarget.copy(robotPosition);

//   // if (cam1) {
//   //   cameraPosition.z = 5;
//   //   cameraPosition.y = 5;
//   //   cameraTarget.y = 0;
//   //   cameraTarget.x += 2;
//   // } else if (cam2) {
//   //   cameraPosition.z = 1;
//   //   cameraPosition.y = 1;
//   //   cameraTarget.y = 0;
//   //   cameraTarget.x += 2;
//   // } else if (cam3) {
//   //   cameraPosition.z += 2;
//   //   cameraPosition.y += 2.5;
//   //   cameraPosition.x += 2.5;
//   // } else {
//   // }
//   cameraPosition.z += 5;
//   cameraPosition.y += 2.5;
//   cameraTarget.y += 0.25;

//   state.camera.position.copy(cameraPosition);
//   state.camera.lookAt(cameraTarget);
//   // state.camera.rotation.copy(cameraTarget);
// };

export const usePlayerLogic = (useOrbitControls: boolean) => {
  // const { myNumber } = useControls({
  //   myNumber: {
  //     value: 4,
  //     min: 0,
  //     max: 10,
  //     step: 1,
  //   },
  // });

  const robotBody = useRef<RapierRigidBody>(null);
  const isOnFloor = useRef<boolean>(true);
  const [orientation, setOrientation] = useState(Math.PI);
  const [_, getKeys] = useKeyboardControls() as unknown as [null, () => Keys];
  const [machineState, send] = useMachine(
    getRobotMachine(
      useAnimations(useGLTF("/models/Robot.glb").animations, new Group())
        .actions
    )
  );

  useFrame((rootState, delta) => {
    if (!robotBody.current) return;
    const keys = getKeys() as unknown as Keys;
    const numberOfKeysPressed = Object.values(keys).filter((key) => key).length;

    send(
      numberOfKeysPressed > 0 ? getMachineStateFromInputtedKeys(keys) : "idle"
    );

    const linearVelocityYaxis: number | undefined =
      robotBody.current?.linvel().y;
    const impulse = getImpulse(
      linearVelocityYaxis,
      keys,
      numberOfKeysPressed,
      delta,
      true
    );

    if (machineState.value === RobotMachineStateValues.jump)
      isOnFloor.current = false;
    robotBody.current.setLinvel(impulse, false);

    updateOrientation(orientation, setOrientation, keys);

    const quaternionRotation = new Quaternion();
    quaternionRotation.setFromEuler(new Euler(0, orientation, 0));
    robotBody.current.setRotation(quaternionRotation, false);

    const robotVectorialPosition = robotBody.current.translation();
    const robotVectorialRotation = robotBody.current.rotation();

    if (!useOrbitControls) {
      updateCameraMovement(
        rootState,
        robotVectorialPosition as unknown as Vector3,
        robotVectorialRotation as unknown as Vector3

        // keys
      );
    }
  });

  return {
    robotBody,
    orientation,
    setOrientation,
    getKeys,
    machineState,
    send,
  };
};
