import { AppContext } from "../../context/AppContext";
import CargoBoxes from "./CargoBoxes";
import { Physics } from "@react-three/rapier";
import Robot from "../../../components/Entities/Robot";
import platformMapData from "./platformMapData";
import { useContext } from "react";
import { useControls } from "leva";

const SpacialBase = () => {
  const {
    state: { USE_ORBIT_CONTROLS, DEBUG_APP },
  } = useContext(AppContext);

  const { mockOrbitControls } = useControls({ mockOrbitControls: true });

  return (
    <Physics timeStep="vary" debug={DEBUG_APP}>
      {platformMapData.flat().map((data, i) => {
        console.log(data);
        const { Chunk, props } = data.get();
        // @ts-ignore
        return <Chunk key={`c-${i}`} {...props} />;
      })}
      <Robot useOrbitControls={USE_ORBIT_CONTROLS && mockOrbitControls} />
      <CargoBoxes />
    </Physics>
  );
};

export default SpacialBase;
