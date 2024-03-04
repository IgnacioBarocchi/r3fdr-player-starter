import styled, { keyframes } from 'styled-components';
import { Context } from '../../../providers/PlayerProvider/PlayerProvider';
import { baseSkills } from '../../../Machines/BaseEntityMachine';
import { states } from '../../../Machines/MutantMachine';

// const iconWith = 50px
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

const Icon = styled.div<{
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

const Skills = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const SkillBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50px;
    gap: 8px;
`;

const Key = styled.div`
    background: #9c9a99;
    font-family: Times New Roman;
    color: black;
    font-weight: bold;
    width: 24px;
    text-align: center;
    border: 3px ridge #15100d;
    border-radius: 4px;
`;

export const ActionBar = () => {
    const [state] = Context.useActor();

    return (
        <Skills>
            {baseSkills.map((skill, i) => {
                return (
                    <SkillBox>
                        <Icon
                            key={skill + i}
                            active={state.matches(skill)}
                            duration={states[skill].animation.duration}
                            image={`images/skills/skill_${i + 1}.png`}
                        />
                        <Key>{['J', 'K', 'L', 'I'][i]}</Key>
                    </SkillBox>
                );
            })}
        </Skills>
    );
};
