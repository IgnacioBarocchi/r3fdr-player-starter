import { PositionalAudio } from '@react-three/drei';
import { FSMStates } from './base2';
import { HitBox } from '../components/utility/HitBox/HitBox';

export const GRENADIER_ENTITY_NAME = 'Grenadier';
export const GRENADIER_ENTITY_PATH = '/models/Grenadier.gltf';
const DURATION_INFINITY = Infinity;
const DURATION_USE_SKILL_1 = 1016.66;
const DURATION_USE_SKILL_2 = 1200;
const DURATION_USE_SKILL_3 = 1766.66;
const DURATION_USE_SKILL_4 = 2383.33;
const DURATION_REACT_SKILL_1 = 1333.33;
const DURATION_REACT_SKILL_2 = 2150;
const DURATION_REACT_SKILL_3 = 1333.33;
const DURATION_REACT_SKILL_4 = 1333.33;
const DURATION_ENGAGE = 1000;
const DURATION_PROVOKE = 1000;
const DURATION_DEATH = 2283.33;

const ANIMATION_IDLE = 'Saber And Pistol Idle - Idle';
const ANIMATION_RUN = 'Saber And Pistol Run - Move';
const ANIMATION_SLASH = 'Saber And Pistol Slash - Use skill 1';
const ANIMATION_KICK = 'Saber And Pistol Kick - Use skill 2';
const ANIMATION_ROLL = 'Sprinting Forward Roll - Use skill 3';
const ANIMATION_SHOOT = 'Shooting - Use skill 4';
const ANIMATION_DEATH = 'Falling Back Death - Death';
const ANIMATION_IMPACT = 'Saber And Pistol Impact - React to skill 1';
const ANIMATION_STANDING_IMPACT =
    'Standing React Large From Left - React to skill 3';
const ANIMATION_PISTOL_IMPACT = 'Sword And Shield Impact - React to skill 4';
const ANIMATION_STUN = 'Saber And Pistol Taking Stun - React to skill 2';
const ANIMATION_ENGAGE = 'Saber And Pistol Taking Stun - React to skill 2';
const ANIMATION_PROVOKE = 'Saber And Pistol Taking Stun - React to skill 2';

export const animationNameByFSMState = new Map<FSMStates, string>([
    ['Idle', ANIMATION_IDLE],
    ['Move', ANIMATION_RUN],
    ['Use skill 1', ANIMATION_SLASH],
    ['Use skill 2', ANIMATION_KICK],
    ['Use skill 3', ANIMATION_ROLL],
    ['Use skill 4', ANIMATION_SHOOT],
    ['React to skill 1', ANIMATION_IMPACT],
    ['React to skill 2', ANIMATION_STUN],
    ['React to skill 3', ANIMATION_STANDING_IMPACT],
    ['React to skill 4', ANIMATION_PISTOL_IMPACT],
    ['Engage', ANIMATION_ENGAGE],
    ['Provoke', ANIMATION_PROVOKE],
    ['Death', ANIMATION_DEATH],
]);

export const animationDurationByFSMState = new Map<FSMStates, number>([
    ['Idle', DURATION_INFINITY],
    ['Move', DURATION_INFINITY],
    ['Use skill 1', DURATION_USE_SKILL_1],
    ['Use skill 2', DURATION_USE_SKILL_2],
    ['Use skill 3', DURATION_USE_SKILL_3],
    ['Use skill 4', DURATION_USE_SKILL_4],
    ['React to skill 1', DURATION_REACT_SKILL_1],
    ['React to skill 2', DURATION_REACT_SKILL_2],
    ['React to skill 3', DURATION_REACT_SKILL_3],
    ['React to skill 4', DURATION_REACT_SKILL_4],
    ['Engage', DURATION_ENGAGE],
    ['Provoke', DURATION_PROVOKE],
    ['Death', DURATION_DEATH],
]);

