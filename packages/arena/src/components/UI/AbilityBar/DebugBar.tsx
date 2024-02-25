import styled from 'styled-components';
import {
    GameState,
    useGameStore,
} from '../../../hooks/useGameStore/useGameStore';
import { Quaternion, Vector3 } from 'three';

const Debug = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    position: absolute;
    top: 100px;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
    font-size: 26px;
    font-weight: bold;
    color: red;
    text-stroke: 1px blue;
`;
export const DebugBar = () => {
    const { characterState } = useGameStore((state: GameState) => ({
        characterState: state.characterState,
    }));

    const wp = characterState.group?.getWorldPosition(new Vector3());
    const wd = characterState.group?.getWorldDirection(new Vector3());
    const wr = characterState.group?.getWorldQuaternion(new Quaternion());

    return (
        <Debug>
            <div>Position X:{wp?.x.toFixed(2)} Y:{wp?.y.toFixed(2)} Z:{wp?.z.toFixed(2)}</div>
            <div>Direction X:{wd?.x.toFixed(2)} Y:{wd?.y.toFixed(2)} Z:{wd?.z.toFixed(2)}</div>
            <div>Rotation X:{wr?.x.toFixed(2)} Y:{wr?.y.toFixed(2)} Z:{wr?.z.toFixed(2)}</div>
            {/* <div>D: {wd}</div> */}
            {/* <div>R: {wr}</div> */}
        </Debug>
    );
};
