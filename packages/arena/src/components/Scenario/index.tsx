// import { useControls } from 'leva';
import { useControls } from 'leva';
import LVL1 from '../../containers/scenarios/Level';
import { PlayerProvider } from '../../providers/PlayerProvider/PlayerProvider';
import WithWorld from '../../providers/WithWorld/WithWorld';
import UI from '../UI/SkillBar/UI';
import { Light } from './Light';

const Scenario = () => {
    // const { x, y, z, i } = useControls('Lamp', {
    //     x: { value: 0, min: 0, max: 10, step: 1 },
    //     y: { value: 10, min: 0, max: 10, step: 1 },
    //     z: { value: 0, min: -10, max: 10, step: 1 },
    //     i: { value: 6, min: -10, max: 10, step: 1 },
    // });

    return (
        <PlayerProvider>
            <UI />
            <WithWorld>
                {/* <spotLight position={[x, y, z]} intensity={i} penumbra={1}/> */}
                <Light/>
                <LVL1 />
            </WithWorld>
        </PlayerProvider>
    );
};
export default Scenario;