export const soundPathByFSMState = new Map([
    ['Use skill 1', '/sounds/Entity/kick.mp3'],
    ['Use skill 2', '/sounds/Entity/kick.mp3'],
    ['Use skill 3', '/sounds/Entity/kick.mp3'],
    ['Use skill 4', '/sounds/Entity/kick.mp3'],
    ['React to skill 1', '/sounds/Entity/kick.mp3'],
    ['React to skill 2', '/sounds/Entity/kick.mp3'],
    ['React to skill 3', '/sounds/Entity/kick.mp3'],
    ['React to skill 4', '/sounds/Entity/kick.mp3'],
    ['Engage', '/sounds/Entity/kick.mp3'],
    ['Provoke', '/sounds/Entity/kick.mp3'],
    ['Death', '/sounds/Entity/kick.mp3'],
]);

export const FSMStateComponents = {
    'Use skill 1': () => {
        return (
            <>
                <HitBox
                    FSMSkill="Use skill 1"
                    ignoredEntities={[GRENADIER_ENTITY_NAME]}
                    colliderDimensions={[1, 2, 1]}
                    colliderPosition={[0.5, 2, 1]}
                />
                <PositionalAudio
                    load
                    autoplay
                    loop={false}
                    distance={1}
                    url={soundPathByFSMState.get('Use skill 1')!}
                />
            </>
        );
    },
    'Use skill 2': () => {
        return (
            <>
                <HitBox
                    FSMSkill="Use skill 2"
                    ignoredEntities={[GRENADIER_ENTITY_NAME]}
                    colliderDimensions={[1, 2, 1]}
                    colliderPosition={[0.5, 2, 1]}
                />
                <PositionalAudio
                    load
                    autoplay
                    loop={false}
                    distance={1}
                    url={soundPathByFSMState.get('Use skill 2')!}
                />
            </>
        );
    },
    'Use skill 3': () => {
        return (
            <>
                <PositionalAudio
                    load
                    autoplay
                    loop={false}
                    distance={1}
                    url={soundPathByFSMState.get('Use skill 3')!}
                />
            </>
        );
    },
    'Use skill 4': () => {
        return (
            <>
                <HitBox
                    FSMSkill="Use skill 4"
                    ignoredEntities={[GRENADIER_ENTITY_NAME]}
                    colliderDimensions={[0.2, 0.2, 10]}
                    colliderPosition={[0, 1.5, 10]}
                />
                <PositionalAudio
                    load
                    autoplay
                    loop={false}
                    distance={1}
                    url={soundPathByFSMState.get('Use skill 4')!}
                />
            </>
        );
    },
    'React to skill 1': () => {
        return (
            <>
                <PositionalAudio
                    load
                    autoplay
                    loop={false}
                    distance={1}
                    url={soundPathByFSMState.get('React to skill 1')!}
                />
            </>
        );
    },
    'React to skill 2': () => {
        return (
            <>
                <PositionalAudio
                    load
                    autoplay
                    loop={false}
                    distance={1}
                    url={soundPathByFSMState.get('React to skill 2')!}
                />
            </>
        );
    },
    'React to skill 3': () => {
        return (
            <>
                <PositionalAudio
                    load
                    autoplay
                    loop={false}
                    distance={1}
                    url={soundPathByFSMState.get('React to skill 3')!}
                />
            </>
        );
    },
    'React to skill 4': () => {
        return (
            <>
                <PositionalAudio
                    load
                    autoplay
                    loop={false}
                    distance={1}
                    url={soundPathByFSMState.get('React to skill 4')!}
                />
            </>
        );
    },
    Engage: () => {
        return (
            <>
                <PositionalAudio
                    load
                    autoplay
                    loop={false}
                    distance={1}
                    url={soundPathByFSMState.get('Engage')!}
                />
            </>
        );
    },
    Provoke: () => {
        return (
            <>
                <PositionalAudio
                    load
                    autoplay
                    loop={false}
                    distance={1}
                    url={soundPathByFSMState.get('Provoke')!}
                />
            </>
        );
    },
    Death: () => {
        return (
            <>
                <PositionalAudio
                    load
                    autoplay
                    loop={false}
                    distance={1}
                    url={soundPathByFSMState.get('Death')!}
                />
            </>
        );
    },
};
