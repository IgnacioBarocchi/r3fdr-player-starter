import { GameState, useGameStore } from "../useGameStore/useGameStore";
import { Group, Vector3 } from "three";
import {
  IntersectionEnterHandler,
  IntersectionExitHandler,
  RapierRigidBody,
} from "@react-three/rapier";
import { MutableRefObject, useRef } from "react";

import { enemyMachine } from "./enemyMachine";
import getNormalizedTurnAngle from "../../lib/getNormalizedTurnAngle";
import { useFrame } from "@react-three/fiber";
import { useMachine } from "@xstate/react";

const ENTITIES_NAMES = {
  Plith: "Plith",
  Floor: "Floor",
  Player: "Player",
  Enemy: "Enemy",
  Ally: "Ally",
  IMP_VARIANT_1: "ImpVariant1",
  IMP_VARIANT_2: "ImpVariant2",
} as const;

const getMeleeNPCMeleeNPCulse = (
  playerPosition: Vector3,
  meleeNPCPosition: Vector3,
  speed = 0.4
): Vector3 => {
  const direction = new Vector3();
  if (!playerPosition || !meleeNPCPosition) return direction;
  direction.subVectors(playerPosition, meleeNPCPosition).normalize();
  const impulse = new Vector3(direction.x, 0, direction.z).multiplyScalar(
    speed
  );
  return impulse;
};

export type EntityType = (typeof ENTITIES_NAMES)[keyof typeof ENTITIES_NAMES];

const playerIsInteractingWithSensor = (
  name: EntityType | undefined | string
) => {
  return ENTITIES_NAMES.Player === name;
};

export const useEnemyNPCLogic = () => {
  const { speed } = { speed: 2 };
  const { characterState } = useGameStore((state: GameState) => ({
    characterState: state.characterState,
    setCaption: state.setCaption,
  }));

  const meleeNPCBody =
    useRef<RapierRigidBody>() as MutableRefObject<RapierRigidBody>;
  const meleeNPC3DModel = useRef<Group>(null) as MutableRefObject<Group>;

  //   const [meleeNPCAction, setMeleeNPCAnimationClip] = useState<
  //     NPCActionTypes["animationClips"][T][number]
  //   >(animationClips.chase[0]);

  const [state, send] = useMachine(enemyMachine);
  const { currentHP, playerIsReachable } = state.context;

  const handlePlayerReachableChange = (reachable: boolean) => {
    send({ type: "PLAYER_REACHABLE_CHANGE", reachable });
  };

  const goToPlayer = () => {
    console.log("goToPlayer");
    if (!characterState?.group) return;
    const playerPosition = characterState?.group.getWorldPosition(
      new Vector3()
    );
    const meleeNPCPosition = meleeNPC3DModel.current?.getWorldPosition(
      new Vector3()
    );

    meleeNPC3DModel.current.lookAt(playerPosition);
    meleeNPC3DModel.current.rotation.x = 0;
    meleeNPC3DModel.current.rotation.z = 0;
    meleeNPC3DModel.current.rotation.y = Math.abs(
      getNormalizedTurnAngle(meleeNPC3DModel.current.rotation.y)
    );
    // * Mutation
    const meleeNPCulseForce = getMeleeNPCMeleeNPCulse(
      playerPosition,
      meleeNPCPosition,
      speed
    );
    meleeNPCBody.current.applyImpulseAtPoint(
      meleeNPCulseForce,
      playerPosition,
      true
    );
  };

  useFrame(() => {
    if (!meleeNPC3DModel.current || !meleeNPCBody.current) return;
    if (state.value === "dead") return;

    if (currentHP <= 0) {
      send("DIE");
      return;
    }

    if (currentHP <= 10) {
      send("RUN_AWAY");
    }
    console.log("Current");
    goToPlayer();
  });

  const onInteractionRadiusEnter = (({ other: { rigidBodyObject } }) => {
    const playerIsClose = playerIsInteractingWithSensor(rigidBodyObject?.name);
    // const NPCTakingDamageFromSword = rigidBodyObject?.name === WEAPONS.SWORD;
    // const NPCTakingDamageFromKick = rigidBodyObject?.name === WEAPONS.FOOT;

    if (playerIsClose && !playerIsReachable) {
      handlePlayerReachableChange(true);
    }

    // if (NPCTakingDamageFromSword) {
    //   send("TAKE_DAMAGE");
    //   return;
    // }

    // if (NPCTakingDamageFromKick) {
    //   send("STUN");
    //   return;
    // }

    if (playerIsReachable) {
      send("ATTACK");
      return;
    }
  }) as IntersectionEnterHandler;

  const onInteractionRadiusLeave = (({ other: { rigidBodyObject } }) => {
    const playerIsFar = playerIsInteractingWithSensor(rigidBodyObject?.name);
    // const finishingStunAttack = rigidBodyObject?.name === WEAPONS.FOOT;

    // if (finishingStunAttack) {
    //   send("RECOVER");
    // }

    if (playerIsFar && playerIsReachable) {
      handlePlayerReachableChange(false);
    }
  }) as IntersectionExitHandler;

  return {
    state,
    onInteractionRadiusEnter,
    onInteractionRadiusLeave,
    robotBody: meleeNPC3DModel,
  };
};
