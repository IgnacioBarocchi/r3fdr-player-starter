import * as THREE from 'three'

import { GLTF } from 'three-stdlib'

export type GLTFResult = GLTF & {
    nodes: {
        mesh: THREE.SkinnedMesh
        mixamorigHips: THREE.Bone
    }
    materials: {
        ['Main material']: THREE.MeshStandardMaterial
    }
}

type ActionName =
    | 'CrossPunching'
    | 'Dying'
    | 'Idle'
    | 'Kicking'
    | 'Running'
    | 'SidePunching'
    | 'Slamming'
    | 'Stunned'
    | 'TackingDamage'

export type GLTFActions = Record<ActionName, THREE.AnimationAction>

export const actionRecords = [
    {
        animationName: 'Idle',
        isIdle: true,
    },
    {
        animationName: 'Running',
        isMove: true,
    },
    {
        animationName: 'TackingDamage',
        isTakingDamage: true,
    },
    {
        animationName: 'Stunned',
        isTakingStun: true,
    },
    {
        animationName: 'Dying',
        isFinal: true,
    },
    {
        animationName: 'CrossPunching',
        // duration: 1000,
    },
    {
        animationName: 'Kicking',
        // duration: 1000,
    },
    {
        animationName: 'SidePunching',
        // duration: 1000,
    },
    {
        animationName: 'Slamming',
        // duration: 1000,
    },
]
