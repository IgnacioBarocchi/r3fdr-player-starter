import { Euler, Group, Quaternion, Vector3 } from "three";
import { RootState, useFrame } from "@react-three/fiber";
import getPlayerMachine, {
  PlayerMachineStateValues,
  stateEvents,
} from "./getPlayerMachine";
import { useAnimations, useGLTF, useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

import { EntityModel } from "../../providers/GLTFProvider";
import { Keys } from "../../lib/keysMap";
import { RapierRigidBody } from "@react-three/rapier";
import getImpulse from "../../components/Entities/Robot/helper/getImpulse";
import updateOrientation from "../../components/Entities/Robot/helper/updateOrientation";
import { useGameStore } from "../useGameStore/useGameStore";
import { useMachine } from "@xstate/react";

const getMachineStateFromInputtedKeys = (keys: Keys) => {
  const { WALK, ROBOT_JUMP, ROBOT_KICK, ROBOT_PUNCH, IDLE } = stateEvents;

  const { forward, backward, leftward, rightward, jump, punch, kick } = keys;

  if (forward || backward || leftward || rightward) {
    return WALK;
  }

  if (jump) return ROBOT_JUMP;

  if (kick) return ROBOT_KICK;

  if (punch) return ROBOT_PUNCH;

  return IDLE;
};

const updateCameraMovement = (
  state: RootState,
  robotPosition: Vector3,
  robotRotation: Vector3
) => {
  const fixedOffset = new Vector3(0, 15, 15);

  const rotatedOffset = fixedOffset
    .clone()
    .applyAxisAngle(new Vector3(0, 1, 0), robotRotation.y);

  const cameraPosition = new Vector3();
  cameraPosition.copy(robotPosition).add(rotatedOffset);

  const cameraTarget = new Vector3();
  cameraTarget.copy(robotPosition);

  state.camera.position.copy(cameraPosition);
  state.camera.lookAt(cameraTarget);
};

export const usePlayerLogic = (
  useOrbitControls: boolean,
  player: (typeof EntityModel)[keyof typeof EntityModel]
) => {
  const robotBody = useRef<RapierRigidBody>(null);
  const isOnFloor = useRef<boolean>(true);
  const [orientation, setOrientation] = useState(Math.PI);
  const [_, getKeys] = useKeyboardControls() as unknown as [null, () => Keys];
  const [machineState, send] = useMachine(
    getPlayerMachine(
      useAnimations(useGLTF(player).animations, new Group()).actions
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

    if (machineState.value === PlayerMachineStateValues.jump)
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
