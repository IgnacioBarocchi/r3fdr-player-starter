import { useEffect, useState } from 'react';

import { useGameStore } from '../../../hooks/useGameStore/useGameStore';

const AbilityBox = ({ ability, initialColor, onColorChange }) => {
    const [currentColor, setCurrentColor] = useState(initialColor);

    useEffect(() => {
        // Set the color based on the selected ability
        setCurrentColor(ability === onColorChange ? 'red' : 'gray');

        // Revert the color to gray after a second
        const timeoutId = setTimeout(() => {
            setCurrentColor('gray');
        }, 1000);

        // Clear the timeout to avoid memory leaks
        return () => clearTimeout(timeoutId);
    }, [ability, onColorChange]);

    const boxStyle = {
        width: '50px',
        height: '50px',
        backgroundColor: currentColor,
        margin: '8px',
        display: 'inline-block',
    };

    return <div style={boxStyle}></div>;
};

const AbilityBar = () => {
    const { ability } = useGameStore((state) => ({
        ability: state.characterState.ability,
    }));

    const container = {
        display: 'flex',
        position: 'absolute',
        justifyContent: 'space-between',
        bottom: '0',
        left: '50%',
        zIndex: '2',
        transform: 'translate(-50%, -50%)',
    };

    return (
        // @ts-expect-error ts is not recognizing the style prop
        <div style={container}>
            {/* <AbilityBox
                ability={ability}
                initialColor="gray"
                onColorChange="CrossPunching"
            />
            <AbilityBox
                ability={ability}
                initialColor="gray"
                onColorChange="Kicking"
            />
            <AbilityBox
                ability={ability}
                initialColor="gray"
                onColorChange="SidePunching"
            />
            <AbilityBox
                ability={ability}
                initialColor="gray"
                onColorChange="Slamming"
            /> */}
        </div>
    );
};

export default AbilityBar;

// import { useEffect, useState } from 'react';

// import { useGameStore } from '../../../hooks/useGameStore/useGameStore';

// const AbilityBox = ({ ability, initialColor, onColorChange }) => {
//     const [currentColor, setCurrentColor] = useState(initialColor);

//     useEffect(() => {
//         // Set the color based on the selected ability
//         setCurrentColor(ability === onColorChange ? 'red' : 'gray');

//         // Revert the color to gray after a second
//         const timeoutId = setTimeout(() => {
//             setCurrentColor('gray');
//         }, 1000);

//         // Clear the timeout to avoid memory leaks
//         return () => clearTimeout(timeoutId);
//     }, [ability, onColorChange]);

//     const boxStyle = {
//         width: '50px',
//         height: '50px',
//         backgroundColor: currentColor,
//         margin: '8px',
//         display: 'inline-block',
//     };

//     return <div style={boxStyle}></div>;
// };

// const AbilityBar = () => {
//     const { ability } = useGameStore((state) => ({
//         ability: state.characterState.ability,
//     }));

//     const container = {
//         display: 'flex',
//         position: 'absolute',
//         justifyContent: 'space-between',
//         bottom: '10%',
//         left: '50%',
//         zIndex: '2',
//     };

//     return (
//         // @ts-expect-error ts is not recognizing the style prop
//         <div style={container}>
//             <AbilityBox
//                 ability={ability}
//                 initialColor="gray"
//                 onColorChange="CrossPunching"
//             />
//             <AbilityBox
//                 ability={ability}
//                 initialColor="gray"
//                 onColorChange="Kicking"
//             />
//             <AbilityBox
//                 ability={ability}
//                 initialColor="gray"
//                 onColorChange="SidePunching"
//             />
//             <AbilityBox
//                 ability={ability}
//                 initialColor="gray"
//                 onColorChange="Slamming"
//             />
//         </div>
//     );
// };

// export default AbilityBar;
// // import { useGameStore } from '../../../hooks/useGameStore/useGameStore';

// // const AbilityBar = () => {
// //     const { ability } = useGameStore((state) => ({
// //         ability: state.characterState.ability,
// //     }));

// //     const boxStyle = {
// //         width: '50px',
// //         height: '50px',
// //         backgroundColor: 'gray',
// //         margin: '8px',
// //         display: 'inline-block',
// //     };

// //     const container = {
// //         display: 'flex',
// //         position: 'absolute',
// //         justifyContent: 'space-between',
// //         bottom: '10%',
// //         left: '50%',
// //         zIndex: '2',
// //     };

// //     return (
// //         // @ts-expect-error ts is not recognizing the style prop
// //         <div style={container}>
// //             <div
// //                 style={{
// //                     ...boxStyle,
// //                     backgroundColor:
// //                         ability === 'CrossPunching' ? 'red' : 'gray',
// //                 }}
// //             ></div>
// //             <div
// //                 style={{
// //                     ...boxStyle,
// //                     backgroundColor: ability === 'Kicking' ? 'red' : 'gray',
// //                 }}
// //             ></div>
// //             <div
// //                 style={{
// //                     ...boxStyle,
// //                     backgroundColor:
// //                         ability === 'SidePunching' ? 'red' : 'gray',
// //                 }}
// //             ></div>
// //             <div
// //                 style={{
// //                     ...boxStyle,
// //                     backgroundColor: ability === 'Slamming' ? 'red' : 'gray',
// //                 }}
// //             ></div>
// //         </div>
// //     );
// // };

// // export default AbilityBar;
