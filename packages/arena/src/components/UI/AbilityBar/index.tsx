import styled, { keyframes } from 'styled-components';
import { Context } from '../../../providers/PlayerProvider/PlayerProvider';
import { states } from '../../../Machines/MutantMachine';
import { baseSkills } from '../../../Machines/BaseEntityMachine';

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

const generatePulseAnimation = (imageUrl: string) => keyframes`
    0% {
        background: url(${imageUrl}) rgba(255, 255, 255, 1);
        background-size: cover;
        background-blend-mode: multiply;
    }
    50% {
        background: url(${imageUrl}) rgba(0, 0, 255, 1);
        background-size: cover;
        background-blend-mode: multiply;
    }
    100% {
        background: url(${imageUrl}) rgba(255, 255, 255, 1);
        background-size: cover;
        background-blend-mode: multiply;
    }
`;

const AbilityBox = styled.div<{
    active: boolean;
    duration: number;
    image: string;
}>`
    width: 50px;
    height: 50px;
    background: ${({ image }) => 'url(' + image + ') rgba(255, 255, 255, 1)'};
    background-size: cover;
    background-blend-mode: multiply;
    animation-name: ${({ active, image }) =>
        active ? generatePulseAnimation(image) : 'none'};
    animation-duration: ${({ duration }) => duration}ms;
    border: 3px ridge #838383;
`;

const Abilities = styled.div`
    display: flex;
    gap: 16px;
`;

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

// Create a styled component for the black screen
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
    if(state.matches("Dying")){
        return (
          <BlackScreen>
            You died
          </BlackScreen>
        );
    }

    return (
        <Container>
            <Abilities>
                {baseSkills.map((skill, i) => {
                    return (
                        <AbilityBox
                            key={skill + i}
                            active={state.matches(skill)}
                            duration={states[skill].animation.duration}
                            image={`images/skills/ability_${i + 1}.png`}
                        />
                    );
                })}
            </Abilities>
            <HPBarContainer hit={state.matches('TakingDamage')}>
                <HPBarFill
                    percentage={
                        (state.context.currentHP * 100) /
                        state.context.initialHP
                    }
                />
            </HPBarContainer>
        </Container>
    );
};

export default AbilityBar;
