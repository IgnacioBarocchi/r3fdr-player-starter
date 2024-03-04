import { Camera, OrthographicCamera, PerspectiveCamera} from 'three';
import { KeyboardControls, OrbitControls } from '@react-three/drei';

import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { ReactNode } from 'react';
import { ReactThreeFiber } from '@react-three/fiber';
import keysMap from '../../lib/keysMap';
import { Context } from '../PlayerProvider/PlayerProvider';


export type CameraOptions = (
    | Camera
    | Partial<
          ReactThreeFiber.Object3DNode<Camera, typeof Camera> &
              ReactThreeFiber.Object3DNode<
                  PerspectiveCamera,
                  typeof PerspectiveCamera
              > &
              ReactThreeFiber.Object3DNode<
                  OrthographicCamera,
                  typeof OrthographicCamera
              >
      >
) & {
    manual?: boolean;
};

const camera: CameraOptions = {
    fov: 45,
    near: 0.1,
    far: 200,
    position: [-2, 10, -10],
};

const WithWorld = ({ children }: { children: ReactNode }) => {
    const [state] = Context.useActor();

    return (
        <Canvas camera={camera} flat dpr={[1, 1.5]} gl={{ antialias: false }}>
                <ambientLight intensity={1} />
                <Perf position="bottom-left" />
                <OrbitControls makeDefault />
                <KeyboardControls map={keysMap}>{children}</KeyboardControls>
                {state.matches('Dying') && (
                    <fog attach="fog" color="red" far={100} near={1} />
                )}
        </Canvas>
    );
};
export default WithWorld;
