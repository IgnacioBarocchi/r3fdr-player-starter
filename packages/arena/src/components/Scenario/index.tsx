import LVL1 from '../../containers/scenarios/Level';
import { PlayerProvider } from '../../providers/PlayerProvider/PlayerProvider';
import WithWorld from '../../providers/WithWorld/WithWorld';
import UI from '../UI/SkillBar/UI';
import { Light } from './Light';

const Scenario = () => {
    return (
        <PlayerProvider>
            <UI />
            <WithWorld>
                <spotLight position={[0, 20, 0]} intensity={6} penumbra={1}/>
                <Light/>
                <LVL1 />
            </WithWorld>
        </PlayerProvider>
    );
};
export default Scenario;
