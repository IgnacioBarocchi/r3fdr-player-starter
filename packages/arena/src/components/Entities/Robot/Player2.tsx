import {
    CapsuleCollider as Bounding,
    RigidBody,
    CylinderCollider as Sensor,
} from '@react-three/rapier';

import { EntityModel } from '../../../providers/GLTFProvider';
import { FC } from 'react';
import Mutant3DModel from './Mutant3DModel';
import RobotHitbox from './RobotHitbox';
import { StateValue } from 'xstate';
import { Zombie3DModel } from './Zombie3DModel';
import { usePlayerLogic } from '../../../hooks/usePlayerLogic/usePlayerLogic2';

const EntityComponent = {
    Mutant: ({ stateValue }: { stateValue: StateValue }) => (
        <Mutant3DModel stateValue={stateValue} />
    ),
    Zombie: ({ stateValue }: { stateValue: StateValue }) => (
        <Zombie3DModel stateValue={stateValue} />
    ),
    Drone: () => <></>,
};

const Player2: FC<{ useOrbitControls: boolean }> = ({ useOrbitControls }) => {
    // @ts-ignore
    const { robotBody, orientation, machineState } = usePlayerLogic(
        useOrbitControls,
        EntityModel['Mutant']
    );

    const Model = EntityComponent['Mutant'];
    return (
        <RigidBody lockRotations={true} colliders={false} ref={robotBody}>
            <Bounding args={[0.2, 0.6]} position={[0, 0.8, 0.2]} />
            <Sensor args={[0.2, 2]} position={[0, 0.5, 0]} sensor />
            <Model stateValue={machineState.value} />
            {['CrossPunching', 'SidePunching', 'Kicking', 'Slamming'].includes(
                // @ts-ignore
                machineState.value
            ) && (
                <RobotHitbox
                    orientation={orientation}
                    state={machineState.value}
                />
            )}
        </RigidBody>
    );
};

export default Player2;
