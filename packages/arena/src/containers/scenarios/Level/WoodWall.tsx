import { CuboidCollider, RigidBody } from '@react-three/rapier';

export function WoodWall({
    position,
    rotation,
}: {
    position: [number, number, number];
    rotation: [number, number, number];
}) {
    return (
        <RigidBody type="fixed" position={position} rotation={rotation}>
            <CuboidCollider args={[17, 1, 0.2]} position={[0, 1, 17]} />
            <CuboidCollider
                sensor
                onIntersectionEnter={(rigidBody) => {
                    // @ts-ignore
                    rigidBody.other.rigidBody.setLinvel(
                        { x: 0, y: 10, z: 10 },
                        false
                    );
                }}
                args={[17, 1, 0.2]}
                position={[0, 1, 18]}
                rotation={[-Math.PI / 4, 0, 0]}
            />

            <CuboidCollider args={[17, 1, 0.2]} position={[0, 1, -17]} />
            <CuboidCollider
                sensor
                onIntersectionEnter={(rigidBody) => {
                    // @ts-ignore
                    rigidBody.other.rigidBody.setLinvel(
                        { x: 0, y: 10, z: 10 },
                        false
                    );
                }}
                args={[17, 1.5, 0.2]}
                position={[0, 1, -18]}
                rotation={[Math.PI / 4, 0, 0]}
            />

            <CuboidCollider args={[0.2, 1, 17]} position={[17, 1, 0]} />
            <CuboidCollider
                sensor
                onIntersectionEnter={(rigidBody) => {
                    // @ts-ignore
                    rigidBody.other.rigidBody.setLinvel(
                        { x: 0, y: 10, z: 10 },
                        false
                    );
                }}
                args={[0.2, 1.5, 17]}
                position={[18, 1, 0]}
                rotation={[0, 0, Math.PI / 4]}
            />

            <CuboidCollider args={[0.2, 1, 17]} position={[-17, 1, 0]} />
            <CuboidCollider
                sensor
                onIntersectionEnter={(rigidBody) => {
                    // @ts-ignore
                    rigidBody.other.rigidBody.setLinvel(
                        { x: 0, y: 10, z: 10 },
                        false
                    );
                }}
                args={[0.2, 1.5, 17]}
                position={[-18, 1, 0]}
                rotation={[0, 0, -Math.PI / 4]}
            />
        </RigidBody>
    );
}
