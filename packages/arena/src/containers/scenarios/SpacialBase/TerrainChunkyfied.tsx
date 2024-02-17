// import React, { useEffect, useMemo, useRef } from 'react';
import {
    BoxGeometry,
    Euler,
    InstancedMesh,
    Matrix4,
    MeshStandardMaterial,
    RepeatWrapping,
    Texture,
    Vector3,
} from 'three';
import { useEffect, useRef } from 'react';

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

    const chunkSize = 1; // Size of each chunk

    const numChunks = scale.x / chunkSize; // Assuming scale.x represents the width of the terrain

    const instanceCount = numChunks * numChunks;

    const instancedMesh = useRef<InstancedMesh>();

    useEffect(() => {
        const geometry = new BoxGeometry(chunkSize, 1, chunkSize);
        const material = new MeshStandardMaterial({
            map: colorMap,
            metalnessMap: metalMap,
            displacementMap: displacementMap,
            normalMap: normalMap,
            aoMap: aoMap4,
            roughnessMap: roughnessMap,
        });

        const mesh = new InstancedMesh(geometry, material, instanceCount);

        for (let i = 0; i < instanceCount; i++) {
            const x = i % numChunks;
            const z = Math.floor(i / numChunks);
            mesh.setMatrixAt(
                i,
                new Matrix4().makeTranslation(x * chunkSize, 0, z * chunkSize)
            );
        }

        mesh.instanceMatrix.needsUpdate = true;
        instancedMesh.current = mesh;

        return () => {
            // Cleanup if necessary
            mesh.geometry.dispose();
            mesh.material.dispose();
        };
    }, [
        colorMap,
        displacementMap,
        metalMap,
        normalMap,
        aoMap4,
        roughnessMap,
        chunkSize,
        instanceCount,
        numChunks,
    ]);

    return (
        <>
            {instancedMesh.current && (
                <primitive object={instancedMesh.current} />
            )}
        </>
    );
}

interface WallProps {
    position: Vector3;
    scale: Vector3;
    rotation?: Euler;
}

// import { Euler, RepeatWrapping, Texture, Vector3 } from 'three';

// import { RigidBody } from '@react-three/rapier';
// import { useMemo } from 'react';
// import { useTexture } from '@react-three/drei';

// export default function Terrain({ position, scale, rotation }: WallProps) {
//     const textures: Texture[] = useTexture([
//         '/images/grass/grass_albedo.png',
//         '/images/grass/grass_displace.png',
//         '/images/grass/grass_normal.png',
//         '/images/grass/grass_occlusion.png',
//         '/images/grass/grass_rough.png',
//     ]);

//     textures.forEach((texture) => {
//         texture.wrapS = RepeatWrapping;
//         texture.wrapT = RepeatWrapping;
//         texture.repeat.set(15, 15);
//     });

//     const [
//         colorMap,
//         displacementMap,
//         metalMap,
//         normalMap,
//         aoMap4,
//         roughnessMap,
//     ] = textures;

//     const chunkSize = 1; // Size of each chunk

//     const numChunks = scale.x / chunkSize; // Assuming scale.x represents the width of the terrain

//     const chunks = useMemo(() => {
//         const chunkArray = [];
//         for (let i = 0; i < numChunks; i++) {
//             for (let j = 0; j < numChunks; j++) {
//                 chunkArray.push(
//                     <mesh
//                         key={`${i}-${j}`}
//                         position={new Vector3(i * chunkSize, 0, j * chunkSize)}
//                         scale={new Vector3(chunkSize, 1, chunkSize)}
//                         receiveShadow
//                     >
//                         <boxGeometry />
//                         <meshStandardMaterial
//                             map={colorMap}
//                             metalnessMap={metalMap}
//                             displacementMap={displacementMap}
//                             normalMap={normalMap}
//                             aoMap={aoMap4}
//                             roughnessMap={roughnessMap}
//                         />
//                     </mesh>
//                 );
//             }
//         }
//         return chunkArray;
//     }, [
//         colorMap,
//         displacementMap,
//         metalMap,
//         normalMap,
//         aoMap4,
//         roughnessMap,
//         numChunks,
//     ]);

//     return (
//         <>
//             <RigidBody
//                 type="fixed"
//                 restitution={0.2}
//                 friction={1}
//                 name="floor"
//                 colliders={'cuboid'}
//             >
//                 {chunks}
//             </RigidBody>
//         </>
//     );
// }

// interface WallProps {
//     position: Vector3;
//     scale: Vector3;
//     rotation?: Euler;
// }

// // import { Euler, RepeatWrapping, Texture, Vector3 } from "three";

// // import { RigidBody } from "@react-three/rapier";
// // import { useTexture } from "@react-three/drei";

// // export default function Terrain({
// //   position,
// //   scale,
// //   rotation,
// // }: WallProps) {
// //   const textures: Texture[] = useTexture([
// //     "/images/grass/grass_albedo.png",
// //     "/images/grass/grass_displace.png",
// //     "/images/grass/grass_normal.png",
// //     "/images/grass/grass_occlusion.png",
// //     "/images/grass/grass_rough.png",
// //   ]);

// //   textures.forEach((texture) => {
// //     texture.wrapS = RepeatWrapping;
// //     texture.wrapT = RepeatWrapping;
// //     texture.repeat.set(15, 15);
// //   });

// //   const [colorMap, displacementMap, metalMap, normalMap, aoMap4, roughnessMap] =
// //     textures;

// //   return (
// //     <>
// //       <RigidBody type="fixed" restitution={0.2} friction={1} name="floor">
// //         <mesh
// //           position={position}
// //           scale={scale}
// //           rotation={rotation}
// //           receiveShadow
// //         >
// //           <boxGeometry />
// //           <meshStandardMaterial
// //             map={colorMap}
// //             metalnessMap={metalMap}
// //             displacementMap={displacementMap}
// //             normalMap={normalMap}
// //             aoMap={aoMap4}
// //             roughnessMap={roughnessMap}
// //           />
// //         </mesh>
// //       </RigidBody>
// //     </>
// //   );
// // }

// // interface WallProps {
// //   position: Vector3;
// //   scale: Vector3;
// //   rotation?: Euler;
// // }
