import { ChampionMachineStateEvents } from "../constants/ChampionStateMachineObject";

const getAnimationMap = (actions: any[]) => actions.reduce((acc: { [x: string]: any; }, curr: { animationName: string | number; eventName: any; }) => {
    acc[curr.animationName] = curr.eventName;
    return acc;
}, {});

const mutantActionRecords = [
    {
        animationName: 'Idle',
        eventName: ChampionMachineStateEvents.IDLE,
        isIdle: true,
    },
    {
        animationName: 'Running',
        eventName: ChampionMachineStateEvents.MOVE,
        isMove: true,
    },
    {
        animationName: 'TakingDamage',
        eventName: ChampionMachineStateEvents.TAKE_DAMAGE,
        isTakingDamage: true,
    },
    {
        animationName: 'Stunned',
        eventName: ChampionMachineStateEvents.TAKE_STUN,
        isTakingStun: true,
    },
    {
        animationName: 'Dying',
        eventName: ChampionMachineStateEvents.DEATH,
        isFinal: true,
    },
    {
        animationName: 'CrossPunching',
        eventName: ChampionMachineStateEvents.ABILITY_1,
        hitBox: {
            rigidBody: {
                name: 'CrossPunching',
                position: [0, 1.25, 1.2],
                density: 1000,
            },
            size: 0.3,
        },
        // duration: 1000,
    },
    {
        animationName: 'Kicking',
        eventName: ChampionMachineStateEvents.ABILITY_2,
        hitBox: {
            rigidBody: {
                name: 'Kicking',
                position: [0, 1.25, 2],
                density: 1000,
            },
            size: 0.3,
        },
        // duration: 1000,
    },
    {
        animationName: 'SidePunching',
        eventName: ChampionMachineStateEvents.ABILITY_3,
        hitBox: {
            rigidBody: {
                name: 'SidePunching',
                position: [0, 1.25, 2],
                density: 1000,
            },
            size: 0.3,
        },
        // duration: 1000,
    },
    {
        animationName: 'Slamming',
        eventName: ChampionMachineStateEvents.ABILITY_4,
        hitBox: {
            rigidBody: {
                name: 'Slamming',
                position: [0, 0.5, 2],
                density: 1000,
            },
            size: 0.3,
        },
        freezeControls: true,
        // duration: 1000,
    },
];
const mutatnEventMap = getAnimationMap(mutantActionRecords)
const zombieActionRecords = [
    {
        animationName: 'Idle',
        eventName: ChampionMachineStateEvents.IDLE,
        isIdle: true,
    },
    {
        animationName: 'Running',
        eventName: ChampionMachineStateEvents.MOVE,
        isMove: true,
    },
    {
        animationName: 'TakingDamage',
        eventName: ChampionMachineStateEvents.TAKE_DAMAGE,
        isTakingDamage: true,
    },
    {
        animationName: 'Stunned',
        eventName: ChampionMachineStateEvents.TAKE_STUN,
        isTakingStun: true,
    },
    {
        animationName: 'Dying',
        eventName: ChampionMachineStateEvents.DEATH,
        isFinal: true,
    },
    {
        // punching is missing
        animationName: 'Attacking1',
        eventName: ChampionMachineStateEvents.ABILITY_1,
        hitBox: {
            rigidBody: {
                name: 'Attacking1',
                position: [0, 1.25, 1.2],
                density: 1000,
            },
            size: 0.3,
        },
        // duration: 1000,
    },
    {
        animationName: 'Attacking1',
        eventName: ChampionMachineStateEvents.ABILITY_2,
        hitBox: {
            rigidBody: {
                name: 'Attacking1',
                position: [0, 1.25, 1.2],
                density: 1000,
            },
            size: 0.3,
        },
        // duration: 1000,
    },
    {
        animationName: 'Attacking2',
        eventName: ChampionMachineStateEvents.ABILITY_3,
        hitBox: {
            rigidBody: {
                name: 'Attacking2',
                position: [0, 1.25, 1.2],
                density: 1000,
            },
            size: 0.3,
        },
        // duration: 1000,
    },
    {
        animationName: 'Attacking3',
        eventName: ChampionMachineStateEvents.ABILITY_4,
        hitBox: {
            rigidBody: {
                name: 'Attacking3',
                position: [0, 1.25, 1.2],
                density: 1000,
            },
            size: 0.3,
        },
        // duration: 1000,
    },
];
const zombieEventMap = getAnimationMap(zombieActionRecords)

export const EntityModel = {
    // Robot: "/models/Robot.glb",
    Drone: { path: '/models/Drone.gltf', actionRecords: [] },
    Mutant: {
        path: '/models/Mutant.gltf',
        actionRecords: mutantActionRecords,
        eventMap: mutatnEventMap
    },
    Zombie: {
        path: '/models/Zombie.gltf',
        actionRecords: zombieActionRecords,
        eventMap: zombieEventMap
    },
} as const;
