// it works nut i cant use it ouside canvas. champion machine should have no r3f hooks
// @ts-ignore
import { EntityModel } from '../entities';
import { ReactNode } from 'react';
import { createActorContext } from '@xstate/react';
import { createMachine } from 'xstate';
import { getChampionMachine } from '../../constants/ChampionStateMachineObject';

const machine = createMachine(
    // @ts-ignore
    getChampionMachine({
        id: 'Player',
        player: EntityModel.Mutant,
        isAnEnemy: false,
    })
);

export const Context = createActorContext(machine);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Context.Provider
        // options={{ context: { value: ChampionMachineStateEvents.IDLE } }}
        >
            {children}
        </Context.Provider>
    );
};
