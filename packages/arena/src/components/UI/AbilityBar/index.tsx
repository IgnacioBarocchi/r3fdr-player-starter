import styled, { keyframes } from 'styled-components';
import { Context } from '../../../providers/PlayerProvider/PlayerProvider';
import { states } from '../../../Machines/MutantMachine';
import { baseSkills } from '../../../Machines/BaseEntityMachine';

const HPBarContainer = styled.div`
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

const AbilityBar = () => {
    const [state] = Context.useActor();

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
            <HPBarContainer>
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
// {baseSkills.map((skill, i) => {
//     return (
//         <AbilityBox
//             key={skill + i}
//             active={state.matches(skill)}
//             duration={states[skill].animation.duration}
//             image={`images/skills/ability_${i + 1}.png`}
//         />
//     );
// })}
// import { useState } from 'react';
// import styled, { css } from 'styled-components';

// const COOLDOWN_MAP = new Map([
//     ['run', 1000],
//     ['jump', 2000],
//     ['crawl', 3000],
//     ['slide', 4000],
//     ['tumble', 5000],
//   ]);

// const SKILL_CLASS = 'skill';
// const DISABLED_CLASS = 'disabled';
// const UPDATE_INTERVAL = 1000; // milliseconds
// const SECOND_IN_MS = 1000;

// const SkillsTable = styled.table`
//     width: 100%;
//     border-collapse: collapse;
// `;

// const SkillCell = styled.td`
//     padding: 10px;
// `;

// const SkillContainer = styled.div<{disabled: boolean}>`
//     position: relative;
//     border: 1px solid #36393e;
//     border-radius: 5%;
//     width: 44px;
//     height: 44px;
//     overflow: hidden;
//     cursor: pointer;

//     ${(props) =>
//         props.disabled &&
//         css`
//             pointer-events: none;
//         `}

//     > * {
//         pointer-events: none;
//     }

//     &::before {
//         content: '';
//         background: conic-gradient(
//             rgba(0, 0, 0, 0.7) var(--time-left),
//             rgba(0, 0, 0, 0.1) var(--time-left)
//         );
//         position: absolute;
//         opacity: 0.8;
//         top: 0;
//         left: 0;
//         height: 100%;
//         width: 100%;
//     }
// `;

// const AbilityBar = () => {
//     const [skillsData] = useState([
//         { skill: 'run' },
//         { skill: 'jump' },
//         { skill: 'crawl' },
//         { skill: 'slide' },
//         { skill: 'tumble' },
//     ]);

//     const activateSkill = (event) => {
//         const target = event.target;
//         if (
//             !target.classList.contains(SKILL_CLASS) ||
//             target.classList.contains(DISABLED_CLASS)
//         )
//             return;

//         target.classList.add(DISABLED_CLASS);
//         target.style.setProperty('--time-left', '100%');

//         const skill = target.dataset.skill;
//         let time = COOLDOWN_MAP.get(skill) - UPDATE_INTERVAL;

//         const intervalID = setInterval(() => {
//             const passedTime = (time / COOLDOWN_MAP.get(skill)) * 100;
//             target.style.setProperty('--time-left', `${passedTime}%`);

//             target.textContent = (time / SECOND_IN_MS).toFixed(2);
//             time -= UPDATE_INTERVAL;

//             if (time < 0) {
//                 target.textContent = '';
//                 target.style = '';
//                 target.classList.remove(DISABLED_CLASS);

//                 clearInterval(intervalID);
//             }
//         }, UPDATE_INTERVAL);
//     };

//     return (
//         <SkillsTable className="skills-table">
//             <tbody>
//                 <tr>
//                     {skillsData.map((data, index) => (
//                         <SkillCell key={index}>
//                             <SkillContainer
//                                 className={SKILL_CLASS}
//                                 data-skill={data.skill}
//                                 onClick={activateSkill}
//                                 disabled={false}
//                             />
//                         </SkillCell>
//                     ))}
//                 </tr>
//             </tbody>
//         </SkillsTable>
//     );
// };

// export default AbilityBar;
