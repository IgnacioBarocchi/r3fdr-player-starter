import { FC } from "react";
import Gear3DModel from "./Gear3DModel";
import Hitbox from "../../utility/Hitbox/Hitbox";
import { Hitboxes } from "../../../lib/object3DHelper";
import { PositionalAudio } from "@react-three/drei";
import { RobotMachineStateValues } from "../../../hooks/usePlayerLogic/getRobotMachine";
import { StateValue } from "xstate";

const PunchCollider: FC<HitboxColliderProps> = ({ orientation }) => {
  return (
    <Hitbox
      rigidBodyProps={{
        name: Hitboxes.FIST,
        position: [0, 0.7, 0.8],
        density: 1000,
        type: "dynamic",
      }}
      projectile={false}
      physical={true}
      orientation={orientation}
      impulseScale={1}
      shape={"box"}
      boundingSize={0.4}
      Projectile3DModel={undefined}
    />
  );
};

const ProjectileCollider: FC<HitboxColliderProps> = ({ orientation }) => {
  return (
    <Hitbox
      rigidBodyProps={{
        name: Hitboxes.GEAR,
        position: [0, 0.7, 0.8],
        density: 10,
        type: "dynamic",
      }}
      projectile={false}
      physical={true}
      orientation={orientation}
      impulseScale={1000}
      shape={"ball"}
      boundingSize={0.4}
      // @ts-ignore
      Projectile3DModel={Gear3DModel}
    />
  );
};

const RobotHitbox: FC<RobotHitboxProps> = ({ state, orientation }) => {
  if (state === RobotMachineStateValues.punch)
    return (
      <>
        <PunchCollider orientation={orientation} />
        <PositionalAudio
          load
          autoplay
          loop={false}
          distance={1}
          url="/sounds/Robot/kick.mp3"
        />
      </>
    );

  if (state === RobotMachineStateValues.shoot)
    return (
      <>
        <ProjectileCollider orientation={orientation} />
        <PositionalAudio
          load
          autoplay
          loop={false}
          distance={1}
          url="/sounds/Robot/kick.mp3"
        />
      </>
    );

  return null;
};

export default RobotHitbox;

interface HitboxColliderProps {
  orientation: number;
}

interface RobotHitboxProps extends HitboxColliderProps {
  state: StateValue;
}
