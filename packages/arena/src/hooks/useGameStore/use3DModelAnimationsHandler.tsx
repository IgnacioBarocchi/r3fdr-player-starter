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
    const { IDLE, MOVE, TAKE_DAMAGE } = ChampionMachineStateEvents;
    const loopableAbilities = [IDLE, MOVE];

    /**
     * @depends on [stateValue] and [actions]
     */
    const animationEffect = () => {
        let timeoutId = 0;
        const currentAnimation = String(stateValue);
        const currentAction = actions[currentAnimation];
        const currentAbility = entity.eventMap[currentAnimation];
        console.log(currentAbility, currentAnimation);
        if (!currentAnimation || !currentAction || !currentAbility) return;

        if (currentAbility === TAKE_DAMAGE) {
            debugger;
        }

        const handleCleanup = () => {
            easeOutAnimation(currentAction);
            clearTimeout(timeoutId);
        };

        if (loopableAbilities.includes(currentAbility)) {
            blendAnimationTransition(currentAction);
            return handleCleanup;
        } else {
            console.log(currentAbility);
        }

        playOneShotAnimation(currentAction);

        timeoutId = setTimeout(() => {
            stopAnimation(currentAction);
            handleCleanup();
        }, getAnimationClipMilliseconds(actions, currentAnimation));

        return handleCleanup;
    };

    return { animationEffect };
};
