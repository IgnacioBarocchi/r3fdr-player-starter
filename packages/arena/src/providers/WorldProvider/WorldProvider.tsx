import { Camera, OrthographicCamera, PerspectiveCamera } from 'three';
import { KeyboardControls, OrbitControls } from '@react-three/drei';

import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { ReactNode } from 'react';
import { ReactThreeFiber } from '@react-three/fiber';
import keysMap from '../../lib/keysMap';

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

const Wordl = ({ children }: { children: ReactNode }) => {
    return (
        <Canvas shadows camera={camera}>
            <Perf position="bottom-left" />
            <OrbitControls makeDefault />
            <KeyboardControls map={keysMap}>{children}</KeyboardControls>
        </Canvas>
    );
};
export default Wordl;
