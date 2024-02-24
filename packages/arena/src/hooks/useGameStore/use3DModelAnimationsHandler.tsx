import { AnimationAction, LoopOnce } from 'three';
import { StateValue } from 'xstate';
import { MachineStates } from '../../Machines/MutantMachine';
import { baseLoopableActions, baseOneShotActions } from '../../Machines/BaseEntityMachine';
import getAnimationClipMilliseconds from '../../lib/getAnimationClipDuration';

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

        // ["CrossPunching","Kicking", "SidePunching", "Slamming"].forEach(o => {
        //     console.log(o, getAnimationClipMilliseconds(actions, o))
        // })
        
        let timeoutId = 0;
        const { animation } = states[String(stateValue)];
        const currentAction = actions[animation.name];

        const handleCleanup = () => {
            easeOutAnimation(currentAction);
            clearTimeout(timeoutId);
        };

        if (stateValue === "Dying") {
            playFinalAnimation(actions[states.Dying.animation.name]);
        }

        if (baseLoopableActions.includes(animation.name)) {
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
