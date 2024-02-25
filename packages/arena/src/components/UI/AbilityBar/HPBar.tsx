import styled, { keyframes } from 'styled-components';
import { Context } from '../../../providers/PlayerProvider/PlayerProvider';

const horizontalShaking = keyframes`
    0% { transform: translateX(0) }
    25% { transform: translateX(3px) }
    50% { transform: translateX(-3px);
        border-color: crimson;
    }
    75% { transform: translateX(3px) }
    100% { transform: translateX(0) }
   `;

const HPBarContainer = styled.div<{ hit: boolean }>`
    width: 280px;
    height: 20px;
    background: linear-gradient(
        0deg,
        rgba(60, 60, 60, 1) 0%,
        rgba(105, 105, 105, 1) 25%,
        rgba(121, 121, 121, 1) 50%,
        rgba(105, 105, 105, 1) 75%,
        rgba(60, 60, 60, 1) 100%
    );
    border-radius: 10px;
    overflow: hidden;
    border: 3px ridge #838383;
    animation-name: ${({ hit }) => (hit ? horizontalShaking : 'none')};
    animation-duration: 0.35s;
`;

const HPBarFill = styled.div<{ percentage: number }>`
    height: 100%;
    width: ${({ percentage }) => `${percentage}%`};
    background-color: #4caf50;
    background: linear-gradient(
        0deg,
        rgba(72, 154, 40, 1) 0%,
        rgba(68, 255, 0, 1) 25%,
        rgba(168, 255, 137, 1) 50%,
        rgba(71, 188, 27, 1) 75%,
        rgba(72, 154, 40, 1) 100%
    );
    transition: width 0.3s ease-in-out;
`;

export const HPBar = () => {
    const [state] = Context.useActor();

    return (
        <HPBarContainer hit={state.matches('TakingDamage')}>
            <HPBarFill
                percentage={
                    (state.context.currentHP * 100) / state.context.initialHP
                }
            />
        </HPBarContainer>
    );
};
