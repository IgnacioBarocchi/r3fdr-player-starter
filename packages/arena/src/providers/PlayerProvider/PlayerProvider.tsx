// it works nut i cant use it ouside canvas. champion machine should have no r3f hooks
// @ts-ignore
import { EntityModel } from '../entities';
import { ReactNode } from 'react';
import { createActorContext } from '@xstate/react';
import { createMachine } from 'xstate';
import { getMachineInput } from '../../Machines/base2';

export const Context = createActorContext(createMachine(
    // @ts-ignore
    getMachineInput(
        'Player',
        'a player',
        new Map([
            ['Use skill 1', 1016.66],
            ['Use skill 2', 1200],
            ['Use skill 3', 1766.66],
            ['Use skill 4', 2383.33],
            ['React to skill 1', 1333.33],
            ['React to skill 2', 2150],
            ['React to skill 3', 1333.33],
            ['React to skill 4', 1333.33],
            ['Engage', 1000],
            ['Provoke', 1000],
            ['Death', 2283.33],
        ])
    )
));

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Context.Provider>
            {children}
        </Context.Provider>
    );
};
