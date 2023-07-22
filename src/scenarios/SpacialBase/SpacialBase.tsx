import { AppContext } from "../../containers/context/AppContext";
import CargoBoxes from "./CargoBoxes";
import { Physics } from "@react-three/rapier";
import Platform from "./Platform";
import Robot from "../../components/Entities/Robot";
import { useContext } from "react";
import { useControls } from "leva";

const SpacialBase = () => {
  const {
    state: { USE_ORBIT_CONTROLS, DEBUG_APP },
  } = useContext(AppContext);

  const { mockOrbitControls } = useControls({ mockOrbitControls: true });

  return (
    <Physics timeStep="vary" debug={DEBUG_APP}>
      <Robot useOrbitControls={USE_ORBIT_CONTROLS && mockOrbitControls} />
      <Platform />
      <CargoBoxes />
    </Physics>
  );
};

export default SpacialBase;
