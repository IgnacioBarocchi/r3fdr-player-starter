import {
  BallCollider,
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
  RigidBodyProps,
} from "@react-three/rapier";
import { FC, useRef } from "react";

const Hitbox: FC<HitboxProps> = ({
  physical,
  rigidBodyProps,
  shape,
  boundingSize,
}) => {
  const hitboxBody = useRef<RapierRigidBody>(null);

  return (
    <group>
      <RigidBody
        ref={hitboxBody}
        {...rigidBodyProps}
        name={rigidBodyProps.name}
        colliders={false}
        lockRotations={true}
      >
        {shape === "box" ? (
          <CuboidCollider
            sensor={!physical}
            args={[boundingSize, boundingSize, boundingSize]}
          />
        ) : (
          <BallCollider sensor={!physical} args={[boundingSize]} />
        )}
      </RigidBody>
    </group>
  );
};

export default Hitbox;

interface HitboxProps {
  rigidBodyProps: RigidBodyProps;
  physical: boolean;
  shape: "box" | "ball";
  boundingSize: number;
}
