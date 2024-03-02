import { RapierRigidBody } from '@react-three/rapier';
import { Group } from 'three';
import { SetState, create } from 'zustand';

import { subscribeWithSelector } from 'zustand/middleware';

export const useGameStore = create<GameState>(
    // @ts-expect-error SetState is deprecated
    subscribeWithSelector((set: SetState<GameState>) => ({
        shouldRenderOutskirts: false,
        setShouldRenderOutskirts: (shouldRenderOutskirts: boolean): void =>
            set({ shouldRenderOutskirts }),
        playerState: {},
        enemies: [],
        playerRigidBody: {},
        setPlayerRigidBody: (playerRigidBody) => {
            set({ playerRigidBody });
        },
        setPlayerState: (playerState: PlayerState): void =>
            set({ playerState }),
        addEnemy: (enemy: { id: string }): void =>
            set((state) => ({ enemies: [...state.enemies, enemy] })),
        removeEnemyById: (enemyId: string): void =>
            set((state) => ({
                enemies: state.enemies.filter(
                    (enemy: { id: string }) => enemy.id !== enemyId
                ),
            })),
    }))
);

export type GameState = {
    shouldRenderOutskirts: boolean;
    setShouldRenderOutskirts: (shouldRenderOutskirts: boolean) => void;
    enemies: { id: string }[];
    playerState: PlayerState;
    playerRigidBody: RapierRigidBody;
    setPlayerState: (playerState: PlayerState) => void;
    setPlayerRigidBody: (playerRigidBody: RapierRigidBody) => void;
    addEnemy: (enemy: { id: string }) => void;
    removeEnemyById: (id: string) => void;
};

type PlayerState = {
    group: Group | null | undefined;
};
