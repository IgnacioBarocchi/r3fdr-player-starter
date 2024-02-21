import { Canvas, useThree } from '@react-three/fiber';
import { Color, ColorRepresentation, PointLight, Fog as ThreeFog } from 'three';
import { KeyboardControls, OrbitControls } from '@react-three/drei';
import { useContext, useEffect } from 'react';

import { AppContext } from '../../providers/GameSettingsProvider';
import { CameraOptions } from './@types/CameraOptions';
import { Perf } from 'r3f-perf';
import SpacialBase from '../../containers/scenarios/SpacialBase/SpacialBase';
import keysMap from '../../lib/keysMap';
import { useControls } from 'leva';

const camera: CameraOptions = {
    fov: 45,
    near: 0.1,
    far: 200,
    position: [-2, 10, -10],
};

type FogProps = {
    color?: ColorRepresentation;
    near?: number;
    far?: number;
};

function Fog(props: FogProps) {
    const { color = 'white', near = 10, far = 80 } = props;
    // @ts-ignore
    const scene = useThree((state) => state.scene);
    // @ts-ignore
    useEffect(() => {
        const col =
            (color as Color) instanceof Color ? color : new Color(color);
        scene.fog = new ThreeFog(col, near, far);

        return () => {
            scene.fog = null;
        };
    }, [scene, color, near, far]);

    return null;
}

const ScenarioExperience = SpacialBase;

const Scenario = () => {
    // const { x, y, z, pp } = useControls('Lamp', {
    //     x: { value: 0, min: 0, max: 1000, step: 1 },
    //     y: { value: 10, min: 0, max: 1000, step: 1 },
    //     z: { value: 0, min: 0, max: 1000, step: 1 },
    //     pp: { value: 2, min: 0, max: 7, step: 1 },
    // });
    // const light = new PointLight();
    // light.position.set(distance, decay, 0);

    // const {
    //     state: { MONITOR_PERFORMANCE, GRAPHICS },
    // } = useContext(AppContext);

    return (
        <Canvas shadows camera={camera}>
            <Perf position="bottom-left" />
            {/* {MONITOR_PERFORMANCE && <Perf position="bottom-left" />}
            {['LOW', 'NORMAL'].includes(GRAPHICS) ? (
                // <></>
                <ambientLight castShadow intensity={5} />
            ) : (
                // <ambientLight intensity={1} />
                // <directionalLight castShadow intensity={1} />
                // <></>
                <directionalLight castShadow intensity={1} />
            )} */}
            <directionalLight castShadow intensity={10} />
            <OrbitControls makeDefault />
            <KeyboardControls map={keysMap}>
                {/* <Fog color="black" near={0.1} far={50} /> */}
                <ScenarioExperience />
            </KeyboardControls>
        </Canvas>
    );
};
export default Scenario;
