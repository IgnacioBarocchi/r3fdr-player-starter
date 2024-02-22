import { Euler, RepeatWrapping, Texture, Vector3 } from 'three';

import { RigidBody } from '@react-three/rapier';
import { useTexture } from '@react-three/drei';

export default function Terrain({ position, scale, rotation }: WallProps) {
    const textures: Texture[] = useTexture([
        '/images/grass/grass_albedo.png',
        '/images/grass/grass_displace.png',
        '/images/grass/grass_normal.png',
        '/images/grass/grass_occlusion.png',
        '/images/grass/grass_rough.png',
    ]);

    textures.forEach((texture) => {
        texture.wrapS = RepeatWrapping;
        texture.wrapT = RepeatWrapping;
        texture.repeat.set(15, 15);
    });

    const [
        colorMap,
        displacementMap,
        metalMap,
        normalMap,
        aoMap4,
        roughnessMap,
    ] = textures;

    return (
        <>
            <RigidBody type="fixed" restitution={0.2} friction={1} name="floor">
                <mesh
                    position={position}
                    scale={scale}
                    rotation={rotation}
                    receiveShadow
                >
                    <boxGeometry />
                    <meshStandardMaterial
                        map={colorMap}
                        metalnessMap={metalMap}
                        displacementMap={displacementMap}
                        normalMap={normalMap}
                        aoMap={aoMap4}
                        roughnessMap={roughnessMap}
                    />
                </mesh>
            </RigidBody>
        </>
    );
}

interface WallProps {
    position: Vector3;
    scale: Vector3;
    rotation?: Euler;
}
