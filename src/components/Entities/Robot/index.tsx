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
  RobotMachineStateValues,
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
  const robotBody = useRef<RapierRigidBody>(null);
  const isOnFloor = useRef<boolean>(true);
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

    if (!useOrbitControls) {
      updateCameraMovement(
        rootState,
        robotVectorialPosition as unknown as Vector3,
        keys
      );
    }
  });

  return (
    <RigidBody
      lockRotations={true}
      colliders={false}
      ref={robotBody}
      // onCollisionEnter={({ other: { rigidBodyObject } }) => {
      //   // const val = String(rigidBodyObject?.name === "FLOOR");
      //   // console.log(val);
      //   // // ? que es esta poronga
      //   // isOnFloor.current = val;
      // }}
    >
      <Bounding args={[0.2, 0.6]} position={[0, 0.8, 0.2]} />
      <Sensor args={[0.2, 2]} position={[0, 0.5, 0]} sensor />
      <Robot3DModel state={machineState.value} />
      {[RobotMachineStateValues.punch, RobotMachineStateValues.shoot].includes(
        // @ts-ignore
        machineState.value
      ) && <RobotHitbox orientation={orientation} state={machineState.value} />}
      {machineState.matches(RobotMachineStateValues.walk) && (
        <PositionalAudio
          load
          autoplay
          loop
          distance={10}
          url="/sounds/Robot/step.mp3"
        />
      )}
    </RigidBody>
  );
};

export default Robot;
