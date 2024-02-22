import { ZombieNPC } from '../../../components/Entities/ZombieNPC';

export const Zombies = () => {
    return (
        <>
            <group position={[0, 0, 6]}>
                <ZombieNPC />
            </group>
            <group position={[0, 0, -6]}>
                <ZombieNPC />
            </group>
            <group position={[6, 0, 6]}>
                <ZombieNPC />
            </group>
            <group position={[-6, 0, -6]}>
                <ZombieNPC />
            </group>
        </>
    );
};
