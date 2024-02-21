import { AnimationAction } from 'three';
import { ChampionMachineStateEvents } from '../../constants/ChampionStateMachineObject';
import { EntityModel } from '../../providers/entities';
import { StateValue } from 'xstate';
import getAnimationClipMilliseconds from '../../lib/getAnimationClipDuration';

export type AnimationsHandlerParams = {
    entity: (typeof EntityModel)[keyof typeof EntityModel];
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

export const use3DModelAnimationsHandler = ({
    entity,
    stateValue,
    actions,
}: AnimationsHandlerParams) => {
    const { IDLE, MOVE } = ChampionMachineStateEvents;
    const loopableEvents = [IDLE, MOVE];

    /**
     *
     * @depends stateValue & actions
     */
    const animationEffect = () => {
        let timeoutId = 0;
        const currentAnimation = stateValue as string;
        const currentAction = actions[currentAnimation];

        if (!currentAnimation || !currentAction) return;

        const handleCleanup = () => {
            easeOutAnimation(currentAction);
            clearTimeout(timeoutId);
        };

        if (loopableEvents.includes(entity.eventMap[currentAnimation])) {
            blendAnimationTransition(currentAction);
            return handleCleanup;
        }

        playOneShotAnimation(currentAction);

        timeoutId = setTimeout(() => {
            stopAnimation(currentAction);
            handleCleanup();
        }, getAnimationClipMilliseconds(actions, currentAnimation));

        return () => {
            handleCleanup();
        };
    };

    return { animationEffect };
};
