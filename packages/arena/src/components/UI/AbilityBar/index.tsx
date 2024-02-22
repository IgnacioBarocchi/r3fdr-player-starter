import styled from 'styled-components';
import { useGameStore } from '../../../hooks/useGameStore/useGameStore';

const AbilityBox = styled.div<{ active?: boolean }>`
    width: 50px;
    height: 50px;
    background-color: ${({ active }) => (active ? 'red' : 'green')};
`;

const Container = styled.div`
    display: flex;
    position: absolute;
    gap: 8px;
    /* justify-content: space-between; */
    bottom: 0;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
`;

const AbilityBar = () => {
    const { ability } = useGameStore((state) => ({
        ability: state.characterState.ability,
    }));

    return (
        <Container>
            <AbilityBox active={ability === 'CrossPunching'} />
            <AbilityBox active={ability === 'Kicking'} />
            <AbilityBox active={ability === 'SidePunching'} />
            <AbilityBox active={ability === 'Slamming'} />
        </Container>
    );
};

export default AbilityBar;
