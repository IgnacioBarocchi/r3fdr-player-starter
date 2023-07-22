import {
  CapsuleCollider as Bounding,
  RapierRigidBody,
  RigidBody,
  CylinderCollider as Sensor,
} from "@react-three/rapier";
import { Euler, Group, Quaternion, Vector3 } from "three";
import { FC, useRef, useState } from "react";
import {
  PositionalAudio,
  useAnimations,
  useGLTF,
  useKeyboardControls,
} from "@react-three/drei";
import getRobotMachine, {
  RobotMachineStates,
} from "../../../machines/getRobotMachine";

import { Keys } from "../../../lib/keysMap";
import Robot3DModel from "./Robot3DModel";
import RobotHitbox from "./RobotHitbox";
import getImpulse from "./helper/getImpulse";
import getMachineStateFromInputtedKeys from "./helper/getMachineStateFromInputtedKeys";
import updateCameraMovement from "./helper/updateCameraMovement";
import updateOrientation from "./helper/updateOrientation";
import { useFrame } from "@react-three/fiber";
import { useMachine } from "@xstate/react";

const Robot: FC<{ useOrbitControls: boolean }> = ({ useOrbitControls }) => {
  const cowBody = useRef<RapierRigidBody>(null);
  // todo orientation with signals
  const [orientation, setOrientation] = useState(Math.PI);
  const [_, getKeys] = useKeyboardControls() as unknown as [null, () => Keys];
  const [machineState, send] = useMachine(
    getRobotMachine(
      useAnimations(useGLTF("/models/Robot.glb").animations, new Group())
        .actions
    )
  );

  useFrame((rootState, delta) => {
    if (!cowBody.current) return;
    const keys = getKeys() as unknown as Keys;
    const numberOfKeysPressed = Object.values(keys).filter((key) => key).length;

    send(
      numberOfKeysPressed > 0 ? getMachineStateFromInputtedKeys(keys) : "idle"
    );

    const linearVelocityYaxis: number | undefined = cowBody.current?.linvel().y;
    const impulse = getImpulse(
      linearVelocityYaxis,
      keys,
      numberOfKeysPressed,
      delta
    );

    cowBody.current.setLinvel(impulse, false);

    updateOrientation(orientation, setOrientation, keys);

    const quaternionRotation = new Quaternion();
    quaternionRotation.setFromEuler(new Euler(0, orientation, 0));
    cowBody.current.setRotation(quaternionRotation, false);

    const cowVectorialPosition = cowBody.current.translation();

    if (!useOrbitControls) {
      updateCameraMovement(
        rootState,
        cowVectorialPosition as unknown as Vector3
      );
    }
  });

  return (
    <RigidBody lockRotations={true} colliders={false} ref={cowBody}>
      <Bounding args={[0.2, 0.6]} position={[0, 0.5, 0.2]} />
      <Sensor args={[0.2, 2]} position={[0, 0.5, 0]} sensor />
      <Robot3DModel state={machineState.value} />
      {[RobotMachineStates.punch, RobotMachineStates.shoot].includes(
        // @ts-ignore
        machineState.value
      ) && <RobotHitbox orientation={orientation} state={machineState.value} />}
      {machineState.matches(RobotMachineStates.walk) && (
        <PositionalAudio
          load
          autoplay
          loop
          distance={10}
          url="/sounds/Cow/step.mp3"
        />
      )}
    </RigidBody>
  );
};

export default Robot;
