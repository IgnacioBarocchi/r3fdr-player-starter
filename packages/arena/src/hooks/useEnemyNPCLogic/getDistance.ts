import { MutableRefObject } from 'react';
import { Group, Vector3 } from 'three';

export const getDistance = (
    sourceGroup: MutableRefObject<Group>,
    targetGroup: MutableRefObject<Group>
) => {
    const targetPosition = targetGroup.getWorldPosition(new Vector3());
    const sourcePosition = sourceGroup.getWorldPosition(new Vector3());
    return Math.sqrt(
        Math.pow(targetPosition.x - sourcePosition.x, 2) +
            Math.pow(targetPosition.z - sourcePosition.z, 2)
    );
};
