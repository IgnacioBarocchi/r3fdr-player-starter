import { AnimationAction, LoopOnce } from 'three';
import { StateValue } from 'xstate';

export type AnimationsHandlerParams = {
    animationDurationByAnimationName: Map<string, number>;
    animationNameByState: Map<string, string>;
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
    animationNameByState,
    animationDurationByAnimationName,
    stateValue,
    actions,
}: AnimationsHandlerParams) => {
    /**
     * @depends on [stateValue] and [actions]
     */
    const animationEffect = () => {
        let timeoutId = 0;
        // console.log(`[${stateValue}]`);

        const animationName = animationNameByState.get(stateValue as string);
        const animationDuration = animationDurationByAnimationName.get(
            animationName!
        );

        const currentAction = actions[animationName!];

        const handleCleanup = () => {
            easeOutAnimation(currentAction);
            clearTimeout(timeoutId);
        };

        // if (stateValue === 'Dying') {
        //     playFinalAnimation(actions[states.Dying.animation.name]);
        // }

        if (['Move', 'Idle'].includes(stateValue as string)) {
            blendAnimationTransition(currentAction);
            return handleCleanup;
        } else {
            playOneShotAnimation(currentAction);

            timeoutId = setTimeout(() => {
                stopAnimation(currentAction);
                handleCleanup();
            }, animationDuration);
        }
        return handleCleanup;
    };

    return { animationEffect };
};
