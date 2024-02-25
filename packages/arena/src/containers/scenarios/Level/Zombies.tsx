import { ZombieNPC } from '../../../components/Entities/ZombieNPC';

export const Zombies = () => {
    return (
        <>
            <group position={[0, 0, 7]}>
                <ZombieNPC />
            </group>
            {/* <group position={[0, 0, -15]}>
                <ZombieNPC />
            </group>
            <group position={[15, 0, 15]}>
                <ZombieNPC />
            </group>
            <group position={[-15, 0, -15]}>
                <ZombieNPC />
            </group> */}
        </>
    );
};
