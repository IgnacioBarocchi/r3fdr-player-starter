import { Canvas, useThree } from '@react-three/fiber';
import { Color, ColorRepresentation, Fog as ThreeFog } from 'three';
import { KeyboardControls, OrbitControls } from '@react-three/drei';

import { CameraOptions } from './@types/CameraOptions';
import { Perf } from 'r3f-perf';
import SpacialBase from '../../containers/scenarios/Level';
import keysMap from '../../lib/keysMap';

const camera: CameraOptions = {
    fov: 45,
    near: 0.1,
    far: 200,
    position: [-2, 10, -10],
};

const Scenario = () => {
    return (
        <Canvas shadows camera={camera}>
            <Perf position="bottom-left" />
            <directionalLight castShadow intensity={10} />
            <OrbitControls makeDefault />
            <KeyboardControls map={keysMap}>
                <SpacialBase />
            </KeyboardControls>
        </Canvas>
    );
};
export default Scenario;
