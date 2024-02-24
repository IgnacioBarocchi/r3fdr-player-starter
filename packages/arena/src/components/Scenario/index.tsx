import { useControls } from 'leva';
import LVL1 from '../../containers/scenarios/Level';
import { PlayerProvider } from '../../providers/PlayerProvider/PlayerProvider';
import WithWorld from '../../providers/WorldProvider/WorldProvider';
import AbilityBar from '../UI/AbilityBar';

const Scenario = () => {
    const { x, y, z, i } = useControls('Lamp', {
        x: { value: 0, min: 0, max: 10, step: 1 },
        y: { value: 10, min: 0, max: 10, step: 1 },
        z: { value: 0, min: -10, max: 10, step: 1 },
        i: { value: 6, min: -10, max: 10, step: 1 },
    });

    return (
        <PlayerProvider>
            <AbilityBar />
            <WithWorld>
                <spotLight position={[x, y, z]} intensity={i} penumbra={1}/>
                <LVL1 />
            </WithWorld>
        </PlayerProvider>
    );

    // return (
    //     <WithWorld>
    //         <spotLight position={[x, y, z]} intensity={i} penumbra={1} />
    //         <LVL1 />
    //     </WithWorld>
    // );
};
export default Scenario;
{
    /* <directionalLight castShadow intensity={10} /> */
}
{
    /* <spotLight position={[x, y, z]} intensity={i} /> */
}
