import { Group } from 'three';
import { SetState, create } from 'zustand';

import { subscribeWithSelector } from 'zustand/middleware';

export const useGameStore = create<GameState>(
    // @ts-expect-error SetState is deprecated
    subscribeWithSelector((set: SetState<GameState>) => ({
        playerState: {},
        enemies: [],
        setPlayerState: (playerState: PlayerState): void =>
            set({ playerState }),
        addEnemy: (enemy: {id: string}): void =>
            set((state) => ({ enemies: [...state.enemies, enemy] })),
        removeEnemyById: (enemyId: string): void =>
            set((state) => ({
                enemies: state.enemies.filter((enemy: {id: string}) => enemy.id !== enemyId),
            })),
    }))
);

export type GameState = {
    enemies: {id: string}[];
    playerState: PlayerState;
    setPlayerState: (playerState: PlayerState) => void;
    addEnemy: (enemy: {id: string}) => void;
    removeEnemyById: (id: string) => void;
};

type PlayerState = {
    group: Group | null | undefined;
};
