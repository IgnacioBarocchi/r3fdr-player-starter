import { useControls } from 'leva';
import LVL1 from '../../containers/scenarios/Level';
import { PlayerProvider } from '../../providers/PlayerProvider/PlayerProvider';
import World from '../../providers/WorldProvider/WorldProvider';
import AbilityBar from '../UI/AbilityBar';

const Scenario = () => {
    const { x, y, z, i } = useControls("Lamp", {
      x: { value: 0, min: 0, max: 10, step: 1 },
      y: { value: 10, min: 0, max: 10, step: 1 },
      z: { value: 0, min: -10, max: 10, step: 1 },
      i: { value: 6, min: -10, max: 10, step: 1 },
    });

    return (
        <PlayerProvider>
            <AbilityBar />
            <World>
                <spotLight position={[x, y, z]} intensity={i} penumbra={1}/>
                <LVL1 />
            </World>
        </PlayerProvider>
    );
};
export default Scenario;
{/* <directionalLight castShadow intensity={10} /> */}
{/* <spotLight position={[x, y, z]} intensity={i} /> */}
