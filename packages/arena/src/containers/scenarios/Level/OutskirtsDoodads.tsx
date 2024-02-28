import { CuboidCollider, CylinderCollider } from '@react-three/rapier';
import { useState } from 'react';

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
            <CuboidCollider position={[20,0,20]} args={[1,1,1]}/>
            {shouldRender ? <></> : null}
        </>
    );
};
