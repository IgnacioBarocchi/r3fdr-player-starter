import * as THREE from 'three';

import { EntityModel } from '../../../providers/entities';
import { FC } from 'react';
import { GLTF } from 'three-stdlib';
import { PointLight } from 'three';
import { StateValue } from 'xstate';
import { use3DModelLogic } from '../../../hooks/use3DModelLogic/use3DModelLogic';
import { useControls } from 'leva';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';

const LanternLight = ({ color = '#fff5b6' }: { color: string }) => {
    // const { distance, decay } = useControls("Lamp", {
    //   distance: { value: 25, min: 0, max: 1000, step: 10 },
    //   decay: { value: 2, min: 0, max: 1000, step: 10 },
    // });

    const pointLightRef = useRef<PointLight>(null);
    let intensity = 0.1;

    // useFrame(({ clock }) => {
    //   const elapsedTime = clock.getElapsedTime();

    //   // Define the desired intensity values for different stages
    //   // const intensityStages = [0.2, 0.3, 0.6, 2.0];
    //   const intensityStages = [4, 7, 3, 6];

    //   // Define the time intervals (in seconds) for each stage
    //   const timeIntervals = [3 / 3, 4 / 3, 5 / 3, 2 / 3];
    //   // Define the total duration of the candle effect
    //   const totalDuration = timeIntervals.reduce((a, b) => a + b, 0);

    //   let t = elapsedTime % totalDuration;
    //   let stageIndex = 0;

    //   // Find the current stage based on elapsed time
    //   while (t > timeIntervals[stageIndex]) {
    //     t -= timeIntervals[stageIndex];
    //     stageIndex++;
    //   }

    //   const startIntensity = intensityStages[stageIndex];
    //   const endIntensity =
    //     intensityStages[(stageIndex + 1) % intensityStages.length];
    //   const stageDuration = timeIntervals[stageIndex];

    //   // Calculate the intensity value based on elapsed time within the stage
    //   intensity =
    //     startIntensity + ((endIntensity - startIntensity) * t) / stageDuration;

    //   // Update the light intensity
    //   if (pointLightRef.current) {
    //     pointLightRef.current.intensity = intensity;
    //   }

    //   // Update the light position, distance, and decay during each frame
    //   if (pointLightRef.current) {
    //     pointLightRef.current.position.set(-0.48, 2.32, 1.06);
    //     pointLightRef.current.distance = distance;
    //     pointLightRef.current.decay = decay;
    //   }
    // });

    return (
        <pointLight
            // @ts-ignore
            ref={pointLightRef}
            color={color}
            intensity={0.1} // Initial intensity value
            distance={25} // Initial intensity value
            decay={2}
            power={50}
            castShadow
        />
    );
};

const path = EntityModel.Drone.path;
export const Drone3DModel: FC<{
    state: StateValue;
    givenDependantGroupRef: React.MutableRefObject<THREE.Group>;
}> = ({ state, givenDependantGroupRef }) => {
    const { group, nodes, materials } = use3DModelLogic<GLTFResult>(
        state,
        false,
        path,
        givenDependantGroupRef
    );

    return (
        // @ts-ignore

        <group ref={group} dispose={null} castShadow>
            <mesh
                // @ts-ignore
                geometry={nodes.mesh.geometry}
                // @ts-ignore
                material={materials.base_material}
                rotation={[Math.PI / 2, 0, 0]}
                castShadow
            />
            {/* <LanternLight color="#fff5b6" /> */}
        </group>
    );
};

useGLTF.preload(path);

type GLTFResult = GLTF & {
    nodes: {
        mesh: THREE.Mesh;
    };
    materials: {
        base_material: THREE.MeshStandardMaterial;
    };
};
