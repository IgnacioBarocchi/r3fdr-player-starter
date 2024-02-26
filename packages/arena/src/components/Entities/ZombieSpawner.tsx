import { nanoid } from 'nanoid';
import { ZombieNPC } from './ZombieNPC';
import { GameState, useGameStore } from '../../hooks/useGameStore/useGameStore';
import { useEffect } from 'react';

export const ZombieSpawner = ({
    position,
}: {
    position: [number, number, number];
}) => {
    const { addEnemy, removeEnemyById, enemies } = useGameStore(
        (state: GameState) => ({
            addEnemy: state.addEnemy,
            removeEnemyById: state.removeEnemyById,
            enemies: state.enemies,
        })
    );

    const spawnZombies = (count: number) => {
        for (let i = 0; i < count; i++) {
            const enemyId = nanoid();
            addEnemy({ id: enemyId });
        }
    };

    const onDead = (enemyId: string) => {
        removeEnemyById(enemyId);
    };

    useEffect(() => {
        console.log(enemies);
        const maxZombies = 3;
        const zombiesToSpawn = maxZombies - enemies.length;

        if (zombiesToSpawn > 0) {
            spawnZombies(zombiesToSpawn);
        }
    }, [enemies.length]);

    return (
        <>
            {enemies.map((enemy, i) => (
                <group position={[position[0] * i + 3, 0, position[1] * i + 3]}>
                    <ZombieNPC
                        key={enemy.id}
                        enemyId={enemy.id}
                        onDead={() => onDead(enemy.id)}
                    />
                </group>
            ))}
        </>
    );
};
