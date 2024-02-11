import {
  CapsuleCollider as Bounding,
  RigidBody,
  CylinderCollider as Sensor,
} from "@react-three/rapier";

import BoxerRobot from "./BoxerRobot3DModel";
import { EntityModel } from "../../../providers/GLTFProvider";
import { FC } from "react";
import { PlayerMachineStateValues } from "../../../hooks/usePlayerLogic/getPlayerMachine";
import { PositionalAudio } from "@react-three/drei";
import RobotHitbox from "./RobotHitbox";
import { usePlayerLogic } from "../../../hooks/usePlayerLogic/usePlayerLogic";

const Player: FC<{ useOrbitControls: boolean }> = ({ useOrbitControls }) => {
  const { robotBody, orientation, machineState } = usePlayerLogic(
    useOrbitControls,
    EntityModel.Robot
  );

  return (
    <RigidBody lockRotations={true} colliders={false} ref={robotBody}>
      <Bounding args={[0.2, 0.6]} position={[0, 0.8, 0.2]} />
      <Sensor args={[0.2, 2]} position={[0, 0.5, 0]} sensor />
      <BoxerRobot state={machineState.value} />
      {[PlayerMachineStateValues.punch, PlayerMachineStateValues.kick].includes(
        // @ts-ignore
        machineState.value
      ) && <RobotHitbox orientation={orientation} state={machineState.value} />}
      {machineState.matches(PlayerMachineStateValues.walk) && (
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

export default Player;
