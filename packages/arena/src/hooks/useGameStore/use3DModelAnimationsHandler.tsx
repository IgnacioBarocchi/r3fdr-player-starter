import { AnimationAction, LoopOnce } from 'three';
import { StateValue } from 'xstate';
import { MachineStates } from '../../Machines/MutantMachine';
import { baseLoopableActions } from '../../Machines/BaseEntityMachine';

export type AnimationsHandlerParams = {
    states: MachineStates;
    stateValue: StateValue;
    actions: {
        [x: string]: AnimationAction | null;
    };
};

const blendAnimationTransition = (action: AnimationAction | null) => {
    if (!action) return;
    action.reset()?.fadeIn(0.2)?.play();
};

const playOneShotAnimation = (action: AnimationAction | null) => {
    if (!action) return;
    action?.reset()?.play();
};

const easeOutAnimation = (action: AnimationAction | null) => {
    if (!action) return;
    action?.fadeOut(0.2);
};

const stopAnimation = (action: AnimationAction | null) => {
    if (!action) return;
    action?.stop();
};

const playFinalAnimation = (action: AnimationAction | null) => {
    if (!action) return;
    action.setLoop(LoopOnce, 1);
    action.clampWhenFinished = true;
    action.enabled = true;
    action.reset().play();
};

export const use3DModelAnimationsHandler = ({
    states,
    stateValue,
    actions,
}: AnimationsHandlerParams) => {
    /**
     * @depends on [stateValue] and [actions]
     */
    const animationEffect = () => {
        console.log(`[${stateValue}]`)
        let timeoutId = 0;
        if(!((stateValue as string) in states)){
            console.log("$",stateValue)
            return;
        }
        
        const { animation } = states[stateValue];
        console.log(`[${JSON.stringify(states[stateValue])}]`)
        const currentAction = actions[animation.name];

        const handleCleanup = () => {
            easeOutAnimation(currentAction);
            clearTimeout(timeoutId);
        };

        if (stateValue === "Dying") {
            playFinalAnimation(actions[states.Dying.animation.name]);
        }

        if (["Move", "Idle"].includes(stateValue as string)) {
            blendAnimationTransition(currentAction);
            return handleCleanup;
        } else {
            playOneShotAnimation(currentAction);

            timeoutId = setTimeout(() => {
                stopAnimation(currentAction);
                handleCleanup();
            }, animation.duration);
        }
        return handleCleanup;
    };

    return { animationEffect };
};
