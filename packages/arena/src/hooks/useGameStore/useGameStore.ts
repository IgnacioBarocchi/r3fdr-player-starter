import { Group, Vector3 } from 'three';
import { SetState, create } from 'zustand';

import { subscribeWithSelector } from 'zustand/middleware';

export const useGameStore = create<GameState>(
  // @ts-expect-error SetState is deprecated
  subscribeWithSelector((set: SetState<GameState>) => ({
    gameMechanicsState: {
      cinematic: false,
      gameOver: false,
      level: 1,
    },
    setGameMechanicsState: (gameMechanicsState: GameMechanicsState): void =>
      set({ gameMechanicsState }),
    characterState: {
      maxHp: 100,
      hp: 100,
      maxStamina: 100,
      stamina: 100,
      position: [0, 0, 0],
    },
    setCharacterState: (characterState: PlayerState): void => set({ characterState }),
    caption: null,
    setCaption: (caption: { content: string; control: boolean }): void =>
      set({ caption }),
  }))
);

export type GameState = {
  gameMechanicsState: GameMechanicsState;
  setGameMechanicsState: (gameMechanicsState: GameMechanicsState) => void;
  characterState: PlayerState;
  setCharacterState: (characterState: PlayerState) => void;
  caption: null | { content: string; control: boolean };
  setCaption: (caption: null | { content: string; control: boolean }) => void;
  playAudio: (position: [number, number, number] | null, url: string) => void;
};

type PlayerState = {
  maxHp: number;
  hp: number;
  maxStamina: number;
  stamina: number;
  group: Group | null | undefined;
  action: {
    duration: number | null;
    startTime: number | null;
  };
  ability: string;
  position: Vector3;
};

type GameMechanicsState = {
  cinematic?: boolean;
  gameOver?: boolean;
};