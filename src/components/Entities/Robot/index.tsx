import {
  CapsuleCollider as Bounding,
  RigidBody,
  CylinderCollider as Sensor,
} from "@react-three/rapier";

import { FC } from "react";
import { PositionalAudio } from "@react-three/drei";
import Robot3DModel from "./Robot3DModel";
import RobotHitbox from "./RobotHitbox";
import { RobotMachineStateValues } from "../../../hooks/usePlayerLogic/getRobotMachine";
import { usePlayerLogic } from "../../../hooks/usePlayerLogic/usePlayerLogic";

const Robot: FC<{ useOrbitControls: boolean }> = ({ useOrbitControls }) => {
  const { robotBody, orientation, machineState } =
    usePlayerLogic(useOrbitControls);

  return (
    <RigidBody lockRotations={true} colliders={false} ref={robotBody}>
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

// onCollisionEnter={({ other: { rigidBodyObject } }) => {
//   // const val = String(rigidBodyObject?.name === "FLOOR");
//   // console.log(val);
//   // // ? que es esta poronga
//   // isOnFloor.current = val;
// }}
