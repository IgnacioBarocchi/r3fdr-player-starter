import { FC } from "react";
import Hitbox from "../../utility/Hitbox/Hitbox";
import { Hitboxes } from "../../../lib/object3DHelper";
import { PlayerMachineStateValues } from "../../../hooks/usePlayerLogic/getPlayerMachine";
import { PositionalAudio } from "@react-three/drei";
import { StateValue } from "xstate";

const PunchCollider = () => {
  return (
    <Hitbox
      rigidBodyProps={{
        name: Hitboxes.FIST,
        position: [0, 1.25, 1.2],
        density: 1000,
        type: "fixed",
      }}
      physical={true}
      shape={"ball"}
      boundingSize={0.3}
    />
  );
};

const KickCollider = () => {
  return (
    <Hitbox
      rigidBodyProps={{
        name: Hitboxes.FOOT,
        position: [0, 1.25, 2],
        density: 1000,
        type: "fixed",
      }}
      physical={true}
      shape={"ball"}
      boundingSize={0.3}
    />
  );
};

const ProjectileCollider = () => {
  return (
    <Hitbox
      rigidBodyProps={{
        name: Hitboxes.FIST,
        position: [0, 0.7, 0.8],
        density: 10,
        type: "dynamic",
      }}
      physical={true}
      shape={"ball"}
      boundingSize={0.4}
    />
  );
};

const RobotHitbox: FC<RobotHitboxProps> = ({ state }) => {
  if (state === PlayerMachineStateValues.punch)
    return (
      <>
        <PunchCollider />
        <PositionalAudio
          load
          autoplay
          loop={false}
          distance={1}
          url="/sounds/Robot/kick.mp3"
        />
      </>
    );

  if (state === PlayerMachineStateValues.kick)
    return (
      <>
        <KickCollider />
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
