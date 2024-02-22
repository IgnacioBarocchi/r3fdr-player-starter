// import { ReactNode } from 'react';
// import { createActorContext } from '@xstate/react';
// import { createMachine } from 'xstate';

import { EntityModel } from '../entities';
import { ReactNode } from 'react';
import { createMachine } from 'xstate';
import { getChampionMachine } from '../../constants/ChampionStateMachineObject';

// // const machine = getChampionMachine({
// //     id: 'Player',
// //     player: EntityModel.Mutant,
// //     isAnEnemy: false,
// // });

// const m = createMachine({
//     id: 'AppMachine',
//     initial: 'App Init',
//     states: {
//         'App Init': {
//             always: {
//                 target: 'Get user data',
//             },
//         },
//         'Get user data': {
//             invoke: {
//                 src: 'getUserSession',
//                 id: 'invoke-c5x59',
//                 onDone: {
//                     target: 'Validate Credentials',
//                 },
//                 onError: {
//                     target: 'Logged Out',
//                 },
//             },
//         },
//         'Validate Credentials': {
//             invoke: {
//                 src: 'validateCredentials',
//                 id: 'invoke-3azjd',

//                 onDone: {
//                     target: 'Get Photo',
//                 },
//                 onError: {
//                     target: 'Logged Out',
//                 },
//             },
//         },
//         'Logged Out': {
//             on: {
//                 'Send Credentials': {
//                     target: 'Logging In',
//                 },
//             },
//         },
//         'Get Photo': {
//             invoke: {
//                 src: 'getPhoto',
//                 id: 'invoke-otdd0',

//                 onDone: {
//                     target: 'FillGaps App',
//                 },
//                 onError: {
//                     target: 'Wrong User Data',
//                     actions: [{ type: 'setError' }],
//                 },
//             },
//         },
//         'Logging In': {
//             invoke: {
//                 src: 'doLogin',
//                 id: 'invoke-tzer1',

//                 onDone: {
//                     target: 'Get Photo',
//                 },
//                 onError: {
//                     target: 'LogIn Error',
//                     actions: [{ type: 'setError' }],
//                 },
//             },
//         },
//         'FillGaps App': {
//             on: {
//                 'Show Profile Info': {
//                     target: 'Profile Info',
//                 },
//             },
//         },
//         'Wrong User Data': {
//             on: {
//                 Ok: {
//                     target: 'FillGaps App',
//                 },
//             },
//         },
//         'LogIn Error': {
//             after: {
//                 '1200': {
//                     target: '#AppMachine.Logged Out',
//                     actions: [{ type: 'eraseError' }],
//                 },
//             },
//         },
//         'Profile Info': {
//             on: {
//                 'Log out': {
//                     target: 'Logged Out',
//                 },
//                 'Hide Profile Info': {
//                     target: 'FillGaps App',
//                 },
//             },
//         },
//     },
//     schema: {
//         events: {} as
//             | { type: 'Ok' }
//             | { type: 'Login'; '200': number }
//             | { type: 'Log out' }
//             | { type: 'Send Credentials' }
//             | { type: 'Hide Profile Info' }
//             | { type: 'Show Profile Info' }
//             | { type: 'Wrong User/Password'; '403': number }
//             | { type: '' },
//         context: {} as {
//             session: {
//                 photo: string;
//                 id: number;
//                 keys: {
//                     access_key: string;
//                     refresh_key: string;
//                 };
//                 name: string;
//                 role: string;
//             };
//             error: string;
//         },
//     },
//     predictableActionArguments: true,
//     preserveActionOrder: true,
// });

// console.log('machine', m);
// export const Context = createActorContext(m);
// // @ts-ignore

// export const PlayerProvider = ({ children }: { children: ReactNode }) => {
//     return (
//         <Context.Provider
//         // options={{ context: { value: ChampionMachineStateEvents.IDLE } }}
//         >
//             {children}
//         </Context.Provider>
//     );
// };
export const PlayerProvider = ({ children }: { children: ReactNode }) => {
    const obj = getChampionMachine({
        id: 'Player',
        player: EntityModel.Mutant,
        isAnEnemy: false,
    });
    console.log('playerProvider', obj);

    return (
        <div
        // options={{ context: { value: ChampionMachineStateEvents.IDLE } }}
        >
            {children}
        </div>
    );
};
