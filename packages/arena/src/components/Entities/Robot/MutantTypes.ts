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
    | 'TakingDamage'

export type GLTFActions = Record<ActionName, THREE.AnimationAction>
