// it works nut i cant use it ouside canvas. champion machine should have no r3f hooks
// @ts-ignore
import { EntityModel } from '../entities';
import { ReactNode } from 'react';
import { createActorContext } from '@xstate/react';
import { MutantMachine } from '../../Machines/MutantMachine';

export const Context = createActorContext(MutantMachine);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Context.Provider>
            {children}
        </Context.Provider>
    );
};
