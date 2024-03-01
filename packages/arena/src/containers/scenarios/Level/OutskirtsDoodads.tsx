import { CuboidCollider, CylinderCollider } from '@react-three/rapier';
import { useState } from 'react';
import { WoodWall } from './WoodWall';

export const OutskirtsDoodads = () => {
    const [shouldRender, setShouldRender] = useState(false);
    return (
        <>
            <CylinderCollider
                sensor
                args={[0.5, 15]}
                onIntersectionExit={() => {
                    setShouldRender(true);
                }}
                onIntersectionEnter={() => {
                    setShouldRender(false);
                }}
            />
            {true ? (
                <>
                    <WoodWall position={[0,0,0]} rotation={[0, 0, 0]} />
                </>
            ) : null}
        </>
    );
};
