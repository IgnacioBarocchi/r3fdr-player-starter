import { EntityModel } from '../../../providers/entities';
import { FC } from 'react';
import { GLTFResult } from './MutantTypes';
import { StateValue } from 'xstate';
import { Vector3 } from 'three';
import { use3DModelLogic } from '../../../hooks/use3DModelLogic/use3DModelLogic';
import { useControls } from 'leva';
// import { useControls } from 'leva';
import { useGLTF } from '@react-three/drei';

const path = EntityModel.Mutant.path;
const Mutant3DModel: FC<{ stateValue: StateValue }> = ({ stateValue }) => {
    const { group, nodes, materials } = use3DModelLogic<GLTFResult>(
        stateValue,
        true,
        path
    );
    // const { angle } = useControls('Lamp', {
    //     angle: { value: 0, min: 0, max: 360, step: 0.5 },
    // });
    const { x, y, z, pp } = useControls('Lamp', {
        x: { value: 0, min: 0, max: 1000, step: 1 },
        y: { value: 10, min: 0, max: 1000, step: 1 },
        z: { value: 0, min: 0, max: 1000, step: 1 },
        pp: { value: 2, min: 0, max: 7, step: 1 },
    });
    return (
        <group ref={group} dispose={null}>
            <group name="Scene">
                <group
                    name="Armature"
                    rotation={[Math.PI / 2, 0, 0]}
                    scale={0.75}
                >
                    <primitive object={nodes.mixamorigHips} />
                    <pointLight
                        castShadow
                        intensity={1}
                        // position={[x, y, z]}
                        // angle={Math.PI / pp}
                        // penumbra={1}
                        power={10}
                        // setRotationFromAxisAngle={{
                        //     axis: new Vector3(0, 0, 0),
                        //     angle: Math.PI / 2,
                        // }}
                    />
                    <skinnedMesh
                        name="mesh"
                        geometry={nodes.mesh.geometry}
                        // @ts-expect-error X
                        material={materials['Main material']}
                        skeleton={nodes.mesh.skeleton}
                    />

                    {/* <spotLight
                        castShadow
                        intensity={1}
                        position={[0, 10, 0]}
                        angle={Math.PI / 5}
                        penumbra={1}
                        power={10}
                    />
               
                    {/* <MovingSpotLight
                        color={'red'}
                        position={[-40, 30, -10]}
                        distance={10}
                        angle={Math.PI / 2}
                        intensity={10}
                        castShadow={true}
                        penumbra={10}
                        target={group}
                        isShadowDebugVisible={true}
                        isLightMoving={true}
                        rotationSpeed={2}
                    /> */}
                </group>
            </group>
        </group>
    );
};

useGLTF.preload(path);

export default Mutant3DModel;
