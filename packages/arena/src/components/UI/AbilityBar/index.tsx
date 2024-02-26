import styled from 'styled-components';
import { Context } from '../../../providers/PlayerProvider/PlayerProvider';
import { HPBar } from './HPBar';
import { SkillBar } from './SkillBar';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
`;

const BlackScreen = styled.div`
    background-color: black;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 24px;
`;

const AbilityBar = () => {
    const [state] = Context.useActor();

    if (state.matches('Dying')) {
        return <BlackScreen>You died</BlackScreen>;
    }

    return (
        <>
            <Container>
                <SkillBar />
                <HPBar />
            </Container>
        </>
    );
};

export default AbilityBar;
