import styled, { keyframes } from 'styled-components';
import { Context } from '../../../providers/PlayerProvider/PlayerProvider';
import { baseSkills } from '../../../Machines/BaseEntityMachine';
import { states } from '../../../Machines/MutantMachine';

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

export const SkillBar = () => {
    const [state] = Context.useActor();

    return (
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
    );
};
