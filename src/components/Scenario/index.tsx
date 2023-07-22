import { KeyboardControls, OrbitControls } from "@react-three/drei";

import { AppContext } from "../../containers/context/AppContext";
import { CameraOptions } from "./@types/CameraOptions";
import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import SpacialBase from "../../scenarios/SpacialBase/SpacialBase";
import keysMap from "../../lib/keysMap";
import { useContext } from "react";

const camera: CameraOptions = {
  fov: 45,
  near: 0.1,
  far: 200,
  position: [-2, 10, -10],
};

const Scenario = () => {
  const {
    state: { MONITOR_PERFORMANCE, GRAPHICS },
  } = useContext(AppContext);
  const ScenarioExperience = SpacialBase;

  return (
    <Canvas shadows camera={camera}>
      {MONITOR_PERFORMANCE && <Perf position="bottom-left" />}
      {["LOW", "NORMAL"].includes(GRAPHICS) ? (
        <ambientLight intensity={1} />
      ) : (
        <directionalLight castShadow />
      )}
      <OrbitControls makeDefault />
      <KeyboardControls map={keysMap}>
        <ScenarioExperience />
      </KeyboardControls>
    </Canvas>
  );
};
export default Scenario;
