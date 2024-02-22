import SpacialBase from '../../containers/scenarios/Level';
import Wordl from '../../providers/WorldProvider/WorldProvider';

const Scenario = () => {
    return (
        <Wordl>
            <directionalLight castShadow intensity={10} />
            <SpacialBase />
        </Wordl>
    );
};
export default Scenario;
