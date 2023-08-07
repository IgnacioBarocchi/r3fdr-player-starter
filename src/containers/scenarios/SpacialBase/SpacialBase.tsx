import { AppContext } from "../../context/AppContext";
import { Path } from "./platformMapData";
import { Physics } from "@react-three/rapier";
import Robot from "../../../components/Entities/Robot";
import { useContext } from "react";
import { useControls } from "leva";

const SpacialBase = () => {
  const {
    state: { USE_ORBIT_CONTROLS, DEBUG_APP },
  } = useContext(AppContext);

  const { mockOrbitControls } = useControls({ mockOrbitControls: true });

  return (
    <Physics timeStep="vary" debug={DEBUG_APP}>
      {/* {platformMapData.flat().map((data, i) => {
        console.log(data);
        const { Chunk, props } = data.get();

        // @ts-ignore
        return <Chunk key={`c-${i}`} {...props} b={Number.isInteger(i / 2)} />;
      })} */}

      {Path.flat().map((data, i) => {
        // console.log(data);
        const { Chunk, props } = data.get();

        // @ts-ignore
        return <Chunk key={`c-${i}`} {...props} b={Number.isInteger(i / 2)} />;
      })}
      <Robot useOrbitControls={USE_ORBIT_CONTROLS && mockOrbitControls} />
      {/* <CargoBoxes /> */}
    </Physics>
  );
};

export default SpacialBase;
