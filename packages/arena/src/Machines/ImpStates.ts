const DURATION_INFINITY = Infinity;
const DURATION_IDLE = DURATION_INFINITY;
const DURATION_USE_SKILL_1 = 1016.66;
const DURATION_USE_SKILL_2 = 1200;
const DURATION_USE_SKILL_3 = 1766.66;
const DURATION_USE_SKILL_4 = 2383.33;
const DURATION_REACT_SKILL_1 = 1333.33;
const DURATION_REACT_SKILL_2 = 2150;
const DURATION_REACT_SKILL_3 = 2150; // Adjust as needed
const DURATION_REACT_SKILL_4 = 2150; // Adjust as needed;
const DURATION_DEATH = 2283.33;

const ANIMATION_IDLE = 'Demon Idle - Idle';
const ANIMATION_RUN = 'Demon Run - Move';
const ANIMATION_PUNCH = 'Demon Punch - Use skill 1';
const ANIMATION_KICK = 'Demon Kicking - Use skill 2';
const ANIMATION_SWIPE = 'Demon Swiping - Use skill 3';
const ANIMATION_SHOOT = 'Shooting - Use skill 4';
const ANIMATION_DEATH = 'Demon Death - Death';
const ANIMATION_HIT_HEAD = 'Big Hit To Head - React to skill 1';
const ANIMATION_STUN_REACT = 'Demon Kicking - Use skill 2';
const ANIMATION_STANDING_REACT = 'Standing React Large From Left - React to skill 3';
const ANIMATION_REACTION_HIT = 'Demon Reaction Hit - React to skill 4';

export const animationDurationByAnimationName = new Map([
    [ANIMATION_IDLE, DURATION_IDLE],
    [ANIMATION_RUN, DURATION_IDLE],
    [ANIMATION_PUNCH, DURATION_USE_SKILL_1],
    [ANIMATION_KICK, DURATION_USE_SKILL_2],
    [ANIMATION_SWIPE, DURATION_USE_SKILL_3],
    [ANIMATION_SHOOT, DURATION_USE_SKILL_4],
    [ANIMATION_DEATH, DURATION_DEATH],
    [ANIMATION_HIT_HEAD, DURATION_REACT_SKILL_1],
    [ANIMATION_STUN_REACT, DURATION_REACT_SKILL_2],
    [ANIMATION_STANDING_REACT, DURATION_REACT_SKILL_3],
    [ANIMATION_REACTION_HIT, DURATION_REACT_SKILL_4],
]);

export const animationNameByState = new Map([
    ['Idle', ANIMATION_IDLE],
    ['Move', ANIMATION_RUN],
    ['Use skill 1', ANIMATION_PUNCH],
    ['Use skill 2', ANIMATION_KICK],
    ['Use skill 3', ANIMATION_SWIPE],
    ['Use skill 4', ANIMATION_SHOOT],
    ['React to skill 1', ANIMATION_HIT_HEAD],
    ['React to skill 2', ANIMATION_STUN_REACT],
    ['React to skill 3', ANIMATION_STANDING_REACT],
    ['React to skill 4', ANIMATION_REACTION_HIT],
    ['Engage', ANIMATION_STUN_REACT], // Example, adjust as needed
    ['Provoke', ANIMATION_STUN_REACT], // Example, adjust as needed
    ['Death', ANIMATION_DEATH],
]);
