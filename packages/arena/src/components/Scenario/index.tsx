import LVL1 from '../../containers/scenarios/Level';
import { PlayerProvider } from '../../providers/PlayerProvider/PlayerProvider';
import World from '../../providers/WorldProvider/WorldProvider';

const Scenario = () => {
    return (
        <World>
            <directionalLight castShadow intensity={10} />
            <PlayerProvider>
                <LVL1 />
            </PlayerProvider>
        </World>
    );
};
export default Scenario;
